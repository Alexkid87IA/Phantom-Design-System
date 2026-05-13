// Phantom Web App — Sidebar
const Sidebar = ({ activeAgent, setActiveAgent }) => {
  const agents = [
    { id: 'social', name: 'Social Manager', color: '#FF2D87', status: 'running', count: 12 },
    { id: 'reviews', name: 'Avis Google', color: '#FFD400', status: 'running', count: 3 },
    { id: 'photos', name: 'Photos Resto', color: '#FF8A1F', status: 'waiting', count: 0 },
    { id: 'seo', name: 'SEO', color: '#00D26A', status: 'running', count: 5 },
    { id: 'web', name: 'Site Web', color: '#0066FF', status: 'sleeping', count: 0 },
    { id: 'brand', name: 'Brand B2C', color: '#6E3CFF', status: 'running', count: 2 },
  ];

  const sections = [
    { title: 'Atelier', items: [
      { id: 'home', label: 'Tableau de bord', icon: 'chart' },
      { id: 'inbox', label: 'Boîte de réception', icon: 'inbox', badge: 4 },
      { id: 'work', label: 'Travail produit', icon: 'folder' },
    ]},
  ];

  return (
    <aside style={{
      width: 280,
      background: '#F7F6F2',
      borderRight: '1px solid rgba(10,10,10,0.06)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      {/* Workspace switcher */}
      <div style={{
        padding: '10px 12px',
        marginBottom: 18,
        borderRadius: 12,
        background: '#fff',
        border: '1px solid rgba(10,10,10,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: '#FFD400',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Space Grotesk', fontWeight: 700, color: '#0A0A0A',
          fontSize: 16,
          border: '1.5px solid #0A0A0A',
        }}>SB</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.2 }}>Sushi Boy</div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.06em', color: '#9B9B9B', marginTop: 2 }}>RESTO · MARSEILLE</div>
        </div>
        <Icon name="arrow" size={14} color="#9B9B9B" />
      </div>

      {/* Sections */}
      {sections.map(sec => (
        <div key={sec.title} style={{ marginBottom: 16 }}>
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#9B9B9B',
            padding: '4px 12px 8px',
          }}>— {sec.title}</div>
          {sec.items.map(it => (
            <div key={it.id} style={{
              padding: '8px 12px',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer',
              background: it.id === 'home' ? 'rgba(110,60,255,0.08)' : 'transparent',
              color: it.id === 'home' ? '#5A26EB' : '#0A0A0A',
              fontFamily: 'Geist', fontSize: 14, fontWeight: it.id === 'home' ? 500 : 400,
            }}>
              <Icon name={it.icon} size={17} stroke={1.8} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.badge != null && (
                <span style={{
                  background: '#FF4D2E', color: '#fff',
                  fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600,
                  padding: '2px 6px', borderRadius: 9999, minWidth: 18, textAlign: 'center',
                }}>{it.badge}</span>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Agents */}
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: 'JetBrains Mono', fontSize: 10, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: '#9B9B9B',
          padding: '4px 12px 8px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>— Agents actifs</span>
          <Icon name="plus" size={13} color="#0A0A0A" stroke={2} />
        </div>
        {agents.map(a => (
          <div key={a.id}
            onClick={() => setActiveAgent(a.id)}
            style={{
              padding: '7px 10px',
              borderRadius: 9,
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer',
              background: activeAgent === a.id ? '#fff' : 'transparent',
              boxShadow: activeAgent === a.id ? '0 1px 0 0 rgba(10,10,10,0.05), inset 0 0 0 1px rgba(10,10,10,0.06)' : 'none',
            }}>
            <GhostMark color={a.color} size={22} />
            <span style={{ flex: 1, fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: '#0A0A0A' }}>{a.name}</span>
            <StatusDot status={a.status} />
            {a.count > 0 && (
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: 10, color: '#9B9B9B', minWidth: 14, textAlign: 'right',
              }}>{a.count}</span>
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Bottom: support card + user */}
      <div style={{
        background: '#0A0A0A',
        color: '#fff',
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <GhostMark color="#FFD400" size={56} style={{ position: 'absolute', right: -8, bottom: -12, opacity: 0.95 }} />
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 15, lineHeight: 1.15, maxWidth: 160 }}>Besoin d'aide ? On répond en 1h.</div>
        <button style={{
          background: '#fff', color: '#0A0A0A', border: 'none',
          borderRadius: 9999, padding: '6px 12px',
          fontFamily: 'Geist', fontSize: 12, fontWeight: 600,
          marginTop: 12, cursor: 'pointer',
        }}>Slack équipe →</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px' }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9999, background: '#FF2D87',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12,
        }}>YL</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: '#0A0A0A' }}>Yannick L.</div>
          <div style={{ fontFamily: 'Geist', fontSize: 11, color: '#9B9B9B' }}>yannick@sushiboy.fr</div>
        </div>
        <Icon name="settings" size={16} color="#9B9B9B" />
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
