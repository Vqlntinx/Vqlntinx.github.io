import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { experience, worldMap } from '../data/experience.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import './Experience.css';

/*
  Open-world map like an in-game map screen.
  The world is a large canvas (worldMap.width × worldMap.height px) viewed through a
  camera: drag to pan (with a little glide), wheel / pinch / +− to zoom around the
  cursor, and picking a place flies the camera there. Pins sit at x/y % of the world
  and stay the same size on screen at any zoom.
*/
const W = worldMap.width;
const H = worldMap.height;
// zoom range: from 'whole map fills the view' up to 3× that (never below 1.25 px per image px)

function MapIcon({ kind }) {
  switch (kind) {
    case 'school': // book with a little flag
      return <svg viewBox="0 0 40 40"><path d="M6 12 L20 8 L34 12 V32 L20 28 L6 32Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="2.5" strokeLinejoin="round" /><path d="M20 8 V28" stroke="#f3e2b0" strokeWidth="2" /><path d="M26 4 V14 L31 11.5 L26 9" fill="#ffb347" stroke="#ffb347" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
    case 'cafe': // steaming cup
      return <svg viewBox="0 0 40 40"><path d="M8 16 H28 V26 Q28 33 21 33 H15 Q8 33 8 26Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="2.5" strokeLinejoin="round" /><path d="M28 19 Q34 19 34 23 Q34 27 28 27" fill="none" stroke="#f3e2b0" strokeWidth="2.5" /><path d="M14 12 Q12 9 14 6 M20 12 Q18 9 20 6" fill="none" stroke="#ffcf6b" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'arena': // crossed swords
      return <svg viewBox="0 0 40 40"><path d="M8 8 L26 26 M32 8 L14 26" stroke="#f3e2b0" strokeWidth="3.5" strokeLinecap="round" /><path d="M23 29 L29 23 M11 23 L17 29" stroke="#ffb347" strokeWidth="3.5" strokeLinecap="round" /><path d="M27 27 L32 32 M13 27 L8 32" stroke="#1d2a2a" strokeWidth="4" strokeLinecap="round" /></svg>;
    case 'beacon': // lighthouse with signal waves
      return <svg viewBox="0 0 40 40"><path d="M15 34 L17 14 H23 L25 34Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="2.5" strokeLinejoin="round" /><rect x="16" y="9" width="8" height="5" fill="#ffcf6b" stroke="#f3e2b0" strokeWidth="2" /><path d="M10 8 Q7 11.5 10 15 M30 8 Q33 11.5 30 15" fill="none" stroke="#7ff3ff" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'shrine':
      return <svg viewBox="0 0 40 40"><path d="M20 3 L35 20 L20 37 L5 20Z" fill="#1d2a2a" stroke="#ffb347" strokeWidth="3" /><circle cx="20" cy="20" r="6" fill="#7ff3ff" /></svg>;
    case 'village':
      return <svg viewBox="0 0 40 40"><path d="M6 20 L20 7 L34 20 V34 H6Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="3" strokeLinejoin="round" /><rect x="16" y="23" width="8" height="11" fill="#ffcf6b" /></svg>;
    case 'tower':
      return <svg viewBox="0 0 40 40"><path d="M14 36 L17 10 H23 L26 36Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="3" strokeLinejoin="round" /><circle cx="20" cy="8" r="5" fill="#ff9f43" stroke="#f3e2b0" strokeWidth="2" /></svg>;
    default:
      return <svg viewBox="0 0 40 40"><path d="M5 36 V14 L10 18 L14 10 L20 16 L26 10 L30 18 L35 14 V36Z" fill="#1d2a2a" stroke="#f3e2b0" strokeWidth="3" strokeLinejoin="round" /><rect x="17" y="25" width="6" height="11" fill="#ffcf6b" /></svg>;
  }
}

