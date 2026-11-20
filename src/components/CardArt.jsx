// Original parody "box art" for each home card. Pure SVG: no copyrighted assets.
// Each piece borrows a genre mood (brawler, open-world adventure, creature dex,
// cozy village library, pastel dreamland) but uses its own shapes and titles.

const star = (cx, cy, R, r = R * 0.45, n = 5, rot = -Math.PI / 2) => {
  let d = '';
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? r : R;
    const a = rot + (i * Math.PI) / n;
    d += (i ? 'L' : 'M') + (cx + Math.cos(a) * rad).toFixed(1) + ' ' + (cy + Math.sin(a) * rad).toFixed(1);
  }
  return d + 'Z';
};

const outline = { paintOrder: 'stroke', strokeLinejoin: 'round' };

// same little original player as the Projects page, mid-jump
const HERO_MINI = [
  '...CCCC...',
  '..CCCCCC..',
  '..HHSSSH..',
  '.HSSSSSSH.',
  '.HSESSESS.',
  '..SSSSSS..',
  'S..OOOO..S',
  'SOOOOOOOOS',
  '..OOOOOO..',
  '..PPPPPP..',
  '.PP....PP.',
  'KK......KK',
];
const HERO_PAL = { C: '#2fd8ff', H: '#3b2a24', S: '#ffd2a6', E: '#1b1b1b', O: '#ff7a3d', P: '#2f3a8f', K: '#5a3417' };

export function ProjectsArt() {
  // Platformer world box art: sky, brick ground, "?" blocks, pipe, coins, flag.
  const letters = 'PROJECT'.split('');
  const colors = ['#ff4b4b', '#ffd23b', '#2fd8ff', '#4cd964', '#ff7a3d', '#b07cff', '#ff5cc8'];
  const brickRows = [0, 1, 2];
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" shapeRendering="crispEdges">
      <rect width="400" height="400" fill="#5c94fc" />
      {/* clouds */}
      <g fill="#fff">
        <rect x="24" y="148" width="70" height="20" rx="10" /><rect x="40" y="136" width="34" height="22" rx="11" />
        <rect x="300" y="132" width="80" height="22" rx="11" /><rect x="320" y="118" width="38" height="24" rx="12" />
      </g>
      {/* hills */}
      <path d="M-10 340 Q 60 240 140 340 Z" fill="#00a800" stroke="#005800" strokeWidth="4" shapeRendering="auto" />
      <path d="M240 340 Q 300 280 360 340 Z" fill="#4cc84c" stroke="#005800" strokeWidth="4" shapeRendering="auto" />
      {/* pipe */}
      <rect x="318" y="282" width="52" height="60" fill="#00a800" stroke="#002800" strokeWidth="3" />
      <rect x="310" y="268" width="68" height="20" fill="#00a800" stroke="#002800" strokeWidth="3" />
      <rect x="326" y="288" width="8" height="52" fill="#5ce65c" /><rect x="318" y="272" width="8" height="12" fill="#5ce65c" />
      {/* blocks row */}
      {[0, 1, 2, 3].map((i) => {
        const x = 108 + i * 44;
        const q = i === 1 || i === 3;
        return (
          <g key={i}>
            <rect x={x} y="214" width="40" height="40" fill={q ? '#f8b800' : '#c84c0c'} stroke="#000" strokeWidth="3" />
            {q ? (
              <>
                <rect x={x + 3} y="217" width="34" height="4" fill="#ffe08a" />
                <text x={x + 20} y="245" textAnchor="middle" fontFamily="'Press Start 2P', monospace" fontSize="20" fill="#fff" stroke="#c86c00" strokeWidth="1">?</text>
              </>
            ) : (
              <path d={`M${x} 234 H${x + 40} M${x + 20} 214 V234 M${x + 10} 234 V254 M${x + 30} 234 V254`} stroke="#7a2a00" strokeWidth="3" />
            )}
          </g>
        );
      })}
      {/* coin popping out */}
      <ellipse cx="172" cy="186" rx="10" ry="14" fill="#ffd23b" stroke="#000" strokeWidth="3" />
      <rect x="169" y="178" width="5" height="16" fill="#fff4b0" />
      {/* tiny pixel player jumping */}
      <g transform="translate(76 252) scale(5)">
        {HERO_MINI.flatMap((row, y) => row.split('').map((c, x) => (c === '.' ? null : <rect key={x + '-' + y} x={x} y={y} width="1" height="1" fill={HERO_PAL[c]} />)))}
      </g>
      {/* brick ground */}
      <rect y="340" width="400" height="60" fill="#c84c0c" />
      {brickRows.map((r) => (
        <g key={r} stroke="#7a2a00" strokeWidth="3">
          <line x1="0" x2="400" y1={340 + r * 20} y2={340 + r * 20} />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={i * 40 + (r % 2 ? 20 : 0)} x2={i * 40 + (r % 2 ? 20 : 0)} y1={340 + r * 20} y2={360 + r * 20} />
          ))}
        </g>
      ))}
      <rect y="340" width="400" height="4" fill="#ffb070" />
      {/* title */}
      <g fontFamily="'Black Han Sans', Impact, sans-serif" textAnchor="middle" shapeRendering="auto">
        <text x="200" y="52" fontSize="30" fill="#fff" stroke="#000" strokeWidth="7" style={outline} letterSpacing="6">SUPER</text>
        {letters.map((ch, i) => (
          <text key={i} x={92 + i * 36} y={108 + (i % 2 ? 4 : -2)} fontSize="54" fill={colors[i]} stroke="#000" strokeWidth="9" style={outline}>{ch}</text>
        ))}
      </g>
    </svg>
  );
}

