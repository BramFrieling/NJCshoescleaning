import { Big_Shoulders, Outfit } from 'next/font/google'
import { CartProvider } from '@/contexts/CartContext'
import './globals.css'

const bigShoulders = Big_Shoulders({
  variable: '--font-big-shoulders',
  subsets: ['latin'],
  weight: '900',
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata = {
  title: 'NJC Shoes Cleaning — Premium Schoenenverzorging',
  description:
    'Premium Nederlandse schoenenverzorgingskits voor de echte sneakerhead.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="nl"
      className={`${bigShoulders.variable} ${outfit.variable}`}
    >
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
