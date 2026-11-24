import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { games, TYPE_COLORS } from '../data/games.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import './Games.css';

// Creature-dex style handheld: every game I've played is a registered entry.
const no = (n) => 'No.' + String(n).padStart(3, '0');

// rating is out of 10, drawn as 5 stars where each star is worth 2 points (odd scores end in a half star)
function Stars({ rating = 0 }) {
  return (
    <span className="stars" aria-label={rating ? `${rating} / 10` : 'unrated'}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(2, rating - i * 2));
        return <span key={i} className={'star ' + (fill === 2 ? 'full' : fill === 1 ? 'half' : 'empty')}>★</span>;
      })}
    </span>
  );
}

// sort keys: default direction first, click again to reverse. Unrated games always sink to the bottom.
// (No. already follows play time, so play time is also the starting order.)
const SORTS = [
  { id: 'hours', label: { ko: '플레이 시간', en: 'Played' }, dir: -1, cmp: (a, b) => a.hours - b.hours },
  { id: 'rating', label: { ko: '평점', en: 'Rating' }, dir: -1, cmp: (a, b) => a.rating - b.rating || a.hours - b.hours },
  { id: 'name', label: { ko: '이름', en: 'Name' }, dir: 1, cmp: (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base', numeric: true }) },
];

// The game's own icon as a thick 3D coin: floats up and down in the middle of the screen.
// The edge is the icon itself stacked in darkened slices, so it follows the icon's real shape.
// Every icon spins a full 360°. The back face is the icon mirrored, as if seen from behind
// through the coin. Wide logos get a wider coin.
// Override per game with iconMotion: 'spin' (default) | 'loop' (front only, edge to edge) | 'sway'.
const SLICES = 16; // keep in step with --depth in Games.css
function IconCoin({ g }) {
  const [a, b] = g.types.map((t) => TYPE_COLORS[t]).filter(Boolean);
  const [wide, setWide] = useState(false);
  const [tiny, setTiny] = useState(false); // small (≤64px) store icons: scale as crisp pixels instead of a blur
  const motion = g.iconMotion ?? 'spin';
  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    setWide(w / h > 1.25 ? (w / h > 3 ? 'xwide' : 'wide') : false);
    setTiny(w < 128);
  };
  return (
    <div className={'coin-stage ' + motion + (wide ? ' wide ' + wide : '') + (tiny ? ' tiny' : '')} style={{ '--a': a ?? '#8a8f99', '--b': b ?? a ?? '#5b6070' }}>
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
  const [sort, setSort] = useState({ id: 'hours', dir: -1 });
  const list = useMemo(() => {
    const base = type ? games.filter((g) => g.types.includes(type)) : games;
    const s = SORTS.find((x) => x.id === sort.id);
    return [...base].sort((a, b) => {
      if (sort.id === 'rating' && !a.rating !== !b.rating) return a.rating ? -1 : 1; // unrated last either way
      return s.cmp(a, b) * sort.dir || a.id - b.id;
    });
  }, [type, sort]);
  const pickSort = (id) => {
    const s = SORTS.find((x) => x.id === id);
    setSort((cur) => (cur.id === id ? { id, dir: -cur.dir } : { id, dir: s.dir }));
    sfx.select();
  };
  const [sel, setSel] = useState(0);
  const g = list[Math.min(sel, list.length - 1)];
  const listRef = useRef(null);

  useEffect(() => { setSel(0); }, [type, sort]);
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
  }, [sel, type, sort]);

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
              <div><dt>RATING <b className="rate-num">{g.rating ? `${g.rating}/10` : '—'}</b></dt><dd><Stars rating={g.rating} /></dd></div>
              <div><dt>SINCE</dt><dd>{g.year ?? '—'}</dd></div>
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
            <div className="dex-sort" role="group" aria-label={lang === 'ko' ? '정렬' : 'Sort'}>
              <span className="sort-label">SORT</span>
              {SORTS.map((s) => (
                <button key={s.id} className={sort.id === s.id ? 'on' : ''} onClick={() => pickSort(s.id)} aria-pressed={sort.id === s.id}>
                  {L(s.label)}{sort.id === s.id && <i>{sort.dir < 0 ? '▼' : '▲'}</i>}
                </button>
              ))}
            </div>
            <ol className="dex-list" ref={listRef}>
              {list.map((x, i) => (
                <li key={x.id}>
                  <button className={i === sel ? 'sel' : ''} onClick={() => setSel(i)}>
                    <span className="ball" />
                    <span className="l-no">{no(x.id)}</span>
                    <span className="l-title">{x.title}</span>
                    {sort.id === 'hours' && <span className="l-meta">{x.hours}h</span>}
                    {sort.id === 'rating' && <span className="l-meta">{x.rating ? `${x.rating}/10` : '—'}</span>}
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
