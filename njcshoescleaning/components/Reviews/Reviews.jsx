import styles from './Reviews.module.css'

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
      </div>
      <div className={styles.grid}>
        {REVIEWS.map((r) => (
          <div key={r.name} className={styles.card}>
            <div className={styles.stars}>{'★'.repeat(r.stars)}</div>
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
