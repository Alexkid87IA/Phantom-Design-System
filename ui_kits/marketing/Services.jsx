// Phantom Marketing — Services grid (6 categories of agents)
const agents = [
  { tag: 'A01', name: 'Social Manager', desc: 'Stratégie + production + scheduling. TikTok, Insta, LinkedIn, X. Tu valides, on poste.',
    color: '#FF2D87', tagColor: 'pink' },
  { tag: 'A02', name: 'Avis Google', desc: 'On collecte, on répond, on optimise. Tes étoiles montent, ton SEO local aussi.',
    color: '#FFD400', tagColor: 'yellow' },
  { tag: 'A03', name: 'Photos Resto', desc: 'Tes plats sur Uber Eats / Deliveroo. Retouchés, recadrés, optimisés. Plus de commandes.',
    color: '#FF8A1F', tagColor: 'orange' },
  { tag: 'A04', name: 'SEO', desc: 'Pages, articles, mots-clés. Tu apparais en premier sur Google quand un client te cherche.',
    color: '#00D26A', tagColor: 'green' },
  { tag: 'A05', name: 'Site Web', desc: 'Du brief au déploiement en 14 jours. Pas un template Wix, un vrai site sur-mesure.',
    color: '#0066FF', tagColor: 'blue' },
  { tag: 'A06', name: 'Brand B2C', desc: 'Tu passais en B2B ? On structure ton passage au grand public. Identité, ton, écosystème.',
    color: '#6E3CFF', tagColor: 'violet' },
];

const Services = () => (
  <Section background="#FFFFFF" padding="140px 0">
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64 }}>
      <div>
        <Eyebrow>Catalogue d'agents</Eyebrow>
        <h2 style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: 'clamp(48px, 5.5vw, 84px)',
          lineHeight: 1, letterSpacing: '-0.04em', margin: 0,
          maxWidth: 820,
        }}>
          6 agents.<br />Une seule équipe.
        </h2>
      </div>
      <div style={{
        fontFamily: 'Geist', fontSize: 15, color: '#4A4A4A',
        maxWidth: 380, textAlign: 'right', lineHeight: 1.5,
      }}>
        Combine-les comme tu veux. Active uniquement ceux dont tu as besoin. <strong style={{ color: '#0A0A0A' }}>Pas de bundle imposé.</strong>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
      {agents.map(a => (
        <PopCard key={a.tag} background="#fff">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <GhostMark color={a.color} size={56} />
            <span style={{
              fontFamily: 'JetBrains Mono', fontSize: 11,
              letterSpacing: '0.16em', color: '#9B9B9B',
            }}>{a.tag}</span>
          </div>
          <h3 style={{
            fontFamily: 'Space Grotesk', fontWeight: 700,
            fontSize: 30, lineHeight: 1, letterSpacing: '-0.02em',
            marginTop: 32, marginBottom: 12,
          }}>{a.name}</h3>
          <p style={{
            fontFamily: 'Geist', fontSize: 14, lineHeight: 1.5,
            color: '#4A4A4A', margin: 0, textWrap: 'pretty',
          }}>{a.desc}</p>
          <div style={{
            marginTop: 24, display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <Tag color={a.tagColor}>Disponible</Tag>
            <span style={{
              fontFamily: 'Geist', fontSize: 13, fontWeight: 600,
              color: '#0A0A0A', cursor: 'pointer',
            }}>Voir l'agent →</span>
          </div>
        </PopCard>
      ))}
    </div>
  </Section>
);

window.Services = Services;
