// Phantom Mobile — Onboarding (agent picker)
const OnboardingScreen = () => {
  const agents = [
    { color: '#FF2D87', name: 'Social Manager', desc: 'Insta, TikTok, LinkedIn' },
    { color: '#FFD400', name: 'Avis Google', desc: 'Réponses + collecte' },
    { color: '#FF8A1F', name: 'Photos Resto', desc: 'Uber Eats / Deliveroo' },
    { color: '#00D26A', name: 'SEO', desc: 'Articles, mots-clés' },
    { color: '#0066FF', name: 'Site Web', desc: 'Refonte ou création' },
    { color: '#6E3CFF', name: 'Brand B2C', desc: 'Identité, ton, écosystème' },
  ];
  const [picked, setPicked] = React.useState(new Set(['Social Manager', 'Avis Google']));

  const toggle = (n) => {
    const next = new Set(picked);
    next.has(n) ? next.delete(n) : next.add(n);
    setPicked(next);
  };

  return (
    <div style={{
      background: '#FFFFFF',
      minHeight: '100%',
      padding: '64px 22px 30px',
      fontFamily: 'Geist, system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating ghosts background */}
      <GhostMark color="#FFD400" size={50} style={{ position: 'absolute', right: -10, top: 80, opacity: 0.95 }} />
      <GhostMark color="#FF2D87" size={36} style={{ position: 'absolute', left: -8, top: 180, opacity: 0.95 }} />

      <div style={{
        fontFamily: 'JetBrains Mono', fontSize: 10,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: '#5A26EB',
      }}>— Étape 2 / 4</div>

      <h1 style={{
        fontFamily: 'Space Grotesk', fontWeight: 700,
        fontSize: 38, lineHeight: 0.95, letterSpacing: '-0.04em',
        margin: '12px 0 14px', color: '#0A0A0A',
      }}>Tu veux qu'on s'occupe<br/>de quoi ?</h1>

      <p style={{
        fontFamily: 'Geist', fontSize: 14, lineHeight: 1.5,
        color: '#4A4A4A', margin: '0 0 24px',
      }}>Active les agents qui collent à ta boîte. Tu peux en ajouter d'autres plus tard. <strong style={{ color: '#0A0A0A' }}>Pas de bundle imposé.</strong></p>

      {/* Agent grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {agents.map(a => {
          const isOn = picked.has(a.name);
          return (
            <div key={a.name}
              onClick={() => toggle(a.name)}
              style={{
                background: isOn ? a.color : '#fff',
                color: isOn ? (a.color === '#FFD400' ? '#0A0A0A' : '#fff') : '#0A0A0A',
                border: isOn ? '2.5px solid #0A0A0A' : '1.5px solid rgba(10,10,10,0.08)',
                borderRadius: 18, padding: 14,
                boxShadow: isOn ? '3px 3px 0 0 #0A0A0A' : 'none',
                transition: 'transform 0.18s cubic-bezier(.2,.8,.2,1)',
                position: 'relative',
              }}>
              <GhostMark color={isOn ? '#0A0A0A' : a.color} eyes={isOn ? a.color : '#0A0A0A'} size={36} />
              <div style={{
                fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 16,
                lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 10,
              }}>{a.name}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 11, marginTop: 4, opacity: 0.75 }}>{a.desc}</div>
              {isOn && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 22, height: 22, borderRadius: 9999,
                  background: '#fff', color: '#0A0A0A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  border: '1.5px solid #0A0A0A',
                }}>✓</div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <button style={{
        marginTop: 22, width: '100%',
        background: '#6E3CFF', color: '#fff', border: 'none',
        padding: '16px 20px', borderRadius: 9999,
        fontFamily: 'Geist', fontSize: 16, fontWeight: 600,
        letterSpacing: '-0.01em', cursor: 'pointer',
      }}>Continuer · {picked.size} agent{picked.size > 1 ? 's' : ''} →</button>

      <div style={{
        textAlign: 'center', marginTop: 14,
        fontFamily: 'Geist', fontSize: 12, color: '#9B9B9B',
      }}>Tu n'es pas sûr ? <span style={{ color: '#5A26EB', fontWeight: 500 }}>Réserve un appel gratuit.</span></div>
    </div>
  );
};

window.OnboardingScreen = OnboardingScreen;
