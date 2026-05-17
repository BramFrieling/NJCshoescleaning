const TRUST_ITEMS = [
  { icon: '🚚', label: 'Gratis verzending', sub: 'Vanaf €50' },
  { icon: '⭐', label: '4.9 / 5 sterren', sub: 'Op basis van 200+ reviews' },
  { icon: '🔄', label: '30 dagen retour', sub: 'Geen vragen gesteld' },
  { icon: '🔒', label: 'Veilig betalen', sub: 'iDeal, Klarna, Creditcard' },
]

export default function TrustBar() {
  return (
    <div
      style={{
        background: '#0d1120',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {TRUST_ITEMS.map((t) => (
          <div key={t.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{t.icon}</div>
            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--white)', marginBottom: 4 }}>
              {t.label}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
