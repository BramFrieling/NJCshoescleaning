const ITEMS = [
  'Gratis verzending vanaf €50',
  'Premium kwaliteit',
  'Made in NL',
  'Snelle levering',
  '100% tevredenheidsgarantie',
  'Gratis verzending vanaf €50',
  'Premium kwaliteit',
  'Made in NL',
  'Snelle levering',
  '100% tevredenheidsgarantie',
]

export default function MarqueeBar() {
  return (
    <div
      style={{
        background: 'var(--navy)',
        overflow: 'hidden',
        padding: '10px 0',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <span
            key={i}
            style={{
              padding: '0 32px',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: 'var(--white)',
              opacity: 0.85,
            }}
          >
            {item}
            <span style={{ marginLeft: 32, color: 'var(--accent)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
