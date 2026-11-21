import { useEffect, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { projects as allProjects } from '../data/projects.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import { LinkIcon } from '../components/Contact.jsx';
import './Projects.css';

/*
  Side-scrolling platformer world (original art, no third-party characters):
  every project is a "?" block floating above the brick ground. Pick one and the
  little pixel player runs underneath, jumps, bumps it, and the project pops out.
*/

// Levels run oldest → newest (1-1 is the earliest project), whatever order the data file uses.
const projects = [...allProjects].sort((a, b) => a.year - b.year);

// Original 10×13 pixel player
const HERO = [
  '...CCCC...',
  '..CCCCCC..',
  '..HHSSSH..',
  '.HSSSSSSH.',
  '.HSESSESS.',
  '..SSSSSS..',
  '...SSSS...',
  '..OOOOOO..',
  '.OOOOOOOO.',
  '.SSOOOOSS.',
  '..PPPPPP..',
  '..PP..PP..',
  '.KK....KK.',
];
const PAL = { C: '#2fd8ff', H: '#3b2a24', S: '#ffd2a6', E: '#1b1b1b', O: '#ff7a3d', P: '#2f3a8f', K: '#5a3417' };

function Hero() {
  return (
    <svg viewBox="0 0 10 13" shapeRendering="crispEdges" aria-hidden="true">
      {HERO.flatMap((row, y) => row.split('').map((c, x) => (c === '.' ? null : <rect key={x + '-' + y} x={x} y={y} width="1.02" height="1.02" fill={PAL[c]} />)))}
    </svg>
  );
}

export default function Projects() {
  const { L, lang } = usePrefs();
  const [sel, setSel] = useState(0);
  const [bump, setBump] = useState(0);         // increments to replay the jump/bump animation
  const [visited, setVisited] = useState(() => new Set([0]));
  const [facing, setFacing] = useState(1);
  const prev = useRef(0);
  const p = projects[Math.min(sel, projects.length - 1)]; // guard: the list may shrink while a level is selected

  const pick = (i) => {
    if (i < 0 || i >= projects.length) return;
    setFacing(i >= prev.current ? 1 : -1);
    prev.current = i;
    setSel(i);
    setBump((b) => b + 1);
    setVisited((v) => new Set(v).add(i));
  };

  useEffect(() => { if (bump) sfx.select(); }, [bump]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') pick(sel + 1);
      if (e.key === 'ArrowLeft') pick(sel - 1);
      if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); setBump((b) => b + 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const n = projects.length;
  const xOf = (i) => (n === 1 ? 50 : 10 + (i * 80) / (n - 1)); // block x in % of the level width (centred if only one)
  const coins = projects.reduce((s, x) => s + Math.round((x.stats.impact + x.stats.craft) / 20), 0);

  return (
    <main className="plat page-enter">
      <HomePill className="plat-pill" />
      <MusicChip track="pixelland" />

      {/* HUD */}
      <header className="hud">
        <div><span>PLAYER ONE</span><b>{String(coins * 100).padStart(6, '0')}</b></div>
        <div><span className="coin-ico" />×<b>{String(n).padStart(2, '0')}</b></div>
        <div><span>WORLD</span><b>1-{sel + 1}</b></div>
        <div><span>YEAR</span><b>{p.year}</b></div>
      </header>

      {/* backdrop */}
      <div className="plat-sky" aria-hidden="true">
        <span className="cloud c1" /><span className="cloud c2" /><span className="cloud c3" />
        <span className="hill h1" /><span className="hill h2" /><span className="hill h3" />
        <span className="bush b1" /><span className="bush b2" />
      </div>

      {/* level card + what I did / learned, stacked in the middle row */}
      <div className="lc-wrap">
      <section className="level-card" key={p.id} style={{ '--c': p.color }}>
        <div className="lc-icon">{p.icon}</div>
        <div className="lc-body">
          <div className="lc-meta">{p.year} · {L(p.role)}</div>
          <h2>{L(p.name)}</h2>
          <p>{L(p.summary)}</p>
          {p.stack?.length > 0 && <div className="lc-stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>}
        </div>
        <div className="lc-stats">
          {[['⭐', 'impact'], ['🍄', 'scale'], ['🔥', 'craft']].map(([ico, k]) => (
            <div key={k} className="lc-stat">
              <span className="lc-k">{ico}</span>
              <span className="lc-bar"><i style={{ width: p.stats[k] + '%' }} /></span>
              <b>{p.stats[k]}</b>
            </div>
          ))}
          <div className="lc-links">
            {p.links.demo && <a className="pipe-btn" href={p.links.demo} target="_blank" rel="noreferrer">▶ PLAY</a>}
            {p.links.github && (
              <a className="pipe-btn dark" href={p.links.github} target="_blank" rel="noreferrer">
                <LinkIcon id="github" size={16} /> GitHub
              </a>
            )}
            {p.links.notion && (
              <a className="pipe-btn light" href={p.links.notion} target="_blank" rel="noreferrer">
                <LinkIcon id="notion" size={16} /> Notion
              </a>
            )}
          </div>
        </div>
      </section>

      {(p.did?.length > 0 || p.learned?.length > 0) && (
        <section className="quest-log" key={'q' + p.id} style={{ '--c': p.color }}>
          {p.did?.length > 0 && (
            <div className="ql-col">
              <h3><span className="ql-ico">🛠</span>{lang === 'ko' ? '핵심 기여' : 'Key contributions'}</h3>
              <ul>{p.did.map((d, i) => <li key={i} style={{ '--i': i }}>{L(d)}</li>)}</ul>
            </div>
          )}
          {p.learned?.length > 0 && (
            <div className="ql-col learned">
              <h3><span className="ql-ico">💡</span>{lang === 'ko' ? '배운 점' : 'What I learned'}</h3>
              <ul>{p.learned.map((d, i) => <li key={i} style={{ '--i': i + (p.did?.length || 0) }}>{L(d)}</li>)}</ul>
            </div>
          )}
        </section>
      )}
      </div>

      {/* the level */}
      <section className="level">
        <div className="pipe left"><i /></div>
        <div className="flag"><span className="pole" /><span className="banner" /><span className="castle" /></div>

        {projects.map((x, i) => (
          <button
            key={x.id}
            className={'qblock' + (visited.has(i) ? ' used' : '') + (i === sel ? ' sel' : '')}
            style={{ left: xOf(i) + '%' }}
            onClick={() => pick(i)}
            onMouseEnter={() => sfx.tick()}
            aria-label={L(x.name)}
          >
            <span className="q-face" key={i === sel ? 'b' + bump : 'idle'}>{visited.has(i) ? '' : '?'}</span>
            {i === sel && <span className="pop" key={'p' + bump}>{x.icon}</span>}
            <span className="q-label">1-{i + 1}</span>
          </button>
        ))}

        <div className="hero" style={{ left: xOf(sel) + '%', '--face': facing }}>
          <div className="hero-jump" key={'j' + bump}><Hero /></div>
        </div>

        <div className="ground" />
      </section>

      <p className="plat-hint">{lang === 'ko' ? '블록을 눌러 보세요' : 'Hit a block'} ◀ ▶</p>
    </main>
  );
}
