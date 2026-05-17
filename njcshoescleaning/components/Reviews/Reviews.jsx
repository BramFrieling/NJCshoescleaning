const REVIEWS = [
  {
    name: 'Daan V.',
    stars: 5,
    text: 'Mijn Jordans zijn nog nooit zo schoon geweest. De Pro Kit is elke cent waard.',
    kit: 'Pro Kit',
  },
  {
    name: 'Sophie M.',
    stars: 5,
    text: 'Super snelle levering en de kwaliteit overtreft mijn verwachtingen. Starter Kit is perfect om mee te beginnen!',
    kit: 'Starter Kit',
  },
  {
    name: 'Ruben K.',
    stars: 5,
    text: 'De foam is ongelofelijk effectief op leer. Mijn sneakers zien er weer als nieuw uit.',
    kit: 'Pro Kit',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" style={{ padding: '100px 40px', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, fontWeight: 500 }}>
          Reviews
        </span>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--white)' }}>
          Wat klanten zeggen
        </h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '28px 24px',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <div style={{ marginBottom: 12, color: '#f5c518', fontSize: '0.9rem', letterSpacing: 2 }}>
              {'★'.repeat(r.stars)}
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, opacity: 0.75, marginBottom: 20 }}>
              &ldquo;{r.text}&rdquo;
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{r.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 500 }}>
                {r.kit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
