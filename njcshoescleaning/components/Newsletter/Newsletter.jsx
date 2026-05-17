'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <section
      style={{
        padding: '80px 40px',
        background: 'var(--navy)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--white)', marginBottom: 12 }}>
        Blijf op de hoogte
      </h2>
      <p style={{ opacity: 0.6, marginBottom: 32, fontSize: '0.9rem' }}>
        Meld je aan voor exclusieve aanbiedingen en sneakertips.
      </p>

      {sent ? (
        <p style={{ color: 'var(--accent)', fontWeight: 600 }}>
          ✓ Bedankt! Je staat op de lijst.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', gap: 0, maxWidth: 420, margin: '0 auto' }}
        >
          <input
            type="email"
            placeholder="Jouw e-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--white)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--white)',
              color: 'var(--navy)',
              border: 'none',
              padding: '14px 24px',
              fontFamily: 'var(--font-heading), sans-serif',
              fontWeight: 900,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer',
            }}
          >
            Aanmelden
          </button>
        </form>
      )}
    </section>
  )
}
