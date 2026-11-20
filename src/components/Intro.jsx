import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import SysToggles from './SysToggles.jsx';
import DeskToys from './DeskToys.jsx';
import MusicChip from './MusicChip.jsx';
import './Intro.css';

let lampMemory = true; // lamp state survives leaving and coming back to the room

/*
  The room is a looping video (public/intro-room.mp4, 1660×1244). The still image
  (public/intro-room.webp, same framing) is its poster, so something shows instantly.

  The console is traced as an SVG path in the video's own pixel space (viewBox
  1660×1244). That path is both the neon outline and the hover/click area, so the
  highlight hugs the console instead of drawing a box around it. The console
  doesn't move during the clip, so a fixed outline stays aligned.
*/
const CONSOLE_PATH =
  'M466 600 L950 596 Q988 596 988 636 L988 800 Q988 830 954 831 L462 860 Q420 860 420 824 L420 648 Q420 600 466 600 Z';

export default function Intro({ onLinkStart, zooming = false }) {
  const { L } = usePrefs();
  const [hover, setHover] = useState(false);
  const [hint, setHint] = useState(false);
  const [lampOn, setLampOnState] = useState(lampMemory);
  const setLampOn = (v) => { lampMemory = v; setLampOnState(v); };
  const video = useRef(null);


  useEffect(() => { const t = setTimeout(() => setHint(true), 3500); return () => clearTimeout(t); }, []);

  // React doesn't always reflect `muted` before autoplay kicks in, so start it explicitly.
  // (The room's motion is gentle ambient movement, so it plays even with reduced-motion on.)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => { /* autoplay blocked: the poster still frame stays visible */ });
  }, []);

  // Zoom: scale the whole room so the console's SCREEN exactly covers the window,
  // centred, while the screen fades to white. The Link Start overlay then starts
  // from that same white, so nothing of the room peeks out at the edges.
  const screen = useRef(null);
  const [zoomStyle, setZoomStyle] = useState(null);
  useLayoutEffect(() => {
    if (!zooming || !screen.current) return;
    const r = screen.current.getBoundingClientRect();
    const vw = window.innerWidth, vh = window.innerHeight;
    const s = Math.max(vw / r.width, vh / r.height) * 1.08;
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const tx = vw / 2 - cx * s, ty = vh / 2 - cy * s; // transform-origin = viewport (0,0)
    setZoomStyle({ transform: `translate(${tx}px, ${ty}px) scale(${s})` });
  }, [zooming]);

  const enter = () => {
    if (zooming) return;
    sfx.open();
    onLinkStart();
  };
  const on = () => { if (!hover) sfx.tick(); setHover(true); };
  const off = () => setHover(false);

  return (
    <main className={'intro' + (zooming ? ' zooming' : '') + (hover ? ' hovering' : '')}>
      <div className="zoom-layer" style={zoomStyle ?? undefined}>
        <div className="stage">
          <video
            ref={video}
            className="room"
            src="./intro-room.mp4"
            poster="./intro-room.webp"
            autoPlay muted loop playsInline preload="auto"
            aria-hidden="true"
          />

          <DeskToys lampOn={lampOn} setLampOn={setLampOn} />

          <div className="screen-glow" ref={screen} />

          <svg className="console-svg" viewBox="0 0 1660 1244" preserveAspectRatio="none">
            <defs>
              <linearGradient id="neon-grad" gradientUnits="userSpaceOnUse" x1="420" y1="600" x2="988" y2="860">
                <stop offset="0" stopColor="#2fd8ff" />
                <stop offset=".5" stopColor="#ff3df2" />
                <stop offset="1" stopColor="#fff36b" />
                <animateTransform attributeName="gradientTransform" type="rotate" from="0 704 730" to="360 704 730" dur="3s" repeatCount="indefinite" />
              </linearGradient>
              <filter id="neon-blur" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="9" />
              </filter>
            </defs>
            <g className="neon">
              <path d={CONSOLE_PATH} className="neon-glow" stroke="url(#neon-grad)" filter="url(#neon-blur)" />
              <path d={CONSOLE_PATH} className="neon-line" stroke="url(#neon-grad)" />
              <path d={CONSOLE_PATH} className="neon-run" />
            </g>
            {/* the console shape itself is the hover / click target */}
            <path
              d={CONSOLE_PATH}
              className="console-hit"
              onMouseEnter={on}
              onMouseLeave={off}
              onClick={enter}
            />
          </svg>

          <div className="press" aria-hidden="true">
            <span className="btn-glyph">A</span> LINK START
          </div>

          {/* keyboard / screen-reader access to the same action */}
          <button className="console-key" onFocus={on} onBlur={off} onClick={enter} aria-label="Link Start" />
        </div>
      </div>

      <div className="intro-vignette" />
      <SysToggles className="intro-toggles" />

      {/* ♪ room music (Morning) + credit + shared mute/volume; fades out while diving in */}
      <MusicChip track="morning" active={!zooming} />
      <p className={'intro-hint' + (hint && !hover && !zooming ? ' show' : '')}>
        {L({ ko: '게임기를 눌러 접속하세요', en: 'Tap the console to log in' })}
      </p>
    </main>
  );
}