// Placeholder terrain until a real map image is supplied
function PlaceholderTerrain() {
  return (
    <svg className="terrain" viewBox="0 0 150 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M5 0 H0 V5" fill="none" stroke="#c9e6d4" strokeWidth=".04" opacity=".5" />
        </pattern>
      </defs>
      <rect width="150" height="100" fill="#1f4a54" />
      <path d="M8 22 C 24 8, 50 14, 70 8 S 120 2, 142 14 C 150 40, 146 70, 136 92 C 100 98, 50 99, 14 94 C 2 70, 0 40, 8 22Z" fill="#2f6b5a" />
      <path d="M14 30 C 30 22, 51 36, 78 28 S 123 20, 136 30 C 140 52, 134 76, 126 88 C 92 92, 52 93, 20 88 C 10 66, 9 46, 14 30Z" fill="#3c7d5f" />
      <path d="M18 54 C 36 46, 46 60, 70 54 S 110 44, 130 52 C 130 70, 124 82, 118 86 C 84 89, 50 89, 24 85 C 18 74, 16 64, 18 54Z" fill="#4c8f62" />
      <path d="M86 72 C 98 66, 114 72, 126 66 C 126 78, 120 84, 114 86 C 104 87, 94 86, 86 84Z" fill="#7a8f5c" />
      <path d="M100 10 L106 2 L114 12 L120 4 L132 14 V 24 C 120 20, 110 24, 100 18Z" fill="#8a9a8a" />
      <path d="M118 30 L124 22 L130 30 L134 26 L140 34 V40 C 132 38, 124 40, 118 36Z" fill="#9aa69a" />
      <path d="M10 74 C 18 70, 26 82, 36 80 S 50 90, 58 98 H 10Z" fill="#2b5f73" />
      <ellipse cx="62" cy="44" rx="7" ry="4" fill="#2b6f8a" />
      {[20, 30, 40, 50, 60, 70, 80].map((y) => (
        <path key={y} d={`M10 ${y} C 40 ${y - 6}, 70 ${y + 6}, 100 ${y - 2} S 130 ${y + 4}, 140 ${y}`} fill="none" stroke="#e8f4d8" strokeWidth=".08" opacity=".22" />
      ))}
      <path d="M44 6 C 48 24, 34 42, 40 62 S 56 90, 52 100" fill="none" stroke="#6fc3df" strokeWidth=".6" opacity=".7" />
      <rect width="150" height="100" fill="url(#grid)" />
    </svg>
  );
}

// Long-form write-up under the quests: blank lines split paragraphs, **text** is bold,
// a single line break stays a line break.
function Story({ text }) {
  return (
    <div className="q-story">
      {text.trim().split(/\n\s*\n/).map((para, i) => (
        <p key={i} style={{ animationDelay: 0.3 + i * 0.08 + 's' }}>
          {para.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
          )}
        </p>
      ))}
    </div>
  );
}

