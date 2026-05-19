'use client'

import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Blijf op de hoogte</h2>
      <p className={styles.sub}>
        Meld je aan voor exclusieve aanbiedingen en sneakertips.
      </p>

      {sent ? (
        <p className={styles.success}>✓ Bedankt! Je staat op de lijst.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Jouw e-mailadres"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.btn}>
            Aanmelden
          </button>
        </form>
      )}
    </section>
  )
}
