'use client'

import { useRef, useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'
import ProductModal from './ProductModal'
import styles from './Shop.module.css'

export default function ProductCard({ product }) {
  const cardRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleAdd = () => {
    addToCart(product)
  }

  return (
    <>
      <article
        ref={cardRef}
        className={`${styles.card} ${revealed ? styles.cardRevealed : ''}`}
      >
        {product.badge && (
          <div className={styles.badge}>{product.badge}</div>
        )}

        <div className={styles.visual}>
          <div className={styles.box3d} style={{ '--clr': product.color }}>
            <div className={styles.boxFace} data-face="front" />
            <div className={styles.boxFace} data-face="back" />
            <div className={styles.boxFace} data-face="left" />
            <div className={styles.boxFace} data-face="right" />
            <div className={styles.boxFace} data-face="top" />
            <div className={styles.boxFace} data-face="bottom" />
          </div>
        </div>

        <div className={styles.info}>
          <h2 className={styles.productName}>{product.name}</h2>
          <p className={styles.tagline}>{product.tagline}</p>

          <ul className={styles.items}>
            {product.items.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
            {product.items.length > 3 && (
              <li className={styles.more}>+{product.items.length - 3} meer</li>
            )}
          </ul>

          <div className={styles.footer}>
            <span className={styles.price}>
              €{product.price.toFixed(2).replace('.', ',')}
            </span>
            <div className={styles.footerBtns}>
              <button
                className={styles.infoBtn}
                onClick={() => setModalOpen(true)}
              >
                Meer info
              </button>
              <button className={styles.addBtn} onClick={handleAdd}>
                Voeg toe
              </button>
            </div>
          </div>
        </div>
      </article>

      {modalOpen && (
        <ProductModal product={product} onClose={() => setModalOpen(false)} />
      )}
    </>
  )
}
