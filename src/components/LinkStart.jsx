import { useEffect, useRef, useState } from 'react';
import { sfx } from '../lib/sound.js';
import './LinkStart.css';

/*
  Full-screen "dive into the game" transition (timeline in seconds):
  0.0–1.1  the intro is zooming into the console screen (overlay is transparent)
  1.1–1.4  white flash
  1.4–3.4  rainbow light streaks rush past + sensory check list
  3.4–4.4  rainbow rings bloom slowly and white-out   (home is mounted underneath at 3.4)
  3.8–     "Link Finished !" types itself out with a blinking cursor
  …–+0.9   the finished line holds for a beat, then the overlay fades into home
  Click anywhere to skip to the rings.
*/
const DONE_TEXT = 'Link Finished !';
const TYPE_START = 3.8, TYPE_STEP = 0.075;
const T = { flash: 1.1, warp: 1.4, rings: 3.4, hold: 4.4 };
T.fade = TYPE_START + DONE_TEXT.length * TYPE_STEP + 0.9;
T.end = T.fade + 0.8;
const CHECKS = ['Touch', 'Sight', 'Hearing', 'Taste', 'Smell'];

export default function LinkStart({ onEnterHome, onDone }) {
  const canvas = useRef(null);
  const [phase, setPhase] = useState('wait');
  const [checks, setChecks] = useState(0);
  const [typed, setTyped] = useState(0);
  const entered = useRef(false);
  useEffect(() => { if (typed > 0 && DONE_TEXT[typed - 1] !== ' ') sfx.text(); }, [typed]);
  const skipRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduce ? 3 : 1;
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    let W, H, dpr;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = innerWidth * dpr;
      H = cv.height = innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const streaks = Array.from({ length: 420 }, () => spawn(true));
    function spawn(initial) {
      return {
        a: Math.random() * Math.PI * 2,
        r: initial ? Math.random() : Math.random() * 0.05,
        v: 0.25 + Math.random() * 0.9,
        hue: Math.floor(Math.random() * 360),
        w: 0.6 + Math.random() * 2.2,
      };
    }

    let t0 = performance.now();
    let raf;
    let last = t0;
    const timers = [];

    skipRef.current = () => { t0 = performance.now() - T.rings * 1000 / speed; };

    const frame = (now) => {
      const t = ((now - t0) / 1000) * speed;
      const dt = Math.min(0.05, (now - last) / 1000) * speed;
      last = now;
      const cx = W / 2, cy = H / 2, R = Math.hypot(cx, cy);
      ctx.clearRect(0, 0, W, H);

      if (t >= T.flash) {
        // background: bright core fading to a pale prism tint
        const flashK = Math.min(1, (t - T.flash) / 0.3);
        ctx.globalAlpha = flashK;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(0.5, '#f4fbff');
        g.addColorStop(1, '#dfe9ff');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }

      if (t >= T.warp && t < T.hold + 0.3) {
        const accel = 1 + Math.pow(Math.max(0, t - T.warp), 2) * 1.6;
        ctx.lineCap = 'round';
        for (const s of streaks) {
          s.r += s.v * dt * 0.55 * accel;
          if (s.r > 1.1) Object.assign(s, spawn(false));
          const r1 = s.r * s.r * R;
          const r2 = Math.min(R * 1.2, r1 + (0.04 + s.r * 0.35) * R * Math.min(accel, 3) * 0.6);
          const cos = Math.cos(s.a), sin = Math.sin(s.a);
          ctx.strokeStyle = `hsla(${s.hue}, 95%, ${55 + s.r * 10}%, ${0.25 + s.r * 0.75})`;
          ctx.lineWidth = s.w * dpr * (0.4 + s.r * 2.2);
          ctx.beginPath();
          ctx.moveTo(cx + cos * r1, cy + sin * r1);
          ctx.lineTo(cx + cos * r2, cy + sin * r2);
          ctx.stroke();
        }
        // core glow
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.25);
        cg.addColorStop(0, 'rgba(255,255,255,1)');
        cg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = cg;
        ctx.fillRect(0, 0, W, H);
      }

      if (t >= T.rings) {
        const k = Math.min(1, (t - T.rings) / (T.hold - T.rings));
        for (let i = 0; i < 9; i++) {
          const rr = (k * 1.6 - i * 0.12) * R;
          if (rr <= 0) continue;
          ctx.strokeStyle = `hsla(${(i * 40 + t * 200) % 360}, 95%, 62%, ${Math.max(0, 1 - k)})`;
          ctx.lineWidth = (18 + i * 6) * dpr;
          ctx.beginPath();
          ctx.arc(cx, cy, rr, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, k * 1.2)})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (t >= T.hold) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);
      }

      if (t >= T.rings && !entered.current) { entered.current = true; onEnterHome(); }

      // phase flags for the DOM layer
      const p = t < T.flash ? 'wait' : t < T.warp ? 'flash' : t < T.rings ? 'warp' : t < T.hold ? 'rings' : t < T.fade ? 'hold' : t < T.end ? 'fade' : 'done';
      setPhase((old) => (old === p ? old : p));
      if (p === 'warp') setChecks(Math.min(CHECKS.length, Math.floor((t - T.warp - 0.35) / 0.22) + 1));
      if (t >= TYPE_START) { const n = Math.min(DONE_TEXT.length, Math.floor((t - TYPE_START) / TYPE_STEP) + 1); setTyped((o) => (o === n ? o : n)); }

      if (t < T.end) raf = requestAnimationFrame(frame);
      else onDone();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={'linkstart ls-' + phase} onClick={() => skipRef.current?.()}>
      <canvas ref={canvas} />
      <div className="ls-title">
        <span>LINK</span><span>START</span>
      </div>
      <ul className="ls-checks">
        {CHECKS.map((c, i) => (
          <li key={c} className={i < checks ? 'ok' : ''}>
            <span>{c}</span><b>OK</b>
          </li>
        ))}
      </ul>
      <div className={'ls-typed' + (typed > 0 ? ' on' : '') + (typed >= DONE_TEXT.length ? ' done' : '')} aria-live="polite">
        <span>{DONE_TEXT.slice(0, typed)}</span><i className="ls-cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
