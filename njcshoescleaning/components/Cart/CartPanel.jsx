'use client'

import { useEffect, useRef } from 'react'
import { useCart } from '@/contexts/CartContext'
import { lockScroll, unlockScroll } from '@/lib/scrollLock'
import CartItem from './CartItem'
import styles from './Cart.module.css'

const FREE_SHIPPING_THRESHOLD = 50

export default function CartPanel({ open, onClose }) {
  const { items, subtotal, freeShipping } = useCart()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    lockScroll()
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [open, onClose])

  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.panelOpen : ''}`}
        aria-label="Winkelwagen"
      >
        <div className={styles.panelHeader}>
          <h2>Winkelwagen</h2>
          <button onClick={onClose} aria-label="Sluiten" className={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* Free shipping progress */}
        <div className={styles.shippingBar}>
          <div className={styles.shippingProgress} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.shippingLabel}>
          {freeShipping
            ? '✓ Gratis verzending!'
            : `Nog €${remaining.toFixed(2).replace('.', ',')} voor gratis verzending`}
        </p>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <p>Je winkelwagen is leeg.</p>
              <button onClick={onClose} className={styles.shopNowBtn}>
                Shop nu
              </button>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.panelFooter}>
            <div className={styles.subtotalRow}>
              <span>Subtotaal</span>
              <span>€{subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={styles.subtotalRow} style={{ fontSize: '0.8rem', opacity: 0.5 }}>
              <span>Verzending</span>
              <span>{freeShipping ? 'Gratis' : '€4,95'}</span>
            </div>
            <a href="/checkout" className={styles.checkoutBtn}>
              Afrekenen →
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
