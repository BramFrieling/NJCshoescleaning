'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { disposeScene, disposeRenderer } from '@/lib/three-cleanup'
import styles from './Hero.module.css'

const isLowEnd = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4

export default function ThreeScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    const W = mountRef.current.clientWidth
    const H = mountRef.current.clientHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // Box segments: reduced on low-end devices
    const segs = isLowEnd ? 1 : 2
    const boxGeo = new THREE.BoxGeometry(1.4, 1.8, 1.0, segs, segs, segs)
    const lidGeo = new THREE.BoxGeometry(1.4, 0.15, 1.0, segs, segs, segs)

    const mat = new THREE.MeshPhongMaterial({ color: 0x070a14, shininess: 80 })
    const accentMat = new THREE.MeshPhongMaterial({ color: 0x4aadd6, shininess: 120 })

    const box = new THREE.Mesh(boxGeo, mat)
    const lid = new THREE.Mesh(lidGeo, accentMat)
    lid.position.set(0, 0.975, 0)

    const group = new THREE.Group()
    group.add(box)
    group.add(lid)
    scene.add(group)

    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    const point = new THREE.PointLight(0x4aadd6, 2, 20)
    point.position.set(3, 4, 3)
    const fill = new THREE.DirectionalLight(0xffffff, 0.6)
    fill.position.set(-3, -1, 2)
    scene.add(ambient, point, fill)

    let frame
    let t = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (document.hidden) return
      t += 0.008
      group.rotation.y = t
      group.rotation.x = Math.sin(t * 0.5) * 0.15
      group.position.y = Math.sin(t * 0.7) * 0.1
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!mountRef.current) return
      const w = mountRef.current.clientWidth
      const h = mountRef.current.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    const mountEl = mountRef.current
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      disposeScene(scene)
      disposeRenderer(renderer, mountEl)
    }
  }, [])

  return <div ref={mountRef} className={styles.canvas} />
}
