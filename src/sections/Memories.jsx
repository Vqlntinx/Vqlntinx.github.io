import { useEffect, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { memories as allMemories } from '../data/memories.js';
import HomePill from '../components/HomePill.jsx';
import './Memories.css';

// Newest save on top: highest Lv first, whatever order the data file uses.
// Same Lv → the later date first (dates are 'YYYY.MM.DD', so text order is time order).
const memories = [...allMemories].sort(
  (a, b) => (b.level ?? 0) - (a.level ?? 0) || String(b.date ?? '').localeCompare(String(a.date ?? ''))
);

// Classic JRPG "Load game" menu: every memory is a save file you can load and replay.
export default function Memories() {
  const { L, lang } = usePrefs();
  const [sel, setSel] = useState(0);
  const [mode, setMode] = useState('menu'); // menu | loading | scene
  const [typed, setTyped] = useState(0);
  const m = memories[sel];
  const line = L(m.line);

  const load = (i) => {
    setSel(i);
    sfx.select();
    setMode('loading');
    setTimeout(() => { setMode('scene'); setTyped(0); }, 900);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (mode === 'menu') {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(memories.length - 1, s + 1)); sfx.tick(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); sfx.tick(); }
        if (e.key === 'Enter') load(sel);
      } else if (mode === 'scene' && (e.key === 'Escape' || e.key === 'Enter')) {
        e.stopPropagation(); sfx.back(); setMode('menu');
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [mode, sel]);

  // typewriter
  useEffect(() => {
    if (mode !== 'scene' || typed >= line.length) return;
    const t = setTimeout(() => { setTyped((n) => n + 1); if (typed % 2 === 0) sfx.text(); }, 38);
    return () => clearTimeout(t);
  }, [mode, typed, line]);

  return (
    <main className={'rpg page-enter mode-' + mode}>
      <HomePill className="rpg-pill" />

      {mode !== 'scene' && (
        <section className="rpg-menu">
          <header className="rpg-head">
            <div className="win rpg-title">{lang === 'ko' ? '불러오기' : 'LOAD GAME'}</div>
            <div className="rpg-count">{memories.length} FILES</div>
          </header>
          <ol className="slots">
            {memories.map((x, i) => (
              <li key={x.id}>
                <button
                  className={'win slot' + (i === sel ? ' sel' : '')}
                  onMouseEnter={() => { if (i !== sel) { setSel(i); sfx.tick(); } }}
                  onClick={() => load(i)}
                >
                  <span className="cursor">▶</span>
                  <span className="slot-no">FILE {i + 1}</span>
                  <span className="slot-icon" style={{ background: `linear-gradient(135deg, ${x.scene[0]}, ${x.scene[1]})` }}>{x.icon}</span>
                  <span className="slot-main">
                    <span className="slot-place">{L(x.place)}</span>
                    <span className="slot-party">{x.party.join(' ')}</span>
                  </span>
                  <span className="slot-meta">
                    <span>Lv <b>{x.level}</b></span>
                    <span>{x.date}</span>
                    <span>⏱ {x.playtime}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}

      {mode === 'loading' && <div className="rpg-loading"><span>{lang === 'ko' ? '불러오는 중' : 'Loading'}</span><i>.</i><i>.</i><i>.</i></div>}

      {mode === 'scene' && (
        <section className="rpg-scene" onClick={() => { if (typed < line.length) setTyped(line.length); else { sfx.back(); setMode('menu'); } }}>
          <div className="scene-view" style={{ '--a': m.scene[0], '--b': m.scene[1], '--c': m.scene[2] }}>
            {m.image ? <img src={m.image} alt={L(m.place)} /> : (
              <div className="scene-art">
                <span className="sun" />
                <span className="hill h1" /><span className="hill h2" />
                <span className="scene-icon">{m.icon}</span>
              </div>
            )}
            <div className="win scene-loc">📍 {L(m.place)} · {m.date}</div>
          </div>
          <div className="win textbox">
            <div className="speaker">{m.party.join(' ')}</div>
            <p>{line.slice(0, typed)}<span className="caret">{typed >= line.length ? '▼' : ''}</span></p>
          </div>
        </section>
      )}
    </main>
  );
}
