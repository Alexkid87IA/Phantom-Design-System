// Phantom Web App — Dashboard view orchestration
const Dashboard = () => {
  const [activeAgent, setActiveAgent] = React.useState('social');

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#FFFFFF',
      fontFamily: 'Geist, sans-serif',
    }}>
      <Sidebar activeAgent={activeAgent} setActiveAgent={setActiveAgent} />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Topbar />

        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Welcome row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono', fontSize: 11,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: '#5A26EB',
              }}>— Lundi 12 mai · 14:48</div>
              <h1 style={{
                fontFamily: 'Space Grotesk', fontWeight: 700,
                fontSize: 44, lineHeight: 1, letterSpacing: '-0.03em',
                margin: '12px 0 0', color: '#0A0A0A',
              }}>Salut Yannick. <span style={{ color: '#9B9B9B' }}>Tes agents ont bien bossé.</span></h1>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="subtle" size="md" icon={<Icon name="chart" size={14} color="#0A0A0A" />}>Rapport mensuel</Button>
              <Button variant="primary" size="md" icon={<Icon name="sparkles" size={14} color="#fff" />}>Brief un nouvel agent</Button>
            </div>
          </div>

          <StatsRow />

          {/* Two-column: activity + composer */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'flex-start' }}>
            <ActivityFeed />
            <Composer />
          </div>
        </div>
      </main>
    </div>
  );
};

window.Dashboard = Dashboard;
