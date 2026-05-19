import styles from './Reviews.module.css'

function StarRow({ count = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${count} sterren`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5c518" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

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
    <section id="reviews" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Reviews</span>
        <h2 className={styles.title}>Wat klanten zeggen</h2>
        <p className={styles.summary}>Meer dan 200 tevreden sneakerheads gingen je voor.</p>
      </div>
      <div className={styles.grid}>
        {REVIEWS.map((r) => (
          <div key={r.name} className={styles.card}>
            <StarRow count={r.stars} />
            <p className={styles.text}>&ldquo;{r.text}&rdquo;</p>
            <div className={styles.footer}>
              <span className={styles.name}>{r.name}</span>
              <span className={styles.kit}>{r.kit}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
