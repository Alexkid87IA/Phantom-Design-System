// Phantom Web App — KPI stats bar
const StatsRow = () => {
  const stats = [
    { lbl: 'Engagement Insta', val: '+47%', sub: '+8.2 pts vs mois dernier', color: '#FF2D87', trend: 'up' },
    { lbl: 'Note Google', val: '4.7★', sub: '+0.8 en 6 semaines', color: '#FFD400', dark: true, trend: 'up' },
    { lbl: 'Commandes Uber Eats', val: '×2.1', sub: '142 → 298 / mois', color: '#FF8A1F', trend: 'up' },
    { lbl: 'Trafic site', val: '12.4k', sub: '+38% organique', color: '#00D26A', trend: 'up' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {stats.map(s => (
        <div key={s.lbl} style={{
          background: s.color,
          color: s.dark ? '#0A0A0A' : '#fff',
          borderRadius: 16,
          padding: 18,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            opacity: 0.85,
          }}>— {s.lbl}</div>
          <div style={{
            fontFamily: 'Space Grotesk', fontWeight: 700,
            fontSize: 44, lineHeight: 1, letterSpacing: '-0.04em',
            marginTop: 10,
            fontVariantNumeric: 'tabular-nums',
          }}>{s.val}</div>
          <div style={{
            fontFamily: 'Geist', fontSize: 12,
            opacity: 0.85, marginTop: 8,
          }}>{s.sub}</div>
          {/* mini sparkline */}
          <svg width={70} height={28} viewBox="0 0 70 28" fill="none" style={{ position: 'absolute', right: 14, bottom: 14, opacity: 0.95 }}>
            <path d="M2 22 L12 18 L22 20 L32 12 L42 14 L52 6 L62 2 L68 4" stroke={s.dark ? '#0A0A0A' : '#fff'} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ))}
    </div>
  );
};

window.StatsRow = StatsRow;