export function ExperienceArt() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ea-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f9fc7" /><stop offset=".55" stopColor="#bfe7ef" /><stop offset="1" stopColor="#f6efd5" />
        </linearGradient>
        <radialGradient id="ea-sun" cx="68%" cy="30%" r="35%">
          <stop offset="0" stopColor="#fffbe6" /><stop offset="1" stopColor="#fffbe6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ea-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3c4" /><stop offset="1" stopColor="#c99a2e" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#ea-sky)" />
      <rect width="400" height="400" fill="url(#ea-sun)" />
      {/* clouds */}
      <g fill="#fff" opacity=".9">
        <ellipse cx="70" cy="90" rx="60" ry="14" /><ellipse cx="100" cy="80" rx="36" ry="16" />
        <ellipse cx="330" cy="140" rx="70" ry="12" /><ellipse cx="300" cy="132" rx="30" ry="12" />
      </g>
      {/* distant mountains */}
      <path d="M0 270 L60 210 L110 245 L170 180 L230 240 L290 200 L350 235 L400 215 V400 H0Z" fill="#7fb3c4" opacity=".7" />
      <path d="M0 300 L80 255 L150 285 L220 250 L300 290 L400 260 V400 H0Z" fill="#5f9a8a" />
      {/* floating island with ruins */}
      <g>
        <path d="M232 128 H352 L336 146 L318 178 L296 198 L276 176 L254 150 Z" fill="#6b5a4c" />
        <path d="M228 122 H356 V132 H228 Z" fill="#78b85c" />
        <g fill="#e9e1cf">
          <rect x="252" y="88" width="9" height="34" /><rect x="284" y="80" width="9" height="42" /><rect x="316" y="92" width="9" height="30" />
          <rect x="246" y="82" width="54" height="7" />
        </g>
        <path d="M300 198 L296 230" stroke="#b9e8ff" strokeWidth="3" opacity=".8" />
      </g>
      {/* foreground cliff + hero */}
      <path d="M0 330 L120 300 L170 306 L200 340 L210 400 H0Z" fill="#2f4a3a" />
      <path d="M0 340 L110 312 L150 316 L172 340 V400 H0Z" fill="#3e6b4a" />
      <g transform="translate(118 248)">
        <path d="M14 18 C 30 18 46 22 70 8 C 58 30 40 42 18 44 Z" fill="#d6452f" />
        <circle cx="10" cy="8" r="7" fill="#2a2420" />
        <path d="M4 14 H18 L20 46 H2 Z" fill="#2a2420" />
        <path d="M5 46 L2 64 H8 L11 48 M13 48 L16 64 H22 L18 46" fill="#2a2420" />
        <path d="M-4 20 L-2 66" stroke="#2a2420" strokeWidth="3" />
      </g>
      <g stroke="#2a3a40" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M60 150 l6 4 l6 -4" /><path d="M84 166 l5 3 l5 -3" /><path d="M200 120 l5 3 l5 -3" />
      </g>
      {/* title */}
      <rect x="0" y="322" width="400" height="78" fill="#0d1a1c" opacity=".55" />
      <g fontFamily="Cinzel, serif" textAnchor="middle">
        <text x="200" y="342" fontSize="11" letterSpacing="5" fill="#fff8e1">THE CHRONICLE OF</text>
        <text x="200" y="374" fontSize="30" fontWeight="700" fill="url(#ea-gold)" textLength="290" lengthAdjust="spacingAndGlyphs">EXPERIENCE</text>
        <text x="200" y="392" fontSize="9" letterSpacing="4" fill="#fff8e1">TEARS OF THE DEADLINE</text>
      </g>
    </svg>
  );
}

