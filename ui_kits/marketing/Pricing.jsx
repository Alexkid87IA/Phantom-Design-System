// Phantom Marketing — Pricing
const Pricing = () => {
  const plans = [
    { name: 'Solo', tag: '— TPE / Indé', price: '490', period: '/ mois', desc: 'Pour une activité avec 1 enjeu clair. Un seul agent activé.',
      features: ['1 agent au choix', 'Reporting mensuel', 'Slack équipe Phantom', 'Cancel anytime'],
      cta: 'Crée ton agent', variant: 'pop-white' },
    { name: 'PME', tag: '— Le standard', price: '1 490', period: '/ mois',
      desc: 'Pour un écosystème à structurer. Jusqu\'à 4 agents combinés.',
      features: ['4 agents combinés', 'Reporting hebdo', 'Slack + appel mensuel', 'A/B testing', 'Score d\'attribution'],
      cta: 'Démarre maintenant', variant: 'pop-yellow', highlight: true },
    { name: 'Sur-mesure', tag: '— Multi-marques', price: 'Devis', period: '',
      desc: 'Pour les groupes, marques multi-sites, transitions B2B→B2C.',
      features: ['Agents illimités', 'Équipe dédiée', 'Workshops stratégiques', 'Roadmap brand 12 mois', 'White label possible'],
      cta: 'On se parle ↗', variant: 'pop-white' },
  ];

  return (
    <Section background="#FFFFFF" padding="140px 0">
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <Eyebrow>Tarifs</Eyebrow>
        <h2 style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: 'clamp(48px, 5.5vw, 84px)',
          lineHeight: 1, letterSpacing: '-0.04em', margin: 0,
        }}>
          Pas d'engagement.<br />
          <span style={{ color: '#6E3CFF' }}>Que des résultats.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {plans.map(p => (
          <PopCard key={p.name}
            background={p.highlight ? '#FFD400' : '#fff'}
            color="#0A0A0A"
            style={{ padding: 32, transform: p.highlight ? 'translateY(-12px)' : 'none' }}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 11,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: p.highlight ? '#0A0A0A' : '#5A26EB',
            }}>{p.tag}</div>
            <h3 style={{
              fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 48,
              lineHeight: 1, letterSpacing: '-0.04em', margin: '12px 0 18px',
            }}>{p.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
              <span style={{
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 64,
                letterSpacing: '-0.04em', lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}>{p.price === 'Devis' ? p.price : '€' + p.price}</span>
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: 13, color: '#4A4A4A',
              }}>{p.period}</span>
            </div>
            <p style={{
              fontFamily: 'Geist', fontSize: 14, lineHeight: 1.5,
              color: '#1A1A1A', margin: '0 0 24px 0',
            }}>{p.desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }}>
              {p.features.map(f => (
                <li key={f} style={{
                  fontFamily: 'Geist', fontSize: 14, color: '#0A0A0A',
                  padding: '8px 0', borderBottom: '1px solid rgba(10,10,10,0.08)',
                  display: 'flex', gap: 10, alignItems: 'center',
                }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 9999,
                    background: '#0A0A0A', color: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={p.variant} size="lg" style={{ width: '100%', justifyContent: 'center' }}>{p.cta}</Button>
          </PopCard>
        ))}
      </div>
    </Section>
  );
};

window.Pricing = Pricing;
