'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const WORDS = ['SCHOON.', 'FRIS.', 'PREMIUM.', 'NJC.']

const STATS = [
  { num: '127+', label: 'Tevreden klanten' },
  { num: '4.9★', label: 'Gemiddelde score' },
  { num: '2', label: 'Premium kits' },
]

export default function Hero({ onShopClick }) {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.dotGrid} />

      <span className={styles.watermark} aria-hidden="true">NJC</span>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Premium Schoenenverzorging</p>
        <h1 className={styles.headline}>
          <span>Jouw schoenen,</span>
          <span className={`${styles.word} ${visible ? styles.wordIn : styles.wordOut}`}>
            {WORDS[wordIndex]}
          </span>
        </h1>
        <p className={styles.sub}>
          Nederlandse kwaliteitskits voor de echte sneakerhead.
        </p>
        <div className={styles.ctas}>
          <button onClick={onShopClick} className={styles.btnPrimary}>
            Shop nu
          </button>
          <a href="#reviews" className={styles.btnSecondary}>
            Lees reviews
          </a>
        </div>
      </div>

      <aside className={styles.stats} aria-label="Statistieken">
        {STATS.map((s) => (
          <div key={s.num} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </aside>

      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.bottomRule} />
    </section>
  )
}
