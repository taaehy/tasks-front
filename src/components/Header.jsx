export function Header() {
  return (
    <header style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '1.25rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(8,8,16,0.8)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 1px 0 rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
          animation: 'pulse 3s infinite',
        }}>
          ✓
        </div>
        <div>
          <h1 style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            letterSpacing: '-0.5px',
            color: '#fff',
          }}>
            Task<span style={{
              background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Manager</span>
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '1px' }}>
            Gerencie suas tarefas com eficiência
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          color: 'var(--success)',
          backgroundColor: 'rgba(34,197,94,0.08)',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(34,197,94,0.2)',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--success)',
            boxShadow: '0 0 6px var(--success)',
          }} />
          API Online
        </div>

        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          backgroundColor: 'rgba(255,255,255,0.04)',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          v1.0.0
        </div>
      </div>
    </header>
  );
}