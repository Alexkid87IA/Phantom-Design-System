// Phantom Marketing — Case Study (before / after Sushi Boy)
const CaseStudy = () => (
  <Section background="#F2EDFF" padding="140px 0">
    <Eyebrow color="#5A26EB">Cas client · Sushi Boy</Eyebrow>
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
      <div>
        <h2 style={{
          fontFamily: 'Space Grotesk', fontWeight: 700,
          fontSize: 'clamp(48px, 5.5vw, 84px)',
          lineHeight: 1, letterSpacing: '-0.04em', margin: 0,
        }}>
          De <span style={{ textDecoration: 'line-through', color: '#9B9B9B' }}>800</span> à <span style={{ color: '#6E3CFF' }}>11 400</span><br />
          followers Insta<br />
          en 3 mois.
        </h2>
        <p style={{
          fontFamily: 'Geist', fontSize: 18, lineHeight: 1.5,
          color: '#1A1A1A', marginTop: 28, marginBottom: 0, maxWidth: 540,
        }}>
          Sushi Boy, restaurant de 12 couverts à Marseille. On a déployé l'<strong>Agent Social</strong> + l'<strong>Agent Photos Resto</strong>. 142 posts produits, 8 collabs influence, 3 vidéos virales.
        </p>
        <div style={{
          display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap',
        }}>
          <Tag color="pink">Social</Tag>
          <Tag color="orange">Photos Uber Eats</Tag>
          <Tag color="violet">3 mois</Tag>
        </div>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { n: '+47%', l: 'Engagement Insta', c: '#6E3CFF' },
          { n: '×2.1', l: 'Commandes Uber Eats', c: '#FF8A1F' },
          { n: '4.7★', l: 'Note Google (de 3.9)', c: '#FFD400', dark: true },
          { n: '142', l: 'Posts produits', c: '#FF2D87' },
        ].map((s, i) => (
          <PopCard key={i} background={s.c} color={s.dark ? '#0A0A0A' : '#fff'}
            style={{ padding: '28px 22px' }}>
            <div style={{
              fontFamily: 'Space Grotesk', fontWeight: 700,
              fontSize: 56, lineHeight: 1, letterSpacing: '-0.04em',
              fontVariantNumeric: 'tabular-nums',
            }}>{s.n}</div>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 11,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              marginTop: 12, opacity: 0.85,
            }}>— {s.l}</div>
          </PopCard>
        ))}
      </div>
    </div>

    {/* Testimony */}
    <div style={{
      marginTop: 96, padding: '40px 48px', background: '#fff',
      border: '2.5px solid #0A0A0A', borderRadius: 24,
      boxShadow: '8px 8px 0 0 #0A0A0A',
      display: 'grid', gridTemplateColumns: '80px 1fr auto',
      gap: 32, alignItems: 'center',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: 9999, background: '#FFD400',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 28, color: '#0A0A0A',
        border: '2px solid #0A0A0A',
      }}>SB</div>
      <div>
        <p style={{
          fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: 24,
          lineHeight: 1.25, letterSpacing: '-0.02em',
          margin: 0, color: '#0A0A0A',
        }}>"On a essayé 3 agences. Phantom est la seule qui a livré sans qu'on doive les suivre. Ils gèrent. C'est tout."</p>
        <div style={{
          fontFamily: 'Geist', fontSize: 14, color: '#4A4A4A', marginTop: 10,
        }}>Yannick L. — Sushi Boy, Marseille</div>
      </div>
      <Button variant="pop-violet">Lire le cas ↗</Button>
    </div>
  </Section>
);

window.CaseStudy = CaseStudy;
