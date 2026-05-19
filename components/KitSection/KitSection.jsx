'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './KitSection.module.css'

const KitCanvas = dynamic(() => import('./KitCanvas'), { ssr: false })

const TAGS = [
  {
    id: 'spray',
    num: 'Product 01',
    name: 'Suede Foam\nCleaner',
    desc: 'Krachtige foam formule speciaal voor suède en sneakers',
    side: 'left',
    top: '28%',
  },
  {
    id: 'brush',
    num: 'Product 02',
    name: 'Cleaning\nBrush',
    desc: 'Handgemaakt voor vlekkeloos resultaat zonder krassen',
    side: 'right',
    top: '28%',
  },
  {
    id: 'foam',
    num: 'Product 03',
    name: 'Houten\nBorstel',
    desc: 'Stevige natuurlijke haren voor dieptereiniging',
    side: 'left',
    top: '66%',
  },
  {
    id: 'cloth',
    num: 'Product 04',
    name: 'Suede Eraser\nBlock',
    desc: 'Verwijdert vlekken zonder water of chemicaliën',
    side: 'right',
    top: '66%',
  },
]

export default function KitSection() {
  const sectionRef = useRef(null)
  const [tagsVisible, setTagsVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [activeProduct, setActiveProduct] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = -rect.top
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? scrolled / total : 0

      if (window.innerWidth < 768) {
        setHeaderVisible(progress < 0.08)
        setActiveProduct(Math.min(Math.floor(progress * 4), 3))
      } else {
        setTagsVisible(progress > 0.78)
        setHeaderVisible(progress < 0.28)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className={styles.outer} id="kit3d">
      <div className={styles.sticky}>
        <KitCanvas sectionRef={sectionRef} />

        <div className={`${styles.header} ${headerVisible ? '' : styles.headerHidden}`}>
          <h2 className={styles.headerTitle}>Open de Kit</h2>
          <p className={styles.headerLabel}>Scroll om te ontdekken</p>
        </div>

        {/* Desktop product tags */}
        {TAGS.map((tag) => (
          <div
            key={tag.id}
            className={`${styles.ptag} ${styles[tag.side]} ${tagsVisible ? styles.ptagVisible : ''}`}
            style={{ top: tag.top }}
          >
            <p className={styles.ptagNum}>{tag.num}</p>
            <p className={styles.ptagName}>
              {tag.name.split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </p>
            <p className={styles.ptagDesc}>{tag.desc}</p>
          </div>
        ))}

        {/* Mobile product card */}
        <div className={styles.mobileCard}>
          {TAGS.map((tag, i) => (
            <div
              key={tag.id}
              className={`${styles.mobileCardItem} ${i === activeProduct ? styles.mobileCardActive : ''}`}
            >
              <p className={styles.mobileCardNum}>{tag.num}</p>
              <h3 className={styles.mobileCardName}>
                {tag.name.split('\n').map((line, j) => (
                  <span key={j}>{line}</span>
                ))}
              </h3>
              <p className={styles.mobileCardDesc}>{tag.desc}</p>
            </div>
          ))}
          <div className={styles.mobileDots}>
            {TAGS.map((_, i) => (
              <div
                key={i}
                className={`${styles.mobileDot} ${i === activeProduct ? styles.mobileDotActive : ''}`}
              />
            ))}
          </div>
        </div>

        <span className={styles.corner}>02 — De Kit</span>
      </div>
    </section>
  )
}
