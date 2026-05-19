let lockCount = 0
let savedY = 0

export function lockScroll() {
  if (typeof window === 'undefined') return
  if (lockCount === 0) {
    savedY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${savedY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
  }
  lockCount++
}

export function unlockScroll() {
  if (typeof window === 'undefined' || lockCount === 0) return
  lockCount--
  if (lockCount === 0) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
    window.scrollTo(0, savedY)
  }
}
