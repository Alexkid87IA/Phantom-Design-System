// Phantom Marketing — shared atoms
// Loaded as <script type="text/babel" src="components.jsx">

const GhostMark = ({ color = '#6E3CFF', eyes = '#0A0A0A', size = 80, blush = false, style }) => (
  <svg viewBox="0 0 200 200" fill="none" style={{ width: size, height: size, color, ...style }}>
    <path d="M 20 100 A 80 80 0 0 1 180 100 L 180 160 Q 160 182 140 160 Q 120 182 100 160 Q 80 182 60 160 Q 40 182 20 160 Z" fill="currentColor" />
    <ellipse cx="78" cy="92" rx="10" ry="15" fill={eyes} />
    <ellipse cx="122" cy="92" rx="10" ry="15" fill={eyes} />
    {blush && <>
      <circle cx="60" cy="118" r="6" fill="#FF2D87" opacity="0.55" />
      <circle cx="140" cy="118" r="6" fill="#FF2D87" opacity="0.55" />
    </>}
  </svg>
);

const Logo = ({ inverted = false, size = 32 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
    <GhostMark color={inverted ? '#fff' : '#6E3CFF'} eyes="#0A0A0A" size={size} />
    <span style={{
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 700,
      fontSize: size * 0.72,
      letterSpacing: '-1.2px',
      color: inverted ? '#fff' : '#0A0A0A',
      lineHeight: 1,
      textTransform: 'none',
    }}>phantom</span>
  </div>
);

const Eyebrow = ({ color = '#5A26EB', children }) => (
  <div style={{
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color,
    marginBottom: 12,
  }}>— {children}</div>
);

const Button = ({ variant = 'pop-yellow', size = 'md', icon, children, onClick, style }) => {
  const palettes = {
    'pop-yellow': { bg: '#FFD400', fg: '#0A0A0A', border: '#0A0A0A', shadow: '5px 5px 0 0 #0A0A0A' },
    'pop-violet': { bg: '#6E3CFF', fg: '#fff', border: '#0A0A0A', shadow: '5px 5px 0 0 #0A0A0A' },
    'pop-white': { bg: '#fff', fg: '#0A0A0A', border: '#0A0A0A', shadow: '5px 5px 0 0 #0A0A0A' },
    'pop-pink': { bg: '#FF2D87', fg: '#fff', border: '#0A0A0A', shadow: '5px 5px 0 0 #0A0A0A' },
    'primary': { bg: '#6E3CFF', fg: '#fff', border: 'transparent', shadow: 'none' },
    'dark': { bg: '#0A0A0A', fg: '#fff', border: 'transparent', shadow: 'none' },
    'ghost': { bg: 'transparent', fg: '#0A0A0A', border: '#0A0A0A', shadow: 'none' },
  };
  const p = palettes[variant];
  const padding = size === 'lg' ? '16px 26px' : size === 'sm' ? '9px 16px' : '13px 22px';
  const fontSize = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const radius = variant.startsWith('pop') ? 14 : 9999;
  const borderWidth = variant.startsWith('pop') || variant === 'ghost' ? 2 : 0;

  const [pressed, setPressed] = React.useState(false);
  const isPop = variant.startsWith('pop');
  const transform = pressed && isPop ? 'translate(5px, 5px)' : 'translate(0,0)';
  const liveShadow = pressed && isPop ? '0 0 0 0 #0A0A0A' : p.shadow;

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        fontFamily: 'Geist, system-ui, sans-serif',
        fontWeight: 600,
        fontSize,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding,
        borderRadius: radius,
        background: p.bg,
        color: p.fg,
        border: `${borderWidth}px solid ${p.border}`,
        boxShadow: liveShadow,
        transform,
        transition: 'transform .08s cubic-bezier(.2,.8,.2,1), box-shadow .08s cubic-bezier(.2,.8,.2,1)',
        letterSpacing: '-0.01em',
        ...style,
      }}
    >
      {children}
      {icon}
    </button>
  );
};

const Tag = ({ color = 'violet', size = 'md', children }) => {
  const palettes = {
    violet: { bg: '#F2EDFF', fg: '#5A26EB' },
    red: { bg: '#FFE2DA', fg: '#DE2C0F' },
    orange: { bg: '#FFEBD2', fg: '#DB6A00' },
    yellow: { bg: '#FFF3B0', fg: '#8A6F00' },
    green: { bg: '#CFF5E0', fg: '#00A050' },
    blue: { bg: '#D6E4FF', fg: '#0049CC' },
    pink: { bg: '#FFD4E5', fg: '#D6126A' },
    dark: { bg: '#0A0A0A', fg: '#fff' },
    outline: { bg: '#fff', fg: '#0A0A0A', border: true },
  };
  const p = palettes[color] || palettes.violet;
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: size === 'sm' ? 10 : 11,
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      padding: size === 'sm' ? '4px 8px' : '6px 12px',
      borderRadius: 9999,
      background: p.bg,
      color: p.fg,
      border: p.border ? '1.5px solid #0A0A0A' : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 9999, background: 'currentColor' }} />
      {children}
    </span>
  );
};

const PopCard = ({ background = '#fff', color = '#0A0A0A', children, style }) => (
  <div style={{
    border: '2.5px solid #0A0A0A',
    borderRadius: 20,
    background,
    color,
    padding: 24,
    boxShadow: '6px 6px 0 0 #0A0A0A',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  }}>{children}</div>
);

const SoftCard = ({ children, style }) => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    padding: 22,
    boxShadow: '0 6px 24px -8px rgba(10,10,10,.1), 0 1px 0 0 rgba(10,10,10,.04)',
    border: '1px solid rgba(10,10,10,.06)',
    ...style,
  }}>{children}</div>
);

// Section wrapper with consistent horizontal padding
const Section = ({ background = '#fff', children, style, padding = '120px 0' }) => (
  <section style={{ background, padding, ...style }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>{children}</div>
  </section>
);

Object.assign(window, {
  GhostMark, Logo, Eyebrow, Button, Tag, PopCard, SoftCard, Section,
});
