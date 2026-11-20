import { usePrefs } from '../lib/i18n.jsx';
import { sfx, setSoundEnabled } from '../lib/sound.js';

// Language + sound toggles, shared by the intro and the home shell
export default function SysToggles({ className = '' }) {
  const { lang, setLang, sound, setSound } = usePrefs();
  return (
    <div className={'sys-toggles ' + className}>
      <button
        className="sys-chip"
        onClick={() => { setLang(lang === 'ko' ? 'en' : 'ko'); sfx.tick(); }}
        aria-label="Language"
      >
        <span className={lang === 'ko' ? 'on' : ''}>KO</span>
        <span className="sep">/</span>
        <span className={lang === 'en' ? 'on' : ''}>EN</span>
      </button>
      <button
        className="sys-chip icon"
        onClick={() => { const next = !sound; setSound(next); setSoundEnabled(next); if (next) sfx.select(); }}
        aria-label={sound ? 'Mute' : 'Sound on'}
        title={sound ? 'Sound on' : 'Muted'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {sound ? (
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </div>
  );
}
