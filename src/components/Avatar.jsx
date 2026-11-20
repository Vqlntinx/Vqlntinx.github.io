import { profile } from '../data/profile.js';

// Uses profile.avatar if set; otherwise draws a friendly default player icon.
export default function Avatar({ size = 64 }) {
  if (profile.avatar) {
    return <img src={profile.avatar} alt="" width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }} />;
  }
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="av-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fd8ff" /><stop offset="1" stopColor="#7b5cff" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#av-bg)" />
      <circle cx="32" cy="36" r="17" fill="#ffe0c2" />
      <path d="M14 32 C14 16 50 12 50 32 C46 24 22 22 14 32Z" fill="#3b2a24" />
      <circle cx="26" cy="37" r="2.4" fill="#2b2020" />
      <circle cx="38" cy="37" r="2.4" fill="#2b2020" />
      <path d="M27 44 Q32 48 37 44" stroke="#2b2020" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M12 34 A20 20 0 0 1 52 34" stroke="#fff" strokeWidth="3.5" fill="none" />
      <rect x="8" y="32" width="8" height="12" rx="3" fill="#ff3df2" />
      <rect x="48" y="32" width="8" height="12" rx="3" fill="#ff3df2" />
    </svg>
  );
}
