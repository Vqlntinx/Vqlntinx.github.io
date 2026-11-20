import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import './DeskToys.css';

/*
  Things to play with on the desk in the intro room. The room is a video, so the
  lamp works through a lighting overlay. Hotspot boxes are % of the video frame.
*/
export default function DeskToys({ lampOn, setLampOn }) {
  const { lang } = usePrefs();
  const ko = lang === 'ko';

  const toggleLamp = () => {
    sfx.lampClick();
    setLampOn(!lampOn);
  };

  return (
    <div className="desk-toys">
      {/* lighting overlay when the lamp is off */}
      <div className={'lamp-dim' + (lampOn ? '' : ' on')} aria-hidden="true" />

      <button className="toy lamp" onClick={toggleLamp} aria-label={ko ? '스탠드 켜고 끄기' : 'Toggle lamp'} aria-pressed={lampOn}>
        <span className="toy-tip">{lampOn ? (ko ? '불 끄기' : 'Lights off') : (ko ? '불 켜기' : 'Lights on')}</span>
      </button>
    </div>
  );
}
