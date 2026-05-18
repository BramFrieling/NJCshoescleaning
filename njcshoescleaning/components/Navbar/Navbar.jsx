'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useCart } from '@/contexts/CartContext'
import { lockScroll, unlockScroll } from '@/lib/scrollLock'
import styles from './Navbar.module.css'

const LogoImage = dynamic(() => import('@/components/Logo/LogoImage'), { ssr: false })

export default function Navbar({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const cartBtnRef = useRef(null)
  const prevItems = useRef(totalItems)

  useEffect(() => {
    if (totalItems > prevItems.current && cartBtnRef.current) {
      cartBtnRef.current.classList.remove('cart-bounce')
      void cartBtnRef.current.offsetWidth
      cartBtnRef.current.classList.add('cart-bounce')
    }
    prevItems.current = totalItems
  }, [totalItems])

  useEffect(() => {
    if (!menuOpen) return
    lockScroll()
    return () => { unlockScroll() }
  }, [menuOpen])

  const navLinks = [
    { label: 'Producten', href: '#shop' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Over ons', href: '#about' },
  ]

  return (
    <>
      <nav className={styles.nav}>
        <a href="#" className={styles.logo} aria-label="NJC Shoes Cleaning">
          <LogoImage width={130} height={65} />
        </a>

        <ul className={styles.links}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button
            ref={cartBtnRef}
            onClick={onCartOpen}
            className={styles.cartBtn}
            aria-label="Winkelwagen openen"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </button>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((l, i) => (
            <li key={l.href} style={{ '--i': i }}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
          <li style={{ '--i': navLinks.length }}>
            <button onClick={() => { setMenuOpen(false); onCartOpen() }}>
              Winkelwagen{totalItems > 0 ? ` (${totalItems})` : ''}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
