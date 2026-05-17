'use client'

import { useEffect } from 'react'
import styles from './Shop.module.css'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Sluiten">
          ✕
        </button>

        <div className={styles.modalHeader}>
          <h2>{product.name}</h2>
          <p className={styles.modalPrice}>€{product.price.toFixed(2).replace('.', ',')}</p>
        </div>

        <p className={styles.modalDesc}>{product.description}</p>

        <div className={styles.modalSection}>
          <h3>Inhoud van de kit</h3>
          <ul className={styles.itemsList}>
            {product.items.map((item) => (
              <li key={item}>
                <span className={styles.checkmark}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.modalSection}>
          <h3>Details</h3>
          <dl className={styles.detailGrid}>
            {product.details.map((d) => (
              <>
                <dt key={`dt-${d.label}`}>{d.label}</dt>
                <dd key={`dd-${d.label}`}>{d.value}</dd>
              </>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
