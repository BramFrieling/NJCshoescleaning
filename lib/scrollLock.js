// iOS Safari-safe scroll lock.
// body.position = 'fixed' breaks ALL position:fixed descendants — never use it.
// Instead: block touchmove events, which stops scrolling without touching CSS.

let savedY = 0
let locked = false

const prevent = (e) => { e.preventDefault() }

export function lockScroll() {
  if (typeof window === 'undefined' || locked) return
  locked = true
  savedY = window.scrollY
  document.addEventListener('touchmove', prevent, { passive: false })
  // Keyboard / wheel fallback for desktop
  document.body.style.overflow = 'hidden'
}

export function unlockScroll() {
  if (typeof window === 'undefined' || !locked) return
  locked = false
  document.removeEventListener('touchmove', prevent)
  document.body.style.overflow = ''
  window.scrollTo(0, savedY)
}
