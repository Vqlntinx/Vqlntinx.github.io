import { useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { profile } from '../data/profile.js';
import { sfx } from '../lib/sound.js';
import Avatar from './Avatar.jsx';
import './Panels.css';

export function LinkIcon({ id, size = 26 }) {
  const p = {
    steam: <g><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="15.2" cy="9.2" r="2.9" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="15.2" cy="9.2" r="1.1" fill="currentColor" /><path d="M13 11.4 8.9 14.6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /><circle cx="8.3" cy="15.2" r="2.1" fill="currentColor" /></g>,
    instagram: <g fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" /></g>,
    notion: <g><path d="M5 4.5 15.5 3.7c1.3-.1 1.6 0 2.4.6l3.3 2.3c.5.4.7.5.7 1V20c0 .8-.3 1.3-1.3 1.4l-12.2.7c-.8 0-1.1-.1-1.5-.6l-2.4-3.1c-.4-.6-.6-1-.6-1.5V5.9c0-.7.3-1.3 1.1-1.4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8.5 8.8v8.8l1.6-.1v-5.9l4.4 6.3 1.6-.1V9l-1.6.1v5.5L10.2 8.6z" fill="currentColor" /></g>,
    email: <path d="M3 6h18v12H3z M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
    github: <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="currentColor" />,
    linkedin: <path d="M4 9h3.5v11H4zM5.7 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.4v1.6c.5-.9 1.7-1.9 3.5-1.9 3.6 0 4.3 2.4 4.3 5.5V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z" fill="currentColor" />,
    blog: <path d="M5 19l1-4L16 5l3 3L9 18zM14 7l3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
  };
  return <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">{p[id] ?? p.blog}</svg>;
}

// Copy text to the clipboard (with a fallback for browsers that block the Clipboard API)
export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall back below */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
}

export const emailOf = (links) => links.find((l) => l.id === 'email')?.href.replace('mailto:', '');

// [copied, copy]: copy(text) copies and flips `copied` on for a moment
export function useCopied(ms = 1600) {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    if (await copyText(text)) { setCopied(true); sfx.select(); setTimeout(() => setCopied(false), ms); }
  };
  return [copied, copy];
}

// "Friend card" style contact panel inside the console shell.
export default function Contact() {
  const { L } = usePrefs();
  const [copied, copy] = useCopied();
  const email = emailOf(profile.links);
  return (
    <section className="contact page-enter">
      <div className="friend-card">
        <div className="fc-avatar"><Avatar size={120} /></div>
        <div className="fc-body">
          <h2>{L(profile.name)}</h2>
          <p className="fc-code">{profile.friendCode}</p>
          <div className="fc-links">
            {profile.links.map((l) =>
              l.id === 'email' ? (
                // email: click copies the address instead of opening a mail app
                <button key={l.id} className={copied ? 'copied' : ''} onClick={() => copy(email)} onMouseEnter={() => sfx.tick()} title={email}>
                  <LinkIcon id={l.id} /><span>{copied ? L({ ko: '복사됨 ✓', en: 'Copied ✓' }) : l.label}</span>
                </button>
              ) : (
                <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sfx.tick()}>
                  <LinkIcon id={l.id} /><span>{l.label}</span>
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
