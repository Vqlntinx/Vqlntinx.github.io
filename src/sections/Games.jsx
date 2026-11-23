import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { games, TYPE_COLORS } from '../data/games.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import './Games.css';

// Creature-dex style handheld: every game I've played is a registered entry.
const no = (n) => 'No.' + String(n).padStart(3, '0');

// The game's own icon as a thick 3D coin: floats up and down in the middle of the screen.
// The edge is the icon itself stacked in darkened slices, so it follows the icon's real shape.
// Every icon spins a full 360°. The back face is the icon mirrored, as if seen from behind
// through the coin. Wide logos get a wider coin.
// Override per game with iconMotion: 'spin' (default) | 'loop' (front only, edge to edge) | 'sway'.
const SLICES = 16; // keep in step with --depth in Games.css
function IconCoin({ g }) {
  const [a, b] = g.types.map((t) => TYPE_COLORS[t]).filter(Boolean);
  const [wide, setWide] = useState(false);
  const motion = g.iconMotion ?? 'spin';
  const onLoad = (e) => setWide(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight > 1.25);
  return (
    <div className={'coin-stage ' + motion + (wide ? ' wide' : '')} style={{ '--a': a ?? '#8a8f99', '--b': b ?? a ?? '#5b6070' }}>
      <div className="coin-bob">
        <div className="coin-spin">
          {Array.from({ length: SLICES }, (_, i) => (
            <img key={i} className="coin-slice" src={g.icon} alt="" draggable="false"
              style={{ '--z': i - (SLICES - 1) / 2 }} />
          ))}
          <img className="coin-face front" src={g.icon} alt={g.title} draggable="false" onLoad={onLoad} />
          <img className="coin-face back" src={g.icon} alt="" draggable="false" />
        </div>
      </div>
      <div className="coin-shadow" />
    </div>
  );
}

