// Phantom Marketing — floating glass dock nav
const Nav = () => {
  const [active, setActive] = React.useState('Travail');
  const items = ['Agents', 'Travail', 'Tarifs', 'Équipe', 'Journal'];
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 6,
        borderRadius: 9999,
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        border: '1px solid rgba(10,10,10,0.06)',
        boxShadow: '0 16px 50px -10px rgba(10,10,10,0.18), 0 1px 0 0 rgba(10,10,10,0.04)',
      }}>
        <div style={{
          width: 32, height: 32, marginLeft: 4, marginRight: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <GhostMark color="#6E3CFF" size={28} />
        </div>
        {items.map(item => (
          <span
            key={item}
            onClick={() => setActive(item)}
            style={{
              padding: '10px 16px',
              borderRadius: 9999,
              fontFamily: 'Geist, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              color: '#0A0A0A',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              background: active === item ? '#fff' : 'transparent',
              boxShadow: active === item ? '0 1px 3px rgba(10,10,10,0.08), inset 0 0 0 1px rgba(10,10,10,0.05)' : 'none',
              transition: 'all 0.18s cubic-bezier(.2,.8,.2,1)',
            }}
          >{item}</span>
        ))}
        <button style={{
          marginLeft: 6,
          padding: '10px 18px',
          background: '#0A0A0A',
          color: '#fff',
          border: 'none',
          borderRadius: 9999,
          fontSize: 13,
          fontFamily: 'Geist, sans-serif',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
        }}>Contact ↗</button>
      </div>
    </div>
  );
};

window.Nav = Nav;
