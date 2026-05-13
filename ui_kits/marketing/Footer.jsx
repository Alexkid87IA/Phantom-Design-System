// Phantom Marketing — Footer (editorial mega-type)
const Footer = () => (
  <footer style={{ background: '#6E3CFF', color: '#fff', padding: '120px 0 40px', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', position: 'relative' }}>
      <Eyebrow color="#FFD400">— Prêt ?</Eyebrow>
      <h2 style={{
        fontFamily: 'Space Grotesk', fontWeight: 700,
        fontSize: 'clamp(96px, 14vw, 220px)',
        lineHeight: 0.88, letterSpacing: '-0.06em',
        margin: '24px 0 0 0',
      }}>
        On gère.<br />
        Toi tu vis.
      </h2>

      <div style={{
        display: 'flex', gap: 16, marginTop: 56,
      }}>
        <Button variant="pop-yellow" size="lg">Crée ton agent →</Button>
        <Button variant="pop-white" size="lg">Réserve un appel</Button>
      </div>

      {/* Floating ghosts */}
      <div style={{ position: 'absolute', right: 0, top: -20, display: 'flex', gap: 24 }}>
        <GhostMark color="#FFD400" size={84} style={{ animation: 'float 3s ease-in-out infinite' }} />
        <GhostMark color="#FF2D87" size={64} style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '0.6s' }} />
      </div>

      {/* Bottom bar */}
      <div style={{
        marginTop: 140, paddingTop: 32,
        borderTop: '1px solid rgba(255,255,255,0.2)',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      }}>
        <div>
          <Logo inverted size={28} />
          <p style={{
            fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5,
            color: 'rgba(255,255,255,0.6)', marginTop: 16,
          }}>L'agence IA des TPE et PME. Faite par des humains qui s'y connaissent.</p>
        </div>
        {[
          { title: 'Agents', items: ['Social Manager', 'Avis Google', 'Photos Resto', 'SEO', 'Site Web', 'Brand'] },
          { title: 'Studio', items: ['À propos', 'Manifeste', 'L\'équipe', 'Cas clients', 'Journal'] },
          { title: 'Contact', items: ['hello@phantom.fr', '+33 6 12 34 56 78', '23 rue de Turenne, Paris 3', 'Instagram', 'LinkedIn'] },
        ].map(col => (
          <div key={col.title}>
            <div style={{
              fontFamily: 'JetBrains Mono', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', marginBottom: 16,
            }}>— {col.title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {col.items.map(i => (
                <li key={i} style={{
                  fontFamily: 'Geist', fontSize: 14, color: '#fff',
                  padding: '6px 0', cursor: 'pointer',
                }}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 56, paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono', fontSize: 10,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)',
      }}>
        <span>© 2026 phantom — sas au capital de 100 000€</span>
        <span>mentions légales · cgv · confidentialité</span>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
