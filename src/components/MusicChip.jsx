import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePrefs } from '../lib/i18n.jsx';
import { TRACKS, bgmPlay, bgmStop, setMasterVolume } from '../lib/bgm.js';
import './MusicChip.css';

/*
  The ♪ chip in the bottom-right of a page:
  - plays that page's track (crossfading from the previous page's)
  - click = mute / unmute ALL music (shared setting)
  - hover / focus = the track's CC credit + a volume slider (shared setting)
*/
export default function MusicChip({ track, active = true, className = '' }) {
  const { bgm, setBgm, bgmVolume, setBgmVolume, lang } = usePrefs();
  const info = TRACKS[track];

  useEffect(() => { setMasterVolume(bgmVolume / 100); }, [bgmVolume]);
  useEffect(() => {
    if (bgm && active) bgmPlay(track);
    else bgmStop(active ? 600 : 1400);
  }, [bgm, active, track]);
  // leaving the page: fade out (unless the next page already took over)
  useEffect(() => () => bgmStop(900, track), [track]);

  // rendered onto <body> so page-entrance animations (transforms) never move it
  return createPortal(
    <div className={'music' + (bgm ? ' playing' : '') + (active ? '' : ' hidden') + ' ' + className}>
      <button
        className="sys-chip icon music-chip"
        onClick={() => setBgm(!bgm)}
        aria-pressed={bgm}
        aria-label={bgm ? 'Music off' : 'Music on'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
          <circle cx="17.5" cy="16" r="2.5" fill="currentColor" />
          {!bgm && <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />}
        </svg>
      </button>

      <div className="music-card" role="group" aria-label="Music">
        <div className="music-credit">
          <b>“{info.title}”</b> Kevin MacLeod (<a href="https://incompetech.com" target="_blank" rel="noreferrer">incompetech.com</a>)
          <br />
          Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">Creative Commons: By Attribution 4.0 License</a>
        </div>
        <label className="music-volume">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" /></svg>
          <input
            type="range" min="0" max="100" step="1"
            value={bgmVolume}
            onChange={(e) => setBgmVolume(Number(e.target.value))}
            style={{ '--v': bgmVolume + '%' }}
            aria-label={lang === 'ko' ? '배경음악 볼륨' : 'Music volume'}
          />
          <span className="music-vol-num">{bgmVolume}</span>
        </label>
      </div>
    </div>,
    document.body
  );
}
