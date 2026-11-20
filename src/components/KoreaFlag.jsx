// Small Taegeukgi drawn as SVG (flag emoji don't render on Windows).
const BAR = (x, broken, key) =>
  broken
    ? [<rect key={key + 'a'} x={x} y={-3} width={1} height={2.6} />, <rect key={key + 'b'} x={x} y={0.4} width={1} height={2.6} />]
    : [<rect key={key} x={x} y={-3} width={1} height={6} />];

// three bars at distance d from the centre; pattern = which bars are broken (inner→outer)
function Trigram({ d, pattern }) {
  const sign = d < 0 ? -1 : 1;
  return pattern.flatMap((broken, i) => BAR(d + sign * i * 1.5 - 0.5, broken, `${d}-${i}`));
}

export default function KoreaFlag({ width = 30, title = '대한민국' }) {
  const ang = 33.69; // atan(2/3): the trigrams sit on the flag's diagonals
  return (
    <svg viewBox="0 0 36 24" width={width} height={(width * 2) / 3} role="img" aria-label={title} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <title>{title}</title>
      <rect width="36" height="24" rx="1.5" fill="#fff" />
      <g transform={`rotate(${ang} 18 12)`}>
        <path d="M12 12 A6 6 0 0 1 24 12 Z" fill="#cd2e3a" />
        <path d="M12 12 A6 6 0 0 0 24 12 Z" fill="#0047a0" />
        <circle cx="15" cy="12" r="3" fill="#cd2e3a" />
        <circle cx="21" cy="12" r="3" fill="#0047a0" />
      </g>
      <g fill="#000">
        {/* ☰ geon (top-left) and ☷ gon (bottom-right) on one diagonal */}
        <g transform={`translate(18 12) rotate(${ang})`}>
          <Trigram d={-9.5} pattern={[false, false, false]} />
          <Trigram d={9.5} pattern={[true, true, true]} />
        </g>
        {/* ☵ gam (top-right) and ☲ ri (bottom-left) on the other */}
        <g transform={`translate(18 12) rotate(${-ang})`}>
          <Trigram d={9.5} pattern={[true, false, true]} />
          <Trigram d={-9.5} pattern={[false, true, false]} />
        </g>
      </g>
      <rect width="36" height="24" rx="1.5" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth=".6" />
    </svg>
  );
}
