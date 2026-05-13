// Phantom Marketing — Manifesto editorial section
const Manifesto = () => (
  <Section background="#0A0A0A" padding="140px 0">
    <div style={{ color: '#fff' }}>
      <Eyebrow color="#FFD400">Comment ça marche</Eyebrow>
      <h2 style={{
        fontFamily: 'Space Grotesk', fontWeight: 600,
        fontSize: 'clamp(56px, 6.5vw, 96px)',
        lineHeight: 1, letterSpacing: '-0.04em',
        margin: 0, maxWidth: 1100,
      }}>
        <span style={{ color: '#9B9B9B' }}>Phantom n'est pas</span> un SaaS.<br />
        Pas un chatbot. Pas un outil.<br />
        C'est <span style={{ color: '#FFD400' }}>un studio qui livre</span>—<br />
        avec des agents IA dedans.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32, marginTop: 80, paddingTop: 40,
        borderTop: '1px solid rgba(255,255,255,0.15)',
      }}>
        {[
          { n: '01', title: 'Tu nous parles de ta boîte.',
            body: '30 minutes en visio. On comprend ton business, tes clients, tes objectifs. Pas de tunnel de qualification, pas de SDR.' },
          { n: '02', title: 'On déploie les agents qu\'il te faut.',
            body: 'Social, avis, SEO, photos, site, brand. On choisit les agents pertinents et on les configure pour TOI. Pas de template.' },
          { n: '03', title: 'L\'équipe Phantom pilote. Tu mesures.',
            body: 'Tes KPIs, ton dashboard, tes résultats. Si ça performe pas, on ajuste. Sans abonnement à 6 mois.' },
        ].map(step => (
          <div key={step.n}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#FFD400', marginBottom: 14,
            }}>— {step.n}</div>
            <h3 style={{
              fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 24,
              lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0, color: '#fff',
            }}>{step.title}</h3>
            <p style={{
              fontFamily: 'Geist', fontSize: 15, lineHeight: 1.55,
              color: 'rgba(255,255,255,0.65)', marginTop: 14, marginBottom: 0,
            }}>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

window.Manifesto = Manifesto;
