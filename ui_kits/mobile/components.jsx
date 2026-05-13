// Phantom Mobile — shared atoms
const GhostMark = ({ color = '#6E3CFF', eyes = '#0A0A0A', size = 32, style }) => (
  <svg viewBox="0 0 200 200" fill="none" style={{ width: size, height: size, color, flexShrink: 0, ...style }}>
    <path d="M 20 100 A 80 80 0 0 1 180 100 L 180 160 Q 160 182 140 160 Q 120 182 100 160 Q 80 182 60 160 Q 40 182 20 160 Z" fill="currentColor" />
    <ellipse cx="78" cy="92" rx="10" ry="15" fill={eyes} />
    <ellipse cx="122" cy="92" rx="10" ry="15" fill={eyes} />
  </svg>
);

const Tag = ({ color = 'violet', children }) => {
  const palettes = {
    violet: { bg: '#F2EDFF', fg: '#5A26EB' },
    red: { bg: '#FFE2DA', fg: '#DE2C0F' },
    orange: { bg: '#FFEBD2', fg: '#DB6A00' },
    yellow: { bg: '#FFF3B0', fg: '#8A6F00' },
    green: { bg: '#CFF5E0', fg: '#00A050' },
    blue: { bg: '#D6E4FF', fg: '#0049CC' },
    pink: { bg: '#FFD4E5', fg: '#D6126A' },
    ghost: { bg: 'rgba(10,10,10,0.06)', fg: '#0A0A0A' },
  };
  const p = palettes[color] || palettes.violet;
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10, fontWeight: 500,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 9999,
      background: p.bg, color: p.fg,
      display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 4, height: 4, borderRadius: 9999, background: 'currentColor' }} />
      {children}
    </span>
  );
};

const Card = ({ children, style }) => (
  <div style={{
    background: '#fff',
    borderRadius: 18,
    padding: 16,
    border: '1px solid rgba(10,10,10,0.05)',
    boxShadow: '0 1px 0 0 rgba(10,10,10,0.03)',
    ...style,
  }}>{children}</div>
);

Object.assign(window, { GhostMark, Tag, Card });
