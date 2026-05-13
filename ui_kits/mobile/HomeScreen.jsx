// Phantom Mobile — Home (dashboard)
const HomeScreen = () => (
  <div style={{
    background: '#FFFFFF',
    minHeight: '100%',
    padding: '64px 18px 100px',
    fontFamily: 'Geist, system-ui, sans-serif',
  }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
      <div>
        <div style={{
          fontFamily: 'JetBrains Mono', fontSize: 10,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: '#5A26EB',
        }}>— LUN 12 MAI</div>
        <div style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: 30, lineHeight: 1, letterSpacing: '-0.03em',
          marginTop: 6, color: '#0A0A0A',
        }}>Salut Yannick.</div>
      </div>
      <div style={{
        width: 38, height: 38, borderRadius: 9999, background: '#FF2D87',
        color: '#fff', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid #fff', boxShadow: '0 1px 4px rgba(10,10,10,0.15)',
      }}>YL</div>
    </div>

    <div style={{
      fontFamily: 'Geist', fontSize: 15, color: '#4A4A4A',
      marginBottom: 22, lineHeight: 1.4,
    }}>Tes <strong style={{ color: '#0A0A0A' }}>3 agents</strong> ont bossé pendant que tu dormais. 2 trucs à valider.</div>

    {/* Big KPI hero card */}
    <div style={{
      background: '#6E3CFF', color: '#fff',
      borderRadius: 24, padding: 20,
      position: 'relative', overflow: 'hidden',
      marginBottom: 14,
    }}>
      <Tag color="ghost">— Mois en cours</Tag>
      <div style={{
        fontFamily: 'Space Grotesk', fontWeight: 700,
        fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em',
        marginTop: 10, fontVariantNumeric: 'tabular-nums',
      }}>+47%</div>
      <div style={{ fontFamily: 'Geist', fontSize: 13, opacity: 0.85, marginTop: 8 }}>Engagement Insta · +8.2 pts vs mois dernier</div>
      <GhostMark color="#FFD400" size={100} style={{ position: 'absolute', right: -10, bottom: -22 }} />
    </div>

    {/* Secondary KPI row */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 22 }}>
      <div style={{ background: '#FFD400', color: '#0A0A0A', padding: 14, borderRadius: 16 }}>
        <Tag color="ghost">— Note Google</Tag>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 28, lineHeight: 1, marginTop: 6, letterSpacing: '-0.03em' }}>4.7 ★</div>
      </div>
      <div style={{ background: '#FF8A1F', color: '#fff', padding: 14, borderRadius: 16 }}>
        <Tag color="ghost">— Uber Eats</Tag>
        <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 28, lineHeight: 1, marginTop: 6, letterSpacing: '-0.03em' }}>×2.1</div>
      </div>
    </div>

    {/* Agents */}
    <div style={{
      fontFamily: 'JetBrains Mono', fontSize: 10,
      letterSpacing: '0.16em', textTransform: 'uppercase',
      color: '#9B9B9B', marginBottom: 10,
    }}>— Tes agents</div>

    {[
      { color: '#FF2D87', name: 'Social Manager', last: 'A publié il y a 2h · 12 posts plannifiés', n: 12, action: 'À valider' },
      { color: '#FFD400', name: 'Avis Google', last: 'Répondu à 3 avis ce matin', n: 3, action: null },
      { color: '#FF8A1F', name: 'Photos Resto', last: '5 photos attendent ta validation', n: 5, action: 'À valider' },
    ].map(a => (
      <div key={a.name} style={{
        background: '#fff',
        border: '1px solid rgba(10,10,10,0.06)',
        borderRadius: 16, padding: 14, marginBottom: 10,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <GhostMark color={a.color} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Geist', fontSize: 15, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.2 }}>{a.name}</div>
          <div style={{ fontFamily: 'Geist', fontSize: 12, color: '#767676', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.last}</div>
        </div>
        {a.action && <Tag color="yellow">{a.action}</Tag>}
      </div>
    ))}
  </div>
);

window.HomeScreen = HomeScreen;
