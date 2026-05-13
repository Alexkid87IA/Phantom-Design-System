// Phantom Mobile — Chat with an agent
const ChatScreen = () => {
  const messages = [
    { from: 'agent', text: "Bonjour Yannick. Voici les 12 posts pour la semaine du 18 mai. Tu valides en bulk ou un par un ?" },
    { from: 'user',  text: "Bulk. Mais montre-moi d'abord les 3 carousels." },
    { from: 'agent', text: "OK. Les voilà 👇\n\n1. Maki saumon avocat — recette en 4 slides\n2. Le sushi marseillais — histoire et anecdotes\n3. Pourquoi notre wasabi est fait main" },
    { from: 'user',  text: "Top. Remplace le 1 par une vidéo short, j'ai du beau matos." },
    { from: 'agent', text: "Compris. Tu peux uploader ta vidéo ici ou je passe la prendre dans iCloud à 14h ?" },
  ];

  return (
    <div style={{
      background: '#FFFFFF',
      minHeight: '100%',
      fontFamily: 'Geist, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '54px 16px 14px',
        background: '#fff',
        borderBottom: '1px solid rgba(10,10,10,0.06)',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 10,
        backdropFilter: 'blur(20px)',
        background: 'rgba(255,255,255,0.9)',
      }}>
        <span style={{ fontSize: 18, color: '#5A26EB', fontWeight: 600 }}>←</span>
        <GhostMark color="#FF2D87" size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600, color: '#0A0A0A' }}>Social Manager</div>
          <div style={{ fontFamily: 'Geist', fontSize: 11, color: '#9B9B9B', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#00D26A' }}/>
            En direct · Marie pilote
          </div>
        </div>
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: 9, letterSpacing: '0.08em',
          color: '#5A26EB', background: '#F2EDFF', padding: '4px 8px', borderRadius: 9999,
        }}>AGENT</span>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '82%',
              background: m.from === 'user' ? '#0A0A0A' : '#F2EDFF',
              color: m.from === 'user' ? '#fff' : '#0A0A0A',
              padding: '10px 14px',
              borderRadius: 16,
              borderTopLeftRadius: m.from === 'agent' ? 6 : 16,
              borderTopRightRadius: m.from === 'user' ? 6 : 16,
              fontFamily: 'Geist', fontSize: 14, lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}>{m.text}</div>
          </div>
        ))}
      </div>

      {/* Quick replies */}
      <div style={{ padding: '0 14px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['Valide tout', 'Plus de vidéos', 'Pause cette semaine'].map(s => (
          <button key={s} style={{
            background: 'rgba(10,10,10,0.05)', border: 'none',
            borderRadius: 9999, padding: '7px 12px',
            fontFamily: 'Geist', fontSize: 12, color: '#0A0A0A', whiteSpace: 'nowrap',
          }}>{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: '8px 14px 16px',
        background: '#F7F6F2',
        borderTop: '1px solid rgba(10,10,10,0.06)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#fff', borderRadius: 9999,
          padding: '4px 4px 4px 14px',
          border: '1px solid rgba(10,10,10,0.06)',
        }}>
          <input placeholder="Réponds à ton agent…" style={{
            flex: 1, border: 'none', outline: 'none',
            fontFamily: 'Geist', fontSize: 14, padding: '10px 0',
            background: 'transparent',
          }} />
          <button style={{
            background: '#6E3CFF', color: '#fff', border: 'none',
            width: 36, height: 36, borderRadius: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 16,
          }}>↑</button>
        </div>
      </div>
    </div>
  );
};

window.ChatScreen = ChatScreen;
