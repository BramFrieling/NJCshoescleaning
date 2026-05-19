export const PRODUCTS = [
  {
    id: 'starter-kit',
    slug: 'starter-kit',
    name: 'Starter Kit',
    price: 24.95,
    tagline: 'Alles wat je nodig hebt om te starten.',
    description:
      'De ideale introductie tot premium schoenenverzorging. Geschikt voor sneakers, suède en canvas.',
    items: [
      'Suede Foam Cleaner 100ml',
      'Cleaning Brush',
      'Houten Borstel',
      'Instructiekaart',
    ],
    details: [
      { label: 'Inhoud', value: '4 producten' },
      { label: 'Foam volume', value: '100 ml' },
      { label: 'Geschikt voor', value: 'Sneakers, Suède, Canvas' },
      { label: 'Levertijd', value: '1-2 werkdagen' },
    ],
    badge: null,
    color: '#1a3bbd',
  },
  {
    id: 'pro-kit',
    slug: 'pro-kit',
    name: 'Pro Kit',
    price: 49.95,
    tagline: 'Professionele verzorging voor de echte sneakerhead.',
    description:
      'Het complete pakket voor maximale bescherming en reiniging van al jouw schoenen.',
    items: [
      'Suede Foam Cleaner 200ml',
      'Cleaning Brush',
      'Zachte Houten Borstel',
      'Stevige Houten Borstel',
      'Suede Eraser Block',
      'Luxe Geschenkdoos',
    ],
    details: [
      { label: 'Inhoud', value: '6 producten' },
      { label: 'Foam volume', value: '200 ml' },
      { label: 'Geschikt voor', value: 'Alle materialen' },
      { label: 'Levertijd', value: '1-2 werkdagen' },
    ],
    badge: 'Bestseller',
    color: '#4aadd6',
  },
]

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null
}
