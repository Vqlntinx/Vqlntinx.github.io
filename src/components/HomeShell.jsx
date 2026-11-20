import { useEffect, useRef, useState, useCallback } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { go } from '../lib/router.js';
import { sfx } from '../lib/sound.js';
import { ART } from './CardArt.jsx';
import Avatar from './Avatar.jsx';
import SysToggles from './SysToggles.jsx';
import ProfileModal from './ProfileModal.jsx';
import Contact from './Contact.jsx';
import './HomeShell.css';

// ✏️ image: put a square cover in public/cards/ and set its path (e.g. './cards/projects.webp').
//    Left as null, the card uses its built-in SVG art.
export const CARDS = [
  { id: 'projects', label: { ko: '프로젝트', en: 'Projects' }, image: './cards/projects.webp' },
  { id: 'experience', label: { ko: '경험', en: 'Experience' }, image: './cards/experience.webp' },
  { id: 'skills', label: { ko: '스킬', en: 'Skills' }, image: './cards/skills.webp' },
  { id: 'games', label: { ko: '게임 도감', en: 'Games' }, image: null },
  { id: 'reads', label: { ko: '독서', en: 'Reads' }, image: './cards/reads.webp' },
];

// a card's cover: the supplied image, or the built-in SVG art
function Cover({ card }) {
  if (card.image) return <img className="card-img" src={card.image} alt="" draggable="false" />;
  const Art = ART[card.id];
  return <Art />;
}

// Page title row (Memories / Contact live in the round system icons below the cards)
const TITLES = {
  home: { ko: '홈', en: 'Home' },
  contact: { ko: '연락', en: 'Contact' },
};

// remember the last focused card between visits
let lastIndex = 0;

