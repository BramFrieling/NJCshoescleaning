import styles from './TrustBar.module.css'

const TRUST_ITEMS = [
  { icon: '🚚', label: 'Gratis verzending', sub: 'Vanaf €50' },
  { icon: '⭐', label: '4.9 / 5 sterren', sub: 'Op basis van 200+ reviews' },
  { icon: '🔄', label: '30 dagen retour', sub: 'Geen vragen gesteld' },
  { icon: '🔒', label: 'Veilig betalen', sub: 'iDeal, Klarna, Creditcard' },
]

export default function TrustBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.grid}>
        {TRUST_ITEMS.map((t) => (
          <div key={t.label} className={styles.item}>
            <div className={styles.icon}>{t.icon}</div>
            <p className={styles.label}>{t.label}</p>
            <p className={styles.sub}>{t.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
