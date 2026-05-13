// Phantom Web App — Activity feed
const items = [
  { t: '14:32', actor: { name: 'Social Manager', color: '#FF2D87' }, action: 'a publié',
    target: 'Post "Nigiri du jour" sur Instagram', meta: '147 likes en 2h · super départ.', status: 'done' },
  { t: '13:18', actor: { name: 'Avis Google', color: '#FFD400' }, action: 'a répondu à',
    target: 'Avis 3★ de Camille D.', meta: 'Réponse approuvée par l\'équipe.', status: 'done' },
  { t: '12:01', actor: { name: 'Photos Resto', color: '#FF8A1F' }, action: 'attend ta validation sur',
    target: '5 nouvelles photos pour Uber Eats', meta: 'Maki saumon, california, dragon roll, +2', status: 'waiting' },
  { t: '11:24', actor: { name: 'SEO', color: '#00D26A' }, action: 'a publié l\'article',
    target: '"Pourquoi le sushi marseillais cartonne"', meta: 'Indexé Google · position 12 estimée', status: 'done' },
  { t: '10:45', actor: { name: 'Social Manager', color: '#FF2D87' }, action: 'a programmé',
    target: '12 posts pour la semaine du 18 mai', meta: 'Validation requise avant lundi 7h', status: 'waiting' },
  { t: 'Hier', actor: { name: 'Brand B2C', color: '#6E3CFF' }, action: 'a finalisé',
    target: 'Refonte du logo (V3)', meta: 'Marie de l\'équipe Phantom · 3 versions livrées', status: 'done' },
];

const ActivityFeed = () => (
  <Card padding={0} style={{ overflow: 'hidden' }}>
    <div style={{
      padding: '16px 20px',
      borderBottom: '1px solid rgba(10,10,10,0.06)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div>
        <div style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 15, color: '#0A0A0A' }}>Activité agentique</div>
        <div style={{ fontFamily: 'Geist', fontSize: 12, color: '#9B9B9B', marginTop: 2 }}>Tout ce qui s'est passé pendant que tu dormais.</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <Tag color="ghost" size="sm">Tout</Tag>
        <Tag color="ghost" size="sm">À valider · 2</Tag>
      </div>
    </div>

    {items.map((it, i) => (
      <div key={i} style={{
        padding: '14px 20px',
        display: 'flex', gap: 14, alignItems: 'flex-start',
        borderBottom: i < items.length - 1 ? '1px solid rgba(10,10,10,0.04)' : 'none',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: 11,
          color: '#9B9B9B', width: 40, flexShrink: 0, paddingTop: 5,
        }}>{it.t}</span>
        <GhostMark color={it.actor.color} size={28} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Geist', fontSize: 14, color: '#0A0A0A', lineHeight: 1.4 }}>
            <strong style={{ fontWeight: 600 }}>{it.actor.name}</strong>{' '}
            <span style={{ color: '#4A4A4A' }}>{it.action}</span>{' '}
            <strong style={{ fontWeight: 500 }}>{it.target}</strong>
          </div>
          <div style={{ fontFamily: 'Geist', fontSize: 12, color: '#767676', marginTop: 4 }}>{it.meta}</div>
        </div>
        {it.status === 'waiting'
          ? <Tag color="yellow" size="sm">À valider</Tag>
          : <Tag color="ghost" size="sm">Fait</Tag>}
      </div>
    ))}
  </Card>
);

window.ActivityFeed = ActivityFeed;
