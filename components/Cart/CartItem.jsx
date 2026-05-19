'use client'

import { useCart } from '@/contexts/CartContext'
import styles from './Cart.module.css'

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart()

  return (
    <div className={styles.item}>
      <div className={styles.itemBox} style={{ '--clr': item.color }} />

      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{item.name}</p>
        <p className={styles.itemPrice}>
          €{(item.price * item.qty).toFixed(2).replace('.', ',')}
        </p>
      </div>

      <div className={styles.qtyControl}>
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          aria-label="Min"
        >
          −
        </button>
        <span>{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          aria-label="Plus"
        >
          +
        </button>
      </div>

      <button
        className={styles.removeBtn}
        onClick={() => removeFromCart(item.id)}
        aria-label="Verwijder"
      >
        ✕
      </button>
    </div>
  )
}
