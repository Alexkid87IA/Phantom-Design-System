// Phantom Web App — Topbar
const Topbar = () => (
  <header style={{
    height: 64,
    borderBottom: '1px solid rgba(10,10,10,0.06)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    gap: 20,
    background: 'rgba(255,255,255,0.86)',
    backdropFilter: 'blur(20px)',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontFamily: 'Geist', fontSize: 14, color: '#4A4A4A',
    }}>
      <span>Sushi Boy</span>
      <span style={{ color: '#9B9B9B' }}>/</span>
      <span style={{ color: '#0A0A0A', fontWeight: 500 }}>Tableau de bord</span>
    </div>

    <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
      <Icon name="search" size={16} color="#9B9B9B" />
      <input
        placeholder="Cherche un agent, une tâche, un client..."
        style={{
          width: '100%',
          background: 'rgba(10,10,10,0.04)',
          border: '1px solid transparent',
          borderRadius: 9999,
          padding: '8px 14px 8px 38px',
          fontFamily: 'Geist',
          fontSize: 13,
          color: '#0A0A0A',
          outline: 'none',
          marginLeft: -22,
        }}
      />
      <span style={{
        position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9B9B9B',
        background: '#fff', padding: '2px 6px', borderRadius: 4,
        border: '1px solid rgba(10,10,10,0.08)',
      }}>⌘ K</span>
    </div>

    <div style={{ flex: 1 }} />

    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Tag color="green" size="sm">3 agents en cours</Tag>
      <button style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        padding: 8, borderRadius: 8, display: 'flex', position: 'relative',
      }}>
        <Icon name="bell" size={18} color="#0A0A0A" stroke={1.6} />
        <span style={{
          position: 'absolute', top: 6, right: 6,
          width: 7, height: 7, borderRadius: 9999, background: '#FF4D2E',
        }} />
      </button>
      <Button variant="dark" size="sm" icon={<Icon name="plus" size={14} color="#fff" stroke={2.5} />}>Nouveau brief</Button>
    </div>
  </header>
);

window.Topbar = Topbar;
