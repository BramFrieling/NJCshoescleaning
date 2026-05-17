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

const PAYMENT_ICONS = [
  {
    name: 'iDEAL',
    icon: (
      <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="3" fill="#CC0066"/>
        <text x="5" y="16" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#fff">iDEAL</text>
        <path d="M28 6h4a4 4 0 010 8h-4V6z" fill="#fff" opacity="0.9"/>
        <path d="M29 8h3a2 2 0 010 4h-3V8z" fill="#CC0066"/>
      </svg>
    ),
  },
  {
    name: 'Mastercard',
    icon: (
      <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="3" fill="#1A1F36"/>
        <circle cx="15" cy="12" r="7" fill="#EB001B"/>
        <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
        <path d="M19 6.8a7 7 0 010 10.4A7 7 0 0119 6.8z" fill="#FF5F00"/>
      </svg>
    ),
  },
  {
    name: 'Visa',
    icon: (
      <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="3" fill="#1434CB"/>
        <text x="7" y="16" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#fff" letterSpacing="-0.5">VISA</text>
      </svg>
    ),
  },
  {
    name: 'Klarna',
    icon: (
      <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="3" fill="#FFB3C7"/>
        <text x="7" y="16" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1A1A1A">klarna</text>
      </svg>
    ),
  },
  {
    name: 'PayPal',
    icon: (
      <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="38" height="24" rx="3" fill="#003087"/>
        <text x="5" y="15" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#009CDE">Pay</text>
        <text x="18" y="15" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#012169">Pal</text>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#050810',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '60px 40px 32px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          maxWidth: 960,
          margin: '0 auto 48px',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 900,
              fontSize: '1.5rem',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}
          >
            NJC
          </p>
          <p style={{ fontSize: '0.8rem', opacity: 0.4, lineHeight: 1.7 }}>
            Premium schoenenverzorging.<br />Dutch quality.
          </p>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.4,
              marginBottom: 16,
              fontWeight: 500,
              fontFamily: 'var(--font-body), sans-serif',
            }}
          >
            Shop
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Starter Kit', 'Pro Kit', 'Alle producten'].map((l) => (
              <li key={l}>
                <a href="#shop" style={{ fontSize: '0.85rem', opacity: 0.6, textDecoration: 'none', color: 'var(--white)', transition: 'opacity 0.2s' }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.4,
              marginBottom: 16,
              fontWeight: 500,
              fontFamily: 'var(--font-body), sans-serif',
            }}
          >
            Info
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['Verzending & retour', 'Privacybeleid', 'Algemene voorwaarden', 'Contact'].map((l) => (
              <li key={l}>
                <a href="#" style={{ fontSize: '0.85rem', opacity: 0.6, textDecoration: 'none', color: 'var(--white)' }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.4,
              marginBottom: 16,
              fontWeight: 500,
              fontFamily: 'var(--font-body), sans-serif',
            }}
          >
            Volg ons
          </h4>
          <div style={{ display: 'flex', gap: 16 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                style={{ color: 'var(--white)', opacity: 0.5, transition: 'opacity 0.2s' }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        <p style={{ fontSize: '0.75rem', opacity: 0.3 }}>
          © {new Date().getFullYear()} NJC Shoes Cleaning. Alle rechten voorbehouden.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {PAYMENT_ICONS.map((p) => (
            <span key={p.name} aria-label={p.name} style={{ display: 'flex', opacity: 0.75 }}>
              {p.icon}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
