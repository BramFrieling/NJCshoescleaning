'use client'

import { useEffect, useRef } from 'react'

// Canvas-based background removal — samples corner pixels for bg color,
// then removes pixels within threshold distance (with fade zone).
export default function LogoImage({ width = 120, height = 60, className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = new Image()
    const draw = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const { data, width: W, height: H } = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)

      // Sample 10 corner pixels to get background color
      const corners = [
        [0, 0], [4, 0], [W - 1, 0], [W - 5, 0],
        [0, H - 1], [4, H - 1], [W - 1, H - 1], [W - 5, H - 1],
        [Math.floor(W / 2), 0], [Math.floor(W / 2), H - 1],
      ]
      let rSum = 0, gSum = 0, bSum = 0
      corners.forEach(([x, y]) => {
        const i = (y * W + x) * 4
        rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2]
      })
      const bgR = rSum / corners.length
      const bgG = gSum / corners.length
      const bgB = bSum / corners.length

      const T = 55, F = 40
      const imgData = ctx.getImageData(0, 0, W, H)
      const d = imgData.data
      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - bgR, dg = d[i + 1] - bgG, db = d[i + 2] - bgB
        const dist = Math.sqrt(dr * dr + dg * dg + db * db)
        if (dist < T) {
          d[i + 3] = 0
        } else if (dist < T + F) {
          d[i + 3] = Math.round(((dist - T) / F) * 255)
        }
      }
      ctx.putImageData(imgData, 0, 0)
    }

    // Register the handler before setting src, and cover the case where the
    // image is already cached (decode resolves before onload would attach).
    img.onload = draw
    img.src = '/images/njclogo.png'
    if (img.complete && img.naturalWidth > 0) draw()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, imageRendering: 'auto', display: 'block' }}
      className={className}
    />
  )
}
