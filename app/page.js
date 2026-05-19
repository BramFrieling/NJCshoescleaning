'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import MarqueeBar from '@/components/Marquee/MarqueeBar'
import KitSection from '@/components/KitSection/KitSection'
import ShopSection from '@/components/Shop/ShopSection'
import TrustBar from '@/components/TrustBar/TrustBar'
import Reviews from '@/components/Reviews/Reviews'
import Newsletter from '@/components/Newsletter/Newsletter'
import Footer from '@/components/Footer/Footer'
import CartPanel from '@/components/Cart/CartPanel'
import Cursor from '@/components/Cursor/Cursor'
import Toast from '@/components/Toast/Toast'

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const shopRef = useRef(null)

  const scrollToShop = () => {
    shopRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Cursor />
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <Hero onShopClick={scrollToShop} />
        <MarqueeBar />
        <KitSection />
        <div ref={shopRef}>
          <ShopSection />
        </div>
        <TrustBar />
        <Reviews />
        <Newsletter />
      </main>
      <Footer />
      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast />
    </>
  )
}
