// Phantom Web App — Composer (chat with an agent)
const seedMessages = [
  { from: 'agent', text: "Salut Yannick. J'ai préparé 12 posts pour la semaine du 18 mai. 4 nigiris du jour, 3 stories behind-the-scenes, 2 collabs avec @marseillefood, et 3 carousels recette." },
  { from: 'user',  text: "Top. Tu peux pousser plus sur les vidéos shorts ? On performe bien dessus." },
  { from: 'agent', text: "Compris. Je remplace 3 carousels par 3 vidéos shorts. Je prends sur les tournages de mardi pour la matière. Tu valides ?" },
];

const Composer = () => {
  const [messages, setMessages] = React.useState(seedMessages);
  const [text, setText] = React.useState('');
  const [thinking, setThinking] = React.useState(false);
  const endRef = React.useRef(null);

  React.useEffect(() => {
    if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = () => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'user', text }]);
    setText('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(m => [...m, { from: 'agent', text: "Bien noté. Je m'occupe de ça maintenant. Je te ping quand c'est prêt." }]);
    }, 1400);
  };

  return (
    <Card padding={0} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: 540 }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(10,10,10,0.06)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <GhostMark color="#FF2D87" size={32} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 14, color: '#0A0A0A' }}>Agent Social Manager</div>
          <div style={{ fontFamily: 'Geist', fontSize: 12, color: '#9B9B9B', display: 'flex', alignItems: 'center', gap: 6 }}>
            <StatusDot status="running" /> En train de réfléchir · Marie pilote
          </div>
        </div>
        <button style={{
          background: 'transparent', border: '1px solid rgba(10,10,10,0.1)',
          borderRadius: 9999, padding: '6px 10px',
          fontFamily: 'JetBrains Mono', fontSize: 11, color: '#0A0A0A',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>Voir l'agent →</button>
      </div>

      {/* Messages */}
      <div ref={endRef} style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%',
              background: m.from === 'user' ? '#0A0A0A' : '#F2EDFF',
              color: m.from === 'user' ? '#fff' : '#0A0A0A',
              padding: '12px 16px',
              borderRadius: 18,
              borderTopLeftRadius: m.from === 'agent' ? 6 : 18,
              borderTopRightRadius: m.from === 'user' ? 6 : 18,
              fontFamily: 'Geist', fontSize: 14, lineHeight: 1.45,
              textWrap: 'pretty',
            }}>{m.text}</div>
          </div>
        ))}
        {thinking && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '12px 16px', borderRadius: 18, borderTopLeftRadius: 6,
              background: '#F2EDFF', display: 'flex', gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: 9999, background: '#6E3CFF',
                  animation: `bounce 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggested chips */}
      <div style={{
        padding: '0 18px 12px', display: 'flex', gap: 6, flexWrap: 'wrap',
      }}>
        {['Valide tout', 'Pousse les vidéos shorts', 'Plus de collabs', 'Pause cette semaine'].map(s => (
          <button key={s} style={{
            background: 'rgba(10,10,10,0.04)',
            border: 'none',
            borderRadius: 9999,
            padding: '6px 12px',
            fontFamily: 'Geist', fontSize: 12, color: '#0A0A0A',
            cursor: 'pointer',
          }}>{s}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        padding: 14,
        borderTop: '1px solid rgba(10,10,10,0.06)',
        background: '#F7F6F2',
      }}>
        <div style={{
          background: '#fff', borderRadius: 16,
          border: '1px solid rgba(10,10,10,0.08)',
          padding: '4px 4px 4px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 1px 0 0 rgba(10,10,10,0.04)',
        }}>
          <Icon name="paperclip" size={16} color="#9B9B9B" />
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Dis ce que tu veux à ton agent…"
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontFamily: 'Geist', fontSize: 14, color: '#0A0A0A',
              padding: '10px 0', background: 'transparent',
            }}
          />
          <Icon name="mic" size={16} color="#9B9B9B" />
          <button onClick={send} style={{
            background: '#6E3CFF', color: '#fff', border: 'none',
            width: 34, height: 34, borderRadius: 9999, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="arrow" size={15} color="#fff" stroke={2.2} />
          </button>
        </div>
      </div>
    </Card>
  );
};

window.Composer = Composer;