// Long notes: drift slowly down, rest at the end, fade back to the top and go again.
// Hovering or scrolling by hand pauses it; it picks up again after a moment.
function AutoScrollNote({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf, last = performance.now(), phase = 'top', until = last + 2500, pausedUntil = 0, hover = false, pos = 0;
    const SPEED = 16; // px per second
    const hold = () => { pausedUntil = performance.now() + 3000; };
    const enter = () => { hover = true; }, leave = () => { hover = false; pos = el.scrollTop; hold(); };
    // The browser's default wheel step (~100px) skips most of a short note box, so scroll it in smaller steps.
    // At either end the event is left alone so the page itself still scrolls.
    const WHEEL_SCALE = 0.3;
    const onWheel = (e) => {
      hold();
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
      const dy = e.deltaY * unit * WHEEL_SCALE;
      if ((dy < 0 && el.scrollTop <= 0) || (dy > 0 && el.scrollTop >= max - 1)) return;
      e.preventDefault();
      el.scrollTop = Math.max(0, Math.min(max, el.scrollTop + dy));
      pos = el.scrollTop;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', hold, { passive: true });
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (max > 2 && !hover && now >= pausedUntil) {
        if (Math.abs(el.scrollTop - pos) > 2) pos = el.scrollTop; // the reader moved it
        if (phase === 'top' && now >= until) phase = 'down';
        if (phase === 'down') {
          pos = Math.min(max, pos + SPEED * dt);
          el.scrollTop = pos;
          if (pos >= max) { phase = 'bottom'; until = now + 2500; }
        } else if (phase === 'bottom' && now >= until) {
          phase = 'fade'; el.classList.add('fading'); until = now + 450;
        } else if (phase === 'fade' && now >= until) {
          pos = 0; el.scrollTop = 0; el.classList.remove('fading'); phase = 'top'; until = now + 2500;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', hold);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);
  return <p className="entry-note" ref={ref}>{children}</p>;
}

function Cover({ g }) {
  if (g.icon) return <IconCoin g={g} />;
  if (g.cover) return <img src={g.cover} alt="" />;
  const [a, b] = g.types.map((t) => TYPE_COLORS[t]);
  // deterministic 6×6 symmetric pixel "creature" from the title
  let h = 0;
  for (const ch of g.title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const px = [];
  for (let y = 0; y < 6; y++) for (let x = 0; x < 3; x++) {
    if ((h >> ((y * 3 + x) % 30)) & 1) { px.push([x, y]); px.push([5 - x, y]); }
  }
  return (
    <svg viewBox="0 0 120 120">
      <defs>
        <radialGradient id={'cv' + g.id} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset=".45" stopColor={a} />
          <stop offset="1" stopColor={b ?? a} />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#cv${g.id})`} />
      <g transform="translate(30 26)">
        {px.map(([x, y], i) => <rect key={i} x={x * 10} y={y * 10} width="10" height="10" fill="#1d1d2b" />)}
        <rect x="10" y="20" width="8" height="8" fill="#fff" /><rect x="42" y="20" width="8" height="8" fill="#fff" />
      </g>
      <ellipse cx="60" cy="104" rx="30" ry="5" fill="#000" opacity=".2" />
    </svg>
  );
}

export default function Games() {
  const { L, lang } = usePrefs();
  const [type, setType] = useState(null);
  const list = useMemo(() => (type ? games.filter((g) => g.types.includes(type)) : games), [type]);
  const [sel, setSel] = useState(0);
  const g = list[Math.min(sel, list.length - 1)];
  const listRef = useRef(null);

  useEffect(() => { setSel(0); }, [type]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(list.length - 1, s + 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(0, s - 1)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [list.length]);
  useEffect(() => {
    sfx.tick();
    listRef.current?.querySelector('.sel')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [sel, type]);

  const totalHours = games.reduce((s, x) => s + x.hours, 0);
  const types = Object.keys(TYPE_COLORS).filter((t) => games.some((x) => x.types.includes(t)));

  return (
    <main className="dex page-enter">
      <HomePill />
      <MusicChip track="delightful-d" />
      <div className="dex-device">
        <header className="dex-top">
          <span className="lens" />
          <span className="led r" /><span className="led y" /><span className="led g" />
          <h1>GAME·DEX</h1>
          <div className="dex-count">
            <span><b>{games.length}</b> {lang === 'ko' ? '등록' : 'CAUGHT'}</span>
            <span><b>{totalHours.toLocaleString()}</b>h</span>
          </div>
        </header>

        <div className="dex-body">
          <section className="dex-entry" key={g.id}>
            <div className="dex-screen">
              <div className="cover"><Cover g={g} /></div>
              <div className="scan" />
            </div>
            <div className="entry-head">
              <span className="entry-no">{no(g.id)}</span>
              <h2>{g.title}</h2>
            </div>
            <div className="entry-types">
              {g.types.map((t) => <span key={t} style={{ background: TYPE_COLORS[t] }}>{t}</span>)}
            </div>
            <dl className="entry-stats">
              {/* pixel-font labels stay in English in both languages (Korean is unreadable at this size) */}
              <div><dt>PLAYED</dt><dd>{g.hours}h</dd></div>
              <div><dt>RATING</dt><dd className="stars">{'★'.repeat(g.rating)}<i>{'★'.repeat(5 - g.rating)}</i></dd></div>
              <div><dt>SINCE</dt><dd>{g.year}</dd></div>
            </dl>
            <AutoScrollNote>{L(g.note)}</AutoScrollNote>
          </section>

          <section className="dex-list-wrap">
            <div className="dex-filter">
              <button className={!type ? 'on' : ''} onClick={() => { setType(null); sfx.select(); }}>ALL</button>
              {types.map((t) => (
                <button key={t} className={type === t ? 'on' : ''} style={{ '--t': TYPE_COLORS[t] }} onClick={() => { setType(type === t ? null : t); sfx.select(); }}>{t}</button>
              ))}
            </div>
            <ol className="dex-list" ref={listRef}>
              {list.map((x, i) => (
                <li key={x.id}>
                  <button className={i === sel ? 'sel' : ''} onClick={() => setSel(i)}>
                    <span className="ball" />
                    <span className="l-no">{no(x.id)}</span>
                    <span className="l-title">{x.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
