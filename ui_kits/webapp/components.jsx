// Phantom Web App — shared atoms

const GhostMark = ({ color = '#6E3CFF', eyes = '#0A0A0A', size = 32, style }) => (
  <svg viewBox="0 0 200 200" fill="none" style={{ width: size, height: size, color, ...style }}>
    <path d="M 20 100 A 80 80 0 0 1 180 100 L 180 160 Q 160 182 140 160 Q 120 182 100 160 Q 80 182 60 160 Q 40 182 20 160 Z" fill="currentColor" />
    <ellipse cx="78" cy="92" rx="10" ry="15" fill={eyes} />
    <ellipse cx="122" cy="92" rx="10" ry="15" fill={eyes} />
  </svg>
);

const Logo = ({ size = 28 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
    <GhostMark color="#6E3CFF" size={size} />
    <span style={{
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 700,
      fontSize: size * 0.78,
      letterSpacing: '-0.8px',
      color: '#0A0A0A',
      lineHeight: 1,
      textTransform: 'none',
    }}>phantom</span>
  </div>
);

const Tag = ({ color = 'violet', children, size = 'md' }) => {
  const palettes = {
    violet: { bg: '#F2EDFF', fg: '#5A26EB' },
    red: { bg: '#FFE2DA', fg: '#DE2C0F' },
    orange: { bg: '#FFEBD2', fg: '#DB6A00' },
    yellow: { bg: '#FFF3B0', fg: '#8A6F00' },
    green: { bg: '#CFF5E0', fg: '#00A050' },
    blue: { bg: '#D6E4FF', fg: '#0049CC' },
    pink: { bg: '#FFD4E5', fg: '#D6126A' },
    dark: { bg: '#0A0A0A', fg: '#fff' },
    ghost: { bg: 'rgba(10,10,10,0.06)', fg: '#0A0A0A' },
  };
  const p = palettes[color] || palettes.violet;
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: size === 'sm' ? 10 : 11,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: size === 'sm' ? '3px 7px' : '4px 9px',
      borderRadius: 9999,
      background: p.bg,
      color: p.fg,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 9999, background: 'currentColor' }} />
      {children}
    </span>
  );
};

const StatusDot = ({ status = 'running' }) => {
  const map = {
    running: '#00D26A',
    sleeping: '#9B9B9B',
    error: '#FF4D2E',
    waiting: '#FFD400',
  };
  return (
    <span style={{
      width: 8, height: 8, borderRadius: 9999, background: map[status],
      boxShadow: status === 'running' ? `0 0 0 3px ${map[status]}33` : 'none',
      display: 'inline-block',
      animation: status === 'running' ? 'pulse 2s ease-in-out infinite' : 'none',
    }} />
  );
};

const Button = ({ variant = 'primary', size = 'md', children, onClick, style, icon }) => {
  const palettes = {
    primary: { bg: '#6E3CFF', fg: '#fff', border: 'transparent' },
    dark: { bg: '#0A0A0A', fg: '#fff', border: 'transparent' },
    ghost: { bg: 'transparent', fg: '#0A0A0A', border: 'rgba(10,10,10,0.12)' },
    subtle: { bg: 'rgba(10,10,10,0.04)', fg: '#0A0A0A', border: 'transparent' },
    yellow: { bg: '#FFD400', fg: '#0A0A0A', border: 'transparent' },
  };
  const p = palettes[variant];
  const padding = size === 'sm' ? '7px 13px' : size === 'lg' ? '13px 22px' : '9px 16px';
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;
  return (
    <button onClick={onClick} style={{
      fontFamily: 'Geist, sans-serif',
      fontWeight: 500,
      fontSize,
      cursor: 'pointer',
      padding,
      borderRadius: 9999,
      background: p.bg,
      color: p.fg,
      border: p.border === 'transparent' ? 'none' : `1px solid ${p.border}`,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap',
      transition: 'all 0.18s cubic-bezier(.2,.8,.2,1)',
      ...style,
    }}>{children}{icon}</button>
  );
};

const Card = ({ children, style, padding = 20 }) => (
  <div style={{
    background: '#fff',
    borderRadius: 14,
    padding,
    border: '1px solid rgba(10,10,10,0.06)',
    boxShadow: '0 1px 0 0 rgba(10,10,10,0.03)',
    ...style,
  }}>{children}</div>
);

const Icon = ({ name, size = 18, color = 'currentColor', stroke = 1.6 }) => {
  // Minimal inline Lucide-style icons we need across the app.
  const paths = {
    search: 'M21 21l-4.3-4.3 M11 19a8 8 0 110-16 8 8 0 010 16z',
    bell: 'M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9 M10 21a2 2 0 004 0',
    settings: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H2a2 2 0 110-4h.09A1.65 1.65 0 003.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H8a1.65 1.65 0 001-1.51V2a2 2 0 114 0v.09c.7.13 1.13.65 1.51 1.51a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V8a1.65 1.65 0 001.51 1H22a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z',
    plus: 'M12 5v14 M5 12h14',
    chart: 'M3 3v18h18 M7 14l4-4 4 4 6-6',
    chat: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z',
    star: 'M12 2l3 7 7 .8-5 5 1 7-6-3-6 3 1-7-5-5 7-.8z',
    image: 'M3 3h18v18H3z M3 16l5-5 4 4 3-3 6 6 M16 9a2 2 0 100-4 2 2 0 000 4z',
    globe: 'M12 22a10 10 0 100-20 10 10 0 000 20z M2 12h20 M12 2c2 3 3 7 3 10s-1 7-3 10c-2-3-3-7-3-10s1-7 3-10z',
    sparkles: 'M12 3v4 M12 17v4 M5 12H1 M23 12h-4 M6 6l3 3 M15 15l3 3 M6 18l3-3 M15 9l3-3',
    arrow: 'M5 12h14 M13 5l7 7-7 7',
    play: 'M5 3l14 9-14 9V3z',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
    inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z',
    folder: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z',
    money: 'M12 1v22 M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
    paperclip: 'M21.44 11.05l-9.19 9.19a6 6 0 11-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 11-2.83-2.83l8.49-8.48',
    mic: 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v2a7 7 0 11-14 0v-2 M12 19v4 M8 23h8',
  };
  const d = paths[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {d.split(' M').map((p, i) => (
        <path key={i} d={i === 0 ? p : 'M' + p} />
      ))}
    </svg>
  );
};

Object.assign(window, { GhostMark, Logo, Tag, StatusDot, Button, Card, Icon });