export default function Experience() {
  const { L } = usePrefs();
  const [sel, setSel] = useState(experience.length - 1);
  const [zoomPct, setZoomPct] = useState(0);
  const [grabbing, setGrabbing] = useState(false);
  const e = experience[sel];

  const view = useRef(null);
  const world = useRef(null);
  const cam = useRef({ x: 0, y: 0, s: 0.4 });     // what is drawn
  const target = useRef({ x: 0, y: 0, s: 0.4 });  // where it is heading
  const raf = useRef(0);
  const vp = useRef({ w: 1, h: 1 });
  const pointers = useRef(new Map());
  const gesture = useRef(null);
  const suppressClick = useRef(false);

  const minScale = () => Math.max(vp.current.w / W, vp.current.h / H);
  const maxScale = () => Math.max(1.25, minScale() * 3);
  const clampCam = (c) => {
    // never let a bad number through: a NaN in the transform makes the browser ignore it
    // and the map freezes while the pins keep rescaling
    const prev = target.current;
    const ok = (v, fallback) => (Number.isFinite(v) ? v : fallback);
    const s = Math.max(minScale(), Math.min(maxScale(), ok(c.s, prev.s)));
    const { w, h } = vp.current;
    const x = Math.min(0, Math.max(w - W * s, ok(c.x, prev.x)));
    const y = Math.min(0, Math.max(h - H * s, ok(c.y, prev.y)));
    return { x, y, s };
  };

  const paint = () => {
    const c = cam.current;
    if (!world.current) return;
    world.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) scale(${c.s})`;
    world.current.style.setProperty('--inv', String(1 / c.s));
  };

  const tick = useCallback(() => {
    const c = cam.current, t = target.current;
    const k = 0.16;
    c.x += (t.x - c.x) * k; c.y += (t.y - c.y) * k; c.s += (t.s - c.s) * k;
    const done = Math.abs(t.x - c.x) < 0.3 && Math.abs(t.y - c.y) < 0.3 && Math.abs(t.s - c.s) < 0.0005;
    if (done) Object.assign(c, t);
    paint();
    const min = minScale();
    setZoomPct(Math.round(((c.s - min) / (maxScale() - min)) * 100));
    rafAt.current = performance.now();
    raf.current = done ? 0 : requestAnimationFrame(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // (re)start the animation loop; a frame requested while the tab was hidden may never
  // fire, so a request older than ~100 ms is replaced instead of waited on
  const rafAt = useRef(0);
  const kick = () => {
    if (raf.current && performance.now() - rafAt.current < 100) return;
    cancelAnimationFrame(raf.current);
    rafAt.current = performance.now();
    raf.current = requestAnimationFrame((t) => { rafAt.current = performance.now(); tick(t); });
  };
  const setTarget = (t, instant = false) => {
    target.current = clampCam(t);
    if (instant) {
      cam.current = { ...target.current };
      paint();
      const min = minScale();
      setZoomPct(Math.round(((cam.current.s - min) / (maxScale() - min)) * 100));
      return;
    }
    kick();
  };

  // zoom by factor around a screen point (px, py relative to the view)
  const zoomAt = (factor, px, py, instant = false) => {
    const t = target.current;
    const s1 = Math.max(minScale(), Math.min(maxScale(), t.s * factor));
    const wx = (px - t.x) / t.s, wy = (py - t.y) / t.s;
    setTarget({ s: s1, x: px - wx * s1, y: py - wy * s1 }, instant);
  };

  // centre the camera on a pin
  const flyTo = (i, s) => {
    const p = experience[i];
    const scale = s ?? Math.max(target.current.s, minScale() * 1.6);
    setTarget({ s: scale, x: vp.current.w / 2 - (p.x / 100) * W * scale, y: vp.current.h / 2 - (p.y / 100) * H * scale });
  };

  // measure + initial view
  useEffect(() => {
    const measure = () => {
      const r = view.current.getBoundingClientRect();
      vp.current = { w: r.width, h: r.height };
      setTarget(target.current, true);
    };
    const r = view.current.getBoundingClientRect();
    vp.current = { w: r.width, h: r.height };
    const p = experience[sel];
    const s = minScale() * 1.6;
    setTarget({ s, x: r.width / 2 - (p.x / 100) * W * s, y: r.height / 2 - (p.y / 100) * H * s }, true);
    window.addEventListener('resize', measure);
    return () => { window.removeEventListener('resize', measure); cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (i) => {
    if (i < 0 || i >= experience.length) return;
    setSel(i);
    flyTo(i);
  };
  useEffect(() => { sfx.tick(); }, [sel]);

  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowUp') select(sel + 1);
      if (ev.key === 'ArrowLeft' || ev.key === 'ArrowDown') select(sel - 1);
      if (ev.key === '+' || ev.key === '=') zoomAt(1.3, vp.current.w / 2, vp.current.h / 2);
      if (ev.key === '-' || ev.key === '_') zoomAt(1 / 1.3, vp.current.w / 2, vp.current.h / 2);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  /* ---------- pointer: drag to pan, two fingers to pinch ---------- */
  const local = (ev) => { const r = view.current.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };

  const onPointerDown = (ev) => {
    if (ev.button !== 0 && ev.pointerType === 'mouse') return;
    pointers.current.set(ev.pointerId, local(ev));
    suppressClick.current = false;
    if (pointers.current.size === 1) {
      const [x, y] = local(ev);
      gesture.current = { type: 'pan', sx: x, sy: y, cx: target.current.x, cy: target.current.y, moved: false, id: ev.pointerId, samples: [[performance.now(), x, y]] };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { type: 'pinch', d: Math.hypot(a[0] - b[0], a[1] - b[1]), s: target.current.s };
      suppressClick.current = true;
    }
  };
  const onPointerMove = (ev) => {
    if (!pointers.current.has(ev.pointerId)) return;
    pointers.current.set(ev.pointerId, local(ev));
    const g = gesture.current;
    if (!g) return;
    if (g.type === 'pan') {
      const [x, y] = local(ev);
      if (!g.moved && Math.hypot(x - g.sx, y - g.sy) < 5) return;
      if (!g.moved) { g.moved = true; suppressClick.current = true; setGrabbing(true); view.current.setPointerCapture(g.id); }
      setTarget({ s: target.current.s, x: g.cx + (x - g.sx), y: g.cy + (y - g.sy) }, true);
      const now = performance.now();
      g.samples.push([now, x, y]);
      while (g.samples.length > 2 && now - g.samples[0][0] > 90) g.samples.shift();
    } else if (g.type === 'pinch' && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      if (g.d < 1) { g.d = Math.max(1, d); g.s = target.current.s; return; } // fingers started on the same spot
      zoomAt((g.s * (d / g.d)) / target.current.s, mx, my, true);
    }
  };
  const onPointerUp = (ev) => {
    pointers.current.delete(ev.pointerId);
    const g = gesture.current;
    if (g?.type === 'pan' && g.moved) {
      // glide a little in the direction of the throw
      const [t0, x0, y0] = g.samples[0];
      const [x1, y1] = local(ev);
      const dt = Math.max(16, performance.now() - t0);
      const vx = ((x1 - x0) / dt) * 260, vy = ((y1 - y0) / dt) * 260;
      setTarget({ s: target.current.s, x: target.current.x + vx, y: target.current.y + vy });
    }
    if (pointers.current.size === 0) { gesture.current = null; setGrabbing(false); }
  };
  const onWheel = (ev) => {
    const [x, y] = local(ev);
    zoomAt(Math.exp(-ev.deltaY * 0.0015), x, y);
  };
  // block page zoom/scroll while the wheel is over the map
  useEffect(() => {
    const el = view.current;
    const stop = (ev) => ev.preventDefault();
    el.addEventListener('wheel', stop, { passive: false });
    return () => el.removeEventListener('wheel', stop);
  }, []);

  const trail = experience.map((x, i) => `${i ? 'L' : 'M'}${(x.x / 100) * W} ${(x.y / 100) * H}`).join(' ');

  return (
    <main className="adv page-enter">
      <HomePill className="adv-pill" />
      <MusicChip track="call-to-adventure" className="over-map" />

      <div
        className={'adv-map' + (grabbing ? ' grabbing' : '')}
        ref={view}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClickCapture={(ev) => { if (suppressClick.current) { ev.stopPropagation(); ev.preventDefault(); suppressClick.current = false; } }}
      >
        <div className="world" ref={world} style={{ width: W, height: H }}>
          {worldMap.image ? <img className="world-img" src={worldMap.image} alt="" draggable="false" /> : <PlaceholderTerrain />}

          <svg className="trail-layer" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <path d={trail} className="trail" />
          </svg>

          {experience.map((x, i) => (
            <button
              key={x.id}
              className={'pin' + (i === sel ? ' sel' : '') + (i > sel ? ' fog' : '')}
              style={{ left: x.x + '%', top: x.y + '%' }}
              onClick={() => { select(i); sfx.select(); }}
              onMouseEnter={() => sfx.tick()}
              aria-label={L(x.place)}
            >
              <MapIcon kind={x.kind} />
              <span className="pin-label">{L(x.place)}</span>
            </button>
          ))}
        </div>

        <div className="map-vignette" aria-hidden="true" />

        <div className="compass" aria-hidden="true">
          <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="27" fill="rgba(10,20,20,.6)" stroke="#f3e2b0" strokeWidth="1.5" /><path d="M30 8 L35 30 L30 52 L25 30Z" fill="#f3e2b0" /><path d="M30 8 L35 30 H25Z" fill="#ff7a59" /><text x="30" y="6.5" textAnchor="middle" fontSize="6" fill="#f3e2b0">N</text></svg>
        </div>

        <div className="zoom-ctl" onPointerDown={(ev) => ev.stopPropagation()}>
          <button onClick={() => zoomAt(1.35, vp.current.w / 2, vp.current.h / 2)} aria-label="Zoom in">＋</button>
          <div className="zoom-bar"><i style={{ height: Math.max(4, zoomPct) + '%' }} /></div>
          <button onClick={() => zoomAt(1 / 1.35, vp.current.w / 2, vp.current.h / 2)} aria-label="Zoom out">－</button>
          <button className="zoom-focus" onClick={() => flyTo(sel)} aria-label="Focus">◎</button>
        </div>

        <div className="hearts" aria-label={experience.length + ' regions'}>
          {experience.map((x, i) => <span key={x.id} className={i <= sel ? 'full' : ''}>♥</span>)}
        </div>
      </div>

      <aside className="quest" key={e.id}>
        <div className="q-period">{e.period}</div>
        <h2 className="q-place">{L(e.place)}</h2>
        <div className="q-title">{L(e.title)}</div>
        <div className="q-rule" />
        <ul className="q-list">
          {e.quests.map((q, i) => <li key={i} style={{ animationDelay: 0.15 + i * 0.12 + 's' }}>{L(q)}</li>)}
        </ul>
        {e.story && L(e.story) && (
          <>
            <hr className="q-divider" />
            <Story text={L(e.story)} />
          </>
        )}
        <div className="q-nav">
          <button disabled={sel === 0} onClick={() => select(sel - 1)} aria-label="Previous">◀</button>
          <span>{sel + 1} / {experience.length}</span>
          <button disabled={sel === experience.length - 1} onClick={() => select(sel + 1)} aria-label="Next">▶</button>
        </div>
      </aside>
    </main>
  );
}