export default function HomeShell({ tab }) {
  const { L } = usePrefs();
  const [index, setIndexState] = useState(lastIndex);
  const [launching, setLaunching] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const setIndex = useCallback((i) => {
    if (!Number.isFinite(i)) return;
    const n = Math.max(0, Math.min(CARDS.length - 1, Math.round(i)));
    setIndexState((old) => { if (old !== n) sfx.tick(); return n; });
    lastIndex = n;
  }, []);

  const open = useCallback((i) => {
    if (launching) return;
    sfx.open();
    setLaunching(CARDS[i].id);
    setTimeout(() => go(CARDS[i].id), 520);
  }, [launching]);

  useEffect(() => {
    const onKey = (e) => {
      if (profileOpen) { if (e.key === 'Escape' || e.key === 'b') setProfileOpen(false); return; }
      if (tab !== 'home') { if (e.key === 'Escape' || e.key === 'b') go('home'); return; }
      if (e.key === 'ArrowRight') setIndex(index + 1);
      else if (e.key === 'ArrowLeft') setIndex(index - 1);
      else if (e.key === 'Enter' || e.key === 'a') open(index);
      else if (e.key === 'Escape' || e.key === 'b') { sfx.back(); go(''); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, tab, profileOpen, open, setIndex]);


  return (
    <div className={'shell page-enter' + (launching ? ' launching' : '')}>
      <div className="shell-bg" key={CARDS[index].id}><Cover card={CARDS[index]} /></div>
      <div className="shell-bg-dim" />

      <header className="shell-top">
        <button className="shell-avatar" onClick={() => { sfx.select(); setProfileOpen(true); }} aria-label="Profile">
          <Avatar size={64} />
        </button>
        <div className="shell-status">
          <SysToggles />
          <Battery />
          <Wifi />
          <Clock />
        </div>
      </header>

      <nav className="shell-tabs">
        {tab === 'home' ? (
          <span className="active">{L(TITLES.home)}</span>
        ) : (
          <>
            <button onClick={() => { sfx.back(); go('home'); }}>{L(TITLES.home)}</button>
            <span className="crumb">›</span>
            <span className="active">{L(TITLES[tab])}</span>
          </>
        )}
      </nav>

      {tab === 'home' && (
        <Carousel index={index} setIndex={setIndex} onOpen={open} launching={launching} L={L} />
      )}
      {tab === 'contact' && <Contact />}

      {tab === 'home' && (
        <nav className="sys-icons" aria-label="System">
          {[
            { id: 'memories', color: '#ff5a4e', label: { ko: '추억', en: 'Memories' }, act: () => go('memories'),
              icon: <path d="M4 6h16v12H4z M4 15l4-4 4 4 3-3 5 5 M15 9.5a1.5 1.5 0 1 0 0 .01" /> },
            { id: 'contact', color: '#2fd8ff', label: { ko: '연락', en: 'Contact' }, act: () => go('contact'),
              icon: <path d="M4 5h16v11H9l-5 4z M8 10h8 M8 13h5" /> },
            { id: 'profile', color: '#7b5cff', label: { ko: '프로필', en: 'Profile' }, act: () => setProfileOpen(true),
              icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6" /> },
            { id: 'room', color: '#f5b400', label: { ko: '방으로', en: 'Room' }, act: () => go(''),
              icon: <path d="M12 3v8 M7 6.5a7 7 0 1 0 10 0" /> },
          ].map((s) => (
            <button key={s.id} className="sys-icon" style={{ '--c': s.color }} onClick={() => { sfx.select(); s.act(); }} onMouseEnter={() => sfx.tick()} aria-label={L(s.label)}>
              <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              <span className="sys-tip">{L(s.label)}</span>
            </button>
          ))}
        </nav>
      )}

      <footer className="shell-hints">
        {tab === 'home' ? (
          <>
            <span><i className="hint-key">◀ ▶</i>{L({ ko: '이동', en: 'Move' })}</span>
            <span><i className="btn-glyph">B</i>{L({ ko: '방으로', en: 'Room' })}</span>
            <span><i className="btn-glyph">A</i>{L({ ko: '시작', en: 'Start' })}</span>
          </>
        ) : (
          <span><i className="btn-glyph">B</i>{L({ ko: '뒤로', en: 'Back' })}</span>
        )}
      </footer>

      {profileOpen && <ProfileModal onClose={() => { sfx.back(); setProfileOpen(false); }} />}
    </div>
  );
}

/*
  Carousel: scroll position and selection are independent.
  - Keyboard / click move the SELECTION first; the row only scrolls (smoothly)
    when the selected card would leave the screen.
  - Dragging moves the row 1:1 with the pointer, then glides with momentum and
    rubber-bands at both ends. If the selected card is pushed off-screen, the
    selection hops to the nearest card still fully visible on that side.
  The row is animated in a single requestAnimationFrame loop that writes the
  transform directly, so nothing re-renders per frame.
*/
let lastOffset = 0; // remember scroll between visits

function Carousel({ index, setIndex, onOpen, launching, L }) {
  const viewport = useRef(null);
  const track = useRef(null);
  const [dragging, setDragging] = useState(false);

  const m = useRef({ pad: 52, step: 400, card: 360, width: 1000 }); // measurements
  const s = useRef({ pos: lastOffset, vel: 0, target: null, mode: 'idle', raf: 0, last: 0 });
  const drag = useRef(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const maxOffset = () => {
    const { pad, step, card, width } = m.current;
    return Math.max(0, pad * 2 + (CARDS.length - 1) * step + card - width);
  };
  const clamp = (v) => Math.max(0, Math.min(maxOffset(), v));
  const paint = () => { if (track.current) track.current.style.transform = `translate3d(${-s.current.pos}px,0,0)`; };

  // fully-visible card range for a given scroll position
  const visibleRange = (pos) => {
    const { pad, step, card, width } = m.current;
    const first = Math.ceil((pos - pad + 8) / step);
    const last = Math.floor((pos + width - pad - card - 8) / step);
    return [Math.max(0, first), Math.min(CARDS.length - 1, last)];
  };

  // keep the selection on screen while the row is being scrolled by hand
  const followSelection = () => {
    const [a, b] = visibleRange(s.current.pos);
    if (a > b) return;
    const i = indexRef.current;
    if (i < a) setIndex(a, true);
    else if (i > b) setIndex(b, true);
  };

  const loop = (now) => {
    const st = s.current;
    const dt = Math.min(0.05, (now - (st.last || now)) / 1000) || 0.016;
    st.last = now;
    const max = maxOffset();

    if (st.mode === 'ease') {
      // critically-damped ease toward the target
      const k = 1 - Math.exp(-dt * 11);
      st.pos += (st.target - st.pos) * k;
      if (Math.abs(st.target - st.pos) < 0.4) { st.pos = st.target; st.mode = 'idle'; }
    } else if (st.mode === 'glide') {
      st.pos += st.vel * dt;
      st.vel *= Math.exp(-dt * 3.2); // friction
      const out = st.pos < 0 ? 0 : st.pos > max ? max : null;
      if (out !== null) {
        // spring back from beyond the ends
        st.vel *= Math.exp(-dt * 18);
        st.pos += (out - st.pos) * (1 - Math.exp(-dt * 12));
        if (Math.abs(out - st.pos) < 0.5 && Math.abs(st.vel) < 20) { st.pos = out; st.mode = 'idle'; }
      } else if (Math.abs(st.vel) < 8) {
        st.mode = 'idle';
      }
      followSelection();
    }
    paint();
    lastOffset = st.pos;
    if (st.mode === 'idle' || st.mode === 'drag') { st.raf = 0; st.last = 0; return; }
    st.raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!s.current.raf) s.current.raf = requestAnimationFrame(loop); };

  const easeTo = (target) => {
    s.current.target = clamp(target);
    s.current.mode = 'ease';
    kick();
  };

  // scroll just enough to reveal card i
  const reveal = (i, instant = false) => {
    const { pad, step, card, width } = m.current;
    const x = pad + i * step;
    const pos = s.current.mode === 'ease' ? s.current.target : s.current.pos;
    let next = pos;
    if (x - pad < pos) next = x - pad;
    else if (x + card + pad > pos + width) next = x + card + pad - width;
    if (next === pos) return;
    if (instant) { s.current.pos = clamp(next); paint(); } else easeTo(next);
  };

  // measure on mount / resize
  useEffect(() => {
    const measure = () => {
      const vp = viewport.current;
      const slots = vp?.querySelectorAll('.card-slot');
      if (!vp || !slots || slots.length < 2) return;
      m.current = {
        pad: parseFloat(getComputedStyle(vp).paddingLeft) || 0,
        step: slots[1].offsetLeft - slots[0].offsetLeft,
        card: slots[0].querySelector('.card').offsetWidth,
        width: vp.clientWidth,
      };
      s.current.pos = clamp(s.current.pos);
      paint();
      reveal(indexRef.current, true);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('resize', measure); cancelAnimationFrame(s.current.raf); s.current.raf = 0; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // selection changed by keyboard/click → make sure it is on screen
  useEffect(() => { if (s.current.mode !== 'drag') reveal(index); /* eslint-disable-next-line */ }, [index]);

  /* ---------- pointer ---------- */
  const onDown = (e) => {
    if (e.button !== 0) return;
    cancelAnimationFrame(s.current.raf); s.current.raf = 0;
    drag.current = { x: e.clientX, start: s.current.pos, moved: false, id: e.pointerId, samples: [[performance.now(), e.clientX]] };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      d.x = e.clientX; // start from here so the row doesn't jump by the threshold
      d.start = s.current.pos;
      s.current.mode = 'drag';
      setDragging(true);
      viewport.current.setPointerCapture(d.id);
      return;
    }
    let pos = d.start - dx;
    const max = maxOffset();
    if (pos < 0) pos = pos * 0.35;                       // rubber band
    else if (pos > max) pos = max + (pos - max) * 0.35;
    s.current.pos = pos;
    paint();
    followSelection();
    const now = performance.now();
    d.samples.push([now, e.clientX]);
    while (d.samples.length > 2 && now - d.samples[0][0] > 90) d.samples.shift();
  };
  const onUp = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved) {
      const [t0, x0] = d.samples[0];
      const dt = (performance.now() - t0) / 1000;
      const v = dt > 0 ? -(e.clientX - x0) / dt : 0; // px/s in scroll direction
      s.current.vel = Math.max(-4000, Math.min(4000, v));
      s.current.mode = 'glide';
      setDragging(false);
      kick();
    } else {
      const el = e.target.closest('[data-idx]');
      if (!el) return;
      const i = Number(el.dataset.idx);
      if (i === indexRef.current) onOpen(i);
      else setIndex(i);
    }
  };
  const onWheel = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const base = s.current.mode === 'ease' ? s.current.target : s.current.pos;
    s.current.target = clamp(base + delta * 1.2);
    s.current.mode = 'ease';
    kick();
    // keep selection visible while wheel-scrolling
    requestAnimationFrame(() => {
      const [a, b] = visibleRange(s.current.target);
      const i = indexRef.current;
      if (i < a) setIndex(a, true); else if (i > b) setIndex(b, true);
    });
  };

  return (
    <section
      className={'carousel' + (dragging ? ' dragging' : '')}
      ref={viewport}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={() => { drag.current = null; setDragging(false); s.current.vel = 0; s.current.mode = 'glide'; kick(); }}
      onWheel={onWheel}
    >
      <div className="track" ref={track} style={{ transform: `translate3d(${-s.current.pos}px,0,0)` }}>
        {CARDS.map((c, i) => {
          const sel = i === index;
          return (
            <div key={c.id} className={'card-slot' + (sel ? ' sel' : '')}>
              <button
                className={'card' + (sel ? ' sel' : '') + (launching === c.id ? ' launch' : '')}
                data-idx={i}
                aria-label={L(c.label)}
                onFocus={(e) => { if (e.target.matches(':focus-visible')) setIndex(i); }}
                onDragStart={(e) => e.preventDefault()}
                onKeyDown={(e) => { if (e.key === ' ') onOpen(i); }}
              >
                <Cover card={c} />
              </button>
              <div className="card-label">{L(c.label)}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return <time className="shell-clock" dateTime={now.toISOString()}>{hh}<span className="colon">:</span>{mm}</time>;
}

function Battery() {
  const [b, setB] = useState({ level: 0.5, charging: false });
  useEffect(() => {
    let batt;
    const upd = () => batt && setB({ level: batt.level, charging: batt.charging });
    navigator.getBattery?.().then((x) => {
      batt = x; upd();
      x.addEventListener('levelchange', upd);
      x.addEventListener('chargingchange', upd);
    }).catch(() => {});
    return () => { if (batt) { batt.removeEventListener('levelchange', upd); batt.removeEventListener('chargingchange', upd); } };
  }, []);
  const pct = Math.round(b.level * 100);
  return (
    <span className="shell-batt">
      {pct}%
      <svg viewBox="0 0 30 16" width="30" height="16" aria-hidden="true">
        <rect x="1" y="1" width="25" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="27" y="5" width="2.5" height="6" rx="1" fill="currentColor" />
        <rect x="3.5" y="3.5" width={Math.max(1, 20 * b.level)} height="9" rx="1.5" fill={pct <= 15 ? '#ff5a4e' : 'currentColor'} />
        {b.charging && <path d="M15 2 L10 9 H14 L12 14 L18 7 H14 Z" fill="#2fd8ff" />}
      </svg>
    </span>
  );
}

function Wifi() {
  return (
    <svg className="shell-wifi" viewBox="0 0 24 18" width="26" height="20" aria-hidden="true" fill="currentColor">
      <path d="M12 17.5 L8.6 13.4 A5 5 0 0 1 15.4 13.4 Z" />
      <path d="M5.8 10.2 A9 9 0 0 1 18.2 10.2 L16.6 12.1 A6.5 6.5 0 0 0 7.4 12.1 Z" />
      <path d="M2.6 6.6 A13.5 13.5 0 0 1 21.4 6.6 L19.8 8.5 A11 11 0 0 0 4.2 8.5 Z" />
    </svg>
  );
}