export function GamesArt() {
  // a little original pixel creature: 10×9 grid
  const sprite = [
    '..X....X..',
    '.XX....XX.',
    '.XXXXXXXX.',
    'XXOXXXXOXX',
    'XXXXXXXXXX',
    'XXXXRRXXXX',
    '.XXXXXXXX.',
    '..XX..XX..',
    '..X....X..',
  ];
  const cells = [];
  sprite.forEach((row, y) => row.split('').forEach((c, x) => {
    if (c !== '.') cells.push(<rect key={x + '-' + y} x={150 + x * 10} y={208 + y * 10} width="10" height="10" fill={c === 'O' ? '#fff' : c === 'R' ? '#e3242b' : '#1f3b2c'} />);
  }));
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="400" fill="#c81e2a" />
      <path d="M0 0 H400 V120 H250 L220 150 H0Z" fill="#e3242b" />
      <path d="M0 150 H220 L250 120 H400" stroke="#7a0d14" strokeWidth="5" fill="none" />
      <circle cx="62" cy="62" r="40" fill="#fff" />
      <circle cx="62" cy="62" r="32" fill="#2aa7ff" />
      <circle cx="52" cy="50" r="10" fill="#bfe7ff" />
      <circle cx="124" cy="34" r="10" fill="#ff4b4b" stroke="#7a0d14" strokeWidth="3" />
      <circle cx="152" cy="34" r="10" fill="#ffd23b" stroke="#7a0d14" strokeWidth="3" />
      <circle cx="180" cy="34" r="10" fill="#4cd964" stroke="#7a0d14" strokeWidth="3" />
      <text x="370" y="74" textAnchor="end" fontFamily="Black Han Sans, sans-serif" fontSize="42" fill="#fff" stroke="#7a0d14" strokeWidth="6" style={outline}>GAME·DEX</text>
      {/* screen */}
      <rect x="60" y="176" width="280" height="190" rx="14" fill="#e8e8e8" />
      <rect x="80" y="192" width="240" height="140" rx="6" fill="#9fd4a8" />
      <g opacity=".25" stroke="#1f3b2c">{Array.from({ length: 13 }, (_, i) => <line key={i} x1="80" x2="320" y1={198 + i * 10.5} y2={198 + i * 10.5} />)}</g>
      {cells}
      <text x="96" y="214" fontFamily="'Press Start 2P', monospace" fontSize="10" fill="#1f3b2c">No.001</text>
      <circle cx="100" cy="350" r="7" fill="#c81e2a" />
      <g fill="#555"><rect x="270" y="343" width="40" height="4" rx="2" /><rect x="270" y="351" width="40" height="4" rx="2" /></g>
    </svg>
  );
}

