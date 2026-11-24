import { useEffect, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { skills, skillStages } from '../data/skills.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import './Skills.css';

// Pastel dreamland: each skill is a floating "copy ability" bubble.
// short lettering (e.g. 'C++', 'SQL') is drawn as text and sized by length; emoji stay as-is
const isText = (icon) => /^[ -~↓◇]+$/.test(icon);
const iconClass = (base, icon) => base + (isText(icon) ? ' txt len' + Math.min(String(icon).length, 3) : '');

const starPath = 'M50 4 L62 36 L96 38 L69 59 L79 93 L50 73 L21 93 L31 59 L4 38 L38 36Z';

export default function Skills() {
  const { L, lang } = usePrefs();
  const [stage, setStage] = useState(skillStages[0].id);
  const [copied, setCopied] = useState(null);
  const list = skills.filter((s) => s.stage === stage);
  const ability = skills.find((s) => s.id === copied);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && copied) { e.stopPropagation(); setCopied(null); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [copied]);

  return (
    <main className="dream page-enter">
      <HomePill className="dream-pill" />
      <MusicChip track="quirky-dog" />
      <div className="sky-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ left: (i * 53) % 100 + '%', top: (i * 37) % 60 + '%', animationDelay: (i % 6) * 0.4 + 's' }}>✦</span>
        ))}
      </div>
      <div className="clouds" aria-hidden="true"><i /><i /><i /><i /></div>

      <header className="dream-head">
        <h1>Skills</h1>
        <nav className="stages">
          {skillStages.map((s, i) => (
            <button key={s.id} className={stage === s.id ? 'on' : ''} onClick={() => { setStage(s.id); sfx.select(); }}>
              <span className="stage-no">{i + 1}</span>{L(s.name)}
            </button>
          ))}
        </nav>
      </header>

      <section className="bubbles" key={stage}>
        {list.map((s, i) => (
          <button
            key={s.id}
            className="bubble-skill"
            style={{ '--c': s.color, animationDelay: i * 0.08 + 's', '--bob': (i % 3) * 0.6 + 's' }}
            onClick={() => { sfx.open(); setCopied(s.id); }}
            onMouseEnter={() => sfx.tick()}
          >
            <span className={iconClass('b-icon', s.icon)}>{s.icon}</span>
            <span className="b-name">{L(s.name)}</span>
            <span className="b-stars">{'★'.repeat(s.level)}<i>{'★'.repeat(5 - s.level)}</i></span>
          </button>
        ))}
      </section>

      {ability && (
        <div className="copy-get" onClick={() => { sfx.back(); setCopied(null); }} style={{ '--c': ability.color }}>
          <div className="burst" />
          <div className={'copy-card' + (ability.details?.length ? ' wide' : '')} onClick={(e) => e.stopPropagation()}>
            <svg className="copy-star" viewBox="0 0 100 100" aria-hidden="true"><path d={starPath} /></svg>
            <span className={iconClass('copy-icon', ability.icon)}>{ability.icon}</span>
            <p className="copy-label">{lang === 'ko' ? '능력 획득!' : 'ABILITY GET!'}</p>
            <h2>{L(ability.name)}</h2>
            <p className="copy-ability">{L(ability.ability)}</p>
            <div className="copy-level">{'★'.repeat(ability.level)}<i>{'★'.repeat(5 - ability.level)}</i></div>
            <div className="copy-used">{ability.usedIn.map((u) => <span key={u}>{u}</span>)}</div>
            {ability.details?.length > 0 && (
              <div className="copy-details">
                <h3>{lang === 'ko' ? '이렇게 써 봤어요' : 'What I have built with it'}</h3>
                <ul>{ability.details.map((d, i) => <li key={i}>{L(d)}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
