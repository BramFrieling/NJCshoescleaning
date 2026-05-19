import ProductCard from './ProductCard'
import { PRODUCTS } from '@/lib/products'
import styles from './Shop.module.css'

export default function ShopSection() {
  return (
    <section id="shop" className={styles.shopSection}>
      <div className={styles.shopHeader}>
        <span className={styles.shopEyebrow}>Onze kits</span>
        <h2 className={styles.shopTitle}>Kies jouw kit</h2>
        <p className={styles.shopSub}>
          Twee kits. Eén missie: perfecte schoenen.
        </p>
      </div>
      <div className={styles.grid}>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