export function ReadsArt() {
  const books = [
    ['#e8826b', 92], ['#6fa8dc', 108], ['#93c47d', 84], ['#f6c26b', 100], ['#b4a7d6', 96],
    ['#76a5af', 110], ['#e06666', 88], ['#ffd966', 98],
  ];
  let x = 68;
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="ra-leaf" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M14 30 C14 18 24 12 32 12 C32 22 26 30 14 30Z" fill="#f0dfb6" />
          <path d="M14 30 L28 16" stroke="#e6cf9c" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="#fdf3dc" />
      <rect width="400" height="400" fill="url(#ra-leaf)" />
      {/* window with sky */}
      <rect x="260" y="38" width="100" height="90" rx="40" fill="#bfe6ff" stroke="#b7865a" strokeWidth="8" />
      <path d="M310 42 V124 M264 84 H356" stroke="#b7865a" strokeWidth="5" />
      {/* shelf */}
      <rect x="50" y="160" width="300" height="160" rx="14" fill="#a8774d" />
      <rect x="62" y="172" width="276" height="136" rx="8" fill="#7b5233" />
      {books.map(([c, h], i) => {
        const w = 26 + (i % 3) * 4;
        const el = (
          <g key={i}>
            <rect x={x} y={300 - h} width={w} height={h} rx="4" fill={c} />
            <rect x={x + 4} y={300 - h + 14} width={w - 8} height="6" rx="2" fill="#fff" opacity=".6" />
          </g>
        );
        x += w + 4;
        return el;
      })}
      <rect x="50" y="300" width="300" height="14" rx="4" fill="#c99566" />
      {/* plant */}
      <path d="M86 160 C70 130 74 112 92 104 C96 124 98 140 86 160Z" fill="#7fb04a" />
      <path d="M96 160 C104 130 120 120 134 124 C126 142 112 154 96 160Z" fill="#93c45a" />
      <rect x="78" y="148" width="28" height="16" rx="5" fill="#e8826b" />
      {/* title badge */}
      <rect x="64" y="40" width="186" height="96" rx="48" fill="#fff" stroke="#e9d7ad" strokeWidth="4" />
      <path d="M90 88 C90 70 104 60 118 60 C118 76 108 88 90 88Z" fill="#6fbf5a" />
      <text x="166" y="86" textAnchor="middle" fontFamily="Fredoka, Jua, sans-serif" fontWeight="700" fontSize="30" fill="#6b4a2b">Book</text>
      <text x="166" y="116" textAnchor="middle" fontFamily="Fredoka, Jua, sans-serif" fontWeight="600" fontSize="20" fill="#3fa36b">Crossing</text>
      <rect x="120" y="340" width="160" height="34" rx="17" fill="#3fa36b" />
      <text x="200" y="363" textAnchor="middle" fontFamily="Fredoka, Jua, sans-serif" fontWeight="600" fontSize="16" fill="#fff">New Pages</text>
    </svg>
  );
}

export function SkillsArt() {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sa-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc3e1" /><stop offset=".6" stopColor="#ffe3f1" /><stop offset="1" stopColor="#c6e8ff" />
        </linearGradient>
        <radialGradient id="sa-star" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fffbd0" /><stop offset="1" stopColor="#ffc93b" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="url(#sa-sky)" />
      {/* rainbow */}
      {['#ff9fb8', '#ffd08a', '#fff2a0', '#b8f0b0', '#a8dcff', '#d0b8ff'].map((c, i) => (
        <path key={c} d={`M${20 + i * 10} 300 A ${180 - i * 10} ${180 - i * 10} 0 0 1 ${380 - i * 10} 300`} stroke={c} strokeWidth="10" fill="none" opacity=".75" />
      ))}
      {/* twinkles */}
      {[[50, 60, 10], [340, 50, 12], [300, 120, 7], [80, 170, 8], [180, 40, 6]].map(([x, y, r], i) => (
        <path key={i} d={star(x, y, r, r * 0.4, 4)} fill="#fff" />
      ))}
      {/* the big friendly star */}
      <g transform="rotate(-12 200 200)">
        <path d={star(200, 196, 96, 46)} fill="url(#sa-star)" stroke="#f29f1d" strokeWidth="6" strokeLinejoin="round" />
        <ellipse cx="186" cy="196" rx="6" ry="12" fill="#3a2a5a" />
        <ellipse cx="214" cy="196" rx="6" ry="12" fill="#3a2a5a" />
        <ellipse cx="174" cy="214" rx="9" ry="5" fill="#ff8fb8" opacity=".7" />
        <ellipse cx="226" cy="214" rx="9" ry="5" fill="#ff8fb8" opacity=".7" />
        <path d="M193 216 Q200 224 207 216" stroke="#3a2a5a" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* clouds */}
      <g fill="#fff">
        <circle cx="40" cy="330" r="40" /><circle cx="100" cy="320" r="46" /><circle cx="160" cy="340" r="38" />
        <circle cx="250" cy="340" r="40" /><circle cx="310" cy="318" r="48" /><circle cx="372" cy="334" r="40" />
        <rect x="0" y="340" width="400" height="60" />
      </g>
      <text x="200" y="370" textAnchor="middle" fontFamily="Fredoka, Jua, sans-serif" fontWeight="700" fontSize="40" fill="#ff5fa8" stroke="#fff" strokeWidth="8" style={outline}>Skills</text>
      <text x="200" y="392" textAnchor="middle" fontFamily="Fredoka, Jua, sans-serif" fontWeight="600" fontSize="14" letterSpacing="3" fill="#8a6bd1">DREAM LAND</text>
    </svg>
  );
}

export const ART = { projects: ProjectsArt, experience: ExperienceArt, games: GamesArt, reads: ReadsArt, skills: SkillsArt };
