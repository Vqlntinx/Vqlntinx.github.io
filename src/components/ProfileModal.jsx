import { useMemo, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { profile, ageParts } from '../data/profile.js';
import { projects } from '../data/projects.js';
import { games } from '../data/games.js';
import { reads } from '../data/reads.js';
import Avatar from './Avatar.jsx';
import KoreaFlag from './KoreaFlag.jsx';
import { LinkIcon } from './Contact.jsx';
import './Panels.css';

const pickOther = (n, not) => {
  if (n <= 1) return 0;
  let i = Math.floor(Math.random() * (n - 1));
  if (i >= not) i += 1;
  return i;
};

// Console-style "user page": who I am, at a glance.
export default function ProfileModal({ onClose }) {
  const { L, lang } = usePrefs();
  const quotes = profile.quotes ?? [];
  const [q, setQ] = useState(() => Math.floor(Math.random() * Math.max(1, quotes.length)));
  const [spin, setSpin] = useState(0);
  const quote = quotes[q];

  // play time = age in years + months, recalculated from today's date
  const age = useMemo(() => ageParts(), []);
  const stats = [
    { v: lang === 'ko' ? `${age.years}년 ${age.months}개월` : `${age.years}y ${age.months}m`, k: L({ ko: '플레이 시간', en: 'Play time' }), wide: true },
    { v: projects.length, k: L({ ko: '프로젝트', en: 'Projects' }) },
    { v: games.length, k: L({ ko: '게임', en: 'Games' }) },
    { v: reads.length, k: L({ ko: '책', en: 'Books' }) },
  ];

  const reroll = () => { sfx.select(); setQ((i) => pickOther(quotes.length, i)); setSpin((s) => s + 1); };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="user-page" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Profile">
        <aside className="up-left">
          <div className="up-avatar"><Avatar size={160} /></div>
          <h2>{L(profile.name)}</h2>
          <p className="up-handle"><KoreaFlag width={30} /></p>
          <p className="up-code">{profile.friendCode}</p>
        </aside>
        <div className="up-right">
          <p className="up-role">{L(profile.role)}</p>
          {quote && (
            <div className="up-quote">
              <blockquote key={q}>
                <p>“{L(quote.text)}”</p>
                <cite>— {L(quote.by)}</cite>
              </blockquote>
              {quotes.length > 1 && (
                <button className="up-reroll" onClick={reroll} aria-label={lang === 'ko' ? '다른 글귀' : 'Another quote'} title={lang === 'ko' ? '다른 글귀' : 'Reroll'}>
                  <svg key={spin} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M20 11a8 8 0 1 0-2.3 5.7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                    <path d="M20 4v7h-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          )}
          <div className="up-stats">
            {stats.map((s) => (
              <div key={s.k} className={s.wide ? 'wide' : ''}><b>{s.v}</b><span>{s.k}</span></div>
            ))}
          </div>
          <div className="up-links">
            {profile.links.map((l) => (
              <a key={l.id} href={l.href} target="_blank" rel="noreferrer" aria-label={l.label} title={l.label}>
                <LinkIcon id={l.id} />
              </a>
            ))}
          </div>
        </div>
        <button className="up-close" onClick={onClose}><span className="btn-glyph">B</span></button>
      </div>
    </div>
  );
}
