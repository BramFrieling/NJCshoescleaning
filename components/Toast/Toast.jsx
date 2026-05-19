'use client'

import { useCart } from '@/contexts/CartContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toast } = useCart()

  return (
    <div className={`${styles.toast} ${toast ? styles.show : ''}`} role="status" aria-live="polite">
      <div className={styles.dot} />
      <span>{toast ? `${toast} toegevoegd!` : ''}</span>
    </div>
  )
}
