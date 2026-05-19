import LogoImage from '@/components/Logo/LogoImage'
import styles from './Footer.module.css'

const SOCIALS = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.79a8.17 8.17 0 004.78 1.52V6.87a4.85 4.85 0 01-1.01-.18z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
]

const PAYMENT_METHODS = [
  { name: 'iDEAL',      bg: '#CC0066', fg: '#ffffff' },
  { name: 'Mastercard', bg: '#1A1F36', fg: '#F79E1B' },
  { name: 'VISA',       bg: '#1434CB', fg: '#ffffff' },
  { name: 'Klarna',     bg: '#FFB3C7', fg: '#1A1A1A' },
  { name: 'PayPal',     bg: '#003087', fg: '#009CDE' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brandLogo}>
            <LogoImage width={72} height={48} />
          </div>
          <p className={styles.brandSub}>
            Premium schoenenverzorging.<br />Dutch quality.
          </p>
        </div>

        <div>
          <h4 className={styles.colTitle}>Shop</h4>
          <ul className={styles.links}>
            {['Starter Kit', 'Pro Kit', 'Alle producten'].map((l) => (
              <li key={l}><a href="#shop">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Info</h4>
          <ul className={styles.links}>
            {['Verzending & retour', 'Privacybeleid', 'Algemene voorwaarden', 'Contact'].map((l) => (
              <li key={l}><a href="#">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={styles.colTitle}>Volg ons</h4>
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} NJC Shoes Cleaning. Alle rechten voorbehouden.
        </p>
        <div className={styles.payments}>
          {PAYMENT_METHODS.map((p) => (
            <span
              key={p.name}
              aria-label={p.name}
              className={styles.payBadge}
              style={{ background: p.bg, color: p.fg }}
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
