// Phantom Marketing — Hero
const Hero = () => (
  <Section background="#FFFFFF" padding="80px 0 80px">
    {/* Top status row */}
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 28,
      borderBottom: '1px solid #0A0A0A',
      marginBottom: 60,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#4A4A4A',
    }}>
      <Logo size={28} />
      <div style={{ display: 'flex', gap: 24 }}>
        <span><span style={{ color: '#00D26A' }}>●</span> 142 agents en activité</span>
        <span>Paris — Lisbonne — remote</span>
        <span>v2.0 — Mai 2026</span>
      </div>
    </div>

    {/* Hero split */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 48, alignItems: 'start' }}>
      <div>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 132,
          lineHeight: 0.9,
          letterSpacing: '-0.055em',
          margin: 0,
          color: '#0A0A0A',
        }}>
          <span style={{ WebkitTextStroke: '3px #0A0A0A', color: 'transparent' }}>L'IA</span><br />
          qui bosse.<br />
          <span style={{ color: '#6E3CFF' }}>Toi tu dors.</span>
        </h1>

        <p style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: 21,
          lineHeight: 1.45,
          color: '#0A0A0A',
          maxWidth: 560,
          marginTop: 36,
          marginBottom: 0,
          textWrap: 'pretty',
        }}>
          Phantom, c'est une équipe d'experts + des agents IA qui gèrent ta présence en ligne pendant que tu fais tourner ta boîte. <strong>Social, avis, photos, site web, brand. On gère.</strong>
        </p>

        <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
          <Button variant="pop-yellow" size="lg">Crée ton agent — 3 min</Button>
          <Button variant="pop-white" size="lg">Voir le travail ↗</Button>
        </div>

        <div style={{ display: 'flex', gap: 32, marginTop: 56, alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {['#FF4D2E', '#FFD400', '#00D26A', '#0066FF', '#FF2D87'].map((c, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 9999,
                background: c, border: '2px solid #fff',
                marginLeft: i === 0 ? 0 : -10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 14,
                color: c === '#FFD400' ? '#0A0A0A' : '#fff',
              }}>{['JL', 'MA', 'TP', 'NK', 'SR'][i]}</div>
            ))}
          </div>
          <div style={{ fontFamily: 'Geist', fontSize: 14, color: '#4A4A4A', lineHeight: 1.4 }}>
            <strong style={{ color: '#0A0A0A' }}>142 entrepreneurs</strong> utilisent Phantom.<br />
            Restaurateurs, e-commerce, cabinets, créateurs.
          </div>
        </div>
      </div>

      {/* Right column posters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 12 }}>
        <PopCard background="#6E3CFF" color="#fff">
          <Eyebrow color="rgba(255,255,255,0.85)">Agent · Social Media</Eyebrow>
          <div style={{
            fontFamily: 'Space Grotesk', fontWeight: 700,
            fontSize: 36, lineHeight: 1, letterSpacing: '-0.02em',
          }}>Sushi Boy<br />+47% engagement</div>
          <div style={{
            marginTop: 18,
            fontFamily: 'JetBrains Mono', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            opacity: 0.85,
          }}>3 mois · 142 posts · TikTok / Insta</div>
          <GhostMark color="#FFD400" eyes="#0A0A0A" size={130} style={{
            position: 'absolute', right: -16, bottom: -28,
          }} />
        </PopCard>

        <PopCard background="#FFD400" color="#0A0A0A">
          <Eyebrow color="#0A0A0A">Cas client · Restaurant</Eyebrow>
          <div style={{
            fontFamily: 'Space Grotesk', fontWeight: 700,
            fontSize: 30, lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>"Mes commandes Uber Eats<br />ont doublé en 90 jours."</div>
          <div style={{
            marginTop: 16,
            fontFamily: 'JetBrains Mono', fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            opacity: 0.7,
          }}>Bistrot Rosa · Lyon · 2026</div>
        </PopCard>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          <Tag color="violet">Social media</Tag>
          <Tag color="red">Avis Google</Tag>
          <Tag color="orange">Photos resto</Tag>
          <Tag color="green">SEO</Tag>
          <Tag color="blue">Site web</Tag>
          <Tag color="pink">Brand B2C</Tag>
        </div>
      </div>
    </div>
  </Section>
);

window.Hero = Hero;
