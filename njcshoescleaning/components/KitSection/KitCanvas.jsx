'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Prevent iOS resize recalcs when address bar hides/shows
ScrollTrigger.config({ ignoreMobileResize: true })

const isLowEnd =
  typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4

function mkLogoTex() {
  const cv = document.createElement('canvas')
  cv.width = 512; cv.height = 256
  const g = cv.getContext('2d')
  g.fillStyle = '#111c30'; g.fillRect(0, 0, 512, 256)
  g.fillStyle = '#ffffff'
  g.font = '900 105px Georgia,serif'
  g.textAlign = 'center'
  g.fillText('NJC', 256, 155)
  g.fillStyle = '#4aadd6'
  g.font = '500 17px Arial,sans-serif'
  g.fillText('SHOES CLEANING', 256, 192)
  return new THREE.CanvasTexture(cv)
}

function mkLbl(t, s) {
  const cv = document.createElement('canvas')
  cv.width = 256; cv.height = 128
  const g = cv.getContext('2d')
  g.fillStyle = '#fff'; g.fillRect(0, 0, 256, 128)
  g.fillStyle = '#07091a'
  g.font = 'bold 33px Georgia,serif'
  g.textAlign = 'center'
  g.fillText(t, 128, 54)
  if (s) {
    g.font = '500 14px Arial,sans-serif'
    g.fillStyle = '#1a3bbd'
    g.fillText(s, 128, 80)
  }
  return new THREE.CanvasTexture(cv)
}

function mkSpray(M) {
  const g = new THREE.Group()
  const bm = new THREE.MeshPhongMaterial({ color: 0x0e1628, specular: 0x4aadd6, shininess: 120 })
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.23, 1.1, isLowEnd ? 12 : 18), bm))
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.26, 0.21, isLowEnd ? 10 : 16), M.cap)
  cap.position.y = 0.66; g.add(cap)
  const nz = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.047, 0.4, 8), M.cap)
  nz.rotation.z = Math.PI / 2; nz.position.set(0.21, 0.8, 0); g.add(nz)
  const tr = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.28, 0.07), M.cap)
  tr.position.set(0.21, 0.6, 0); tr.rotation.z = 0.35; g.add(tr)
  const lb = new THREE.Mesh(
    new THREE.CylinderGeometry(0.263, 0.234, 0.52, isLowEnd ? 12 : 18, 1, true),
    new THREE.MeshPhongMaterial({ map: mkLbl('NJC', 'CLEANER'), shininess: 40 })
  )
  lb.position.y = -0.1; g.add(lb)
  return g
}

function mkBrush(M) {
  const g = new THREE.Group()
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.88, isLowEnd ? 8 : 12), M.brsh))
  const hd = new THREE.Mesh(
    new THREE.BoxGeometry(0.65, 0.17, 0.32),
    new THREE.MeshPhongMaterial({ color: 0x0e1628, specular: 0x4aadd6, shininess: 60 })
  )
  hd.position.y = -0.56; g.add(hd)
  if (!isLowEnd) {
    const bm2 = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 10 })
    for (let x = -2; x <= 2; x++) {
      for (let z = -1; z <= 1; z++) {
        const br = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.011, 0.22, 6), bm2)
        br.position.set(x * 0.11, -0.73, z * 0.09)
        g.add(br)
      }
    }
  }
  return g
}

function mkWoodBrush() {
  const g = new THREE.Group()
  const wood = new THREE.MeshPhongMaterial({ color: 0xc4783a, specular: 0xffd090, shininess: 55 })
  const darkWood = new THREE.MeshPhongMaterial({ color: 0x7a4a20, specular: 0xffddaa, shininess: 25 })
  const bristleMat = new THREE.MeshPhongMaterial({ color: 0x2e1a08, shininess: 4 })
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.20, 0.44), wood)
  g.add(body)
  const grain = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.012, 0.42), darkWood)
  grain.position.y = 0.106; g.add(grain)
  if (!isLowEnd) {
    for (let x = -2; x <= 2; x++) {
      for (let z = -1; z <= 1; z++) {
        const br = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.012, 0.22, 5), bristleMat)
        br.position.set(x * 0.12, -0.21, z * 0.12)
        g.add(br)
      }
    }
  } else {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.20, 0.32), bristleMat)
    pad.position.y = -0.19; g.add(pad)
  }
  return g
}

function mkEraser() {
  const g = new THREE.Group()
  const eraserMat = new THREE.MeshPhongMaterial({ color: 0xf0e4c8, specular: 0xffffff, shininess: 20 })
  const accentMat = new THREE.MeshPhongMaterial({ color: 0x4aadd6, specular: 0xffffff, shininess: 70 })
  const darkMat = new THREE.MeshPhongMaterial({ color: 0x07091a, specular: 0x4aadd6, shininess: 40 })
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.44, 0.22), eraserMat)
  g.add(block)
  const band = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.07, 0.24), accentMat)
  band.position.y = 0.185; g.add(band)
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.06, 0.24), darkMat)
  base.position.y = -0.19; g.add(base)
  const lb = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.28),
    new THREE.MeshPhongMaterial({ map: mkLbl('NJC', 'ERASER'), shininess: 20 })
  )
  lb.position.set(0, 0.02, 0.115); g.add(lb)
  return g
}

export default function KitCanvas({ sectionRef }) {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current || !sectionRef?.current) return

    const el = mountRef.current
    const W = el.clientWidth
    const H = el.clientHeight
    const isMob = W < 768

    const renderer = new THREE.WebGLRenderer({ antialias: !isLowEnd, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2))
    // Allow touch scroll to pass through the canvas on iOS Safari
    renderer.domElement.style.touchAction = 'pan-y'
    renderer.domElement.style.pointerEvents = 'none'
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    // ── MOBILE: sequential product showcase ─────────────────────────────────
    if (isMob) {
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
      camera.position.set(0, 0.1, 5.5)
      camera.lookAt(0, 0, 0)

      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const kl = new THREE.DirectionalLight(0xffffff, 1.3)
      kl.position.set(3, 6, 5); scene.add(kl)
      const fl = new THREE.DirectionalLight(0x4aadd6, 0.55)
      fl.position.set(-5, 1, 2); scene.add(fl)
      const rl = new THREE.DirectionalLight(0x6bbfe0, 0.2)
      rl.position.set(0, -3, -4); scene.add(rl)

      const M = {
        cap:  new THREE.MeshPhongMaterial({ color: 0x4aadd6, specular: 0xffffff, shininess: 240 }),
        brsh: new THREE.MeshPhongMaterial({ color: 0x0a0e1e, specular: 0x4aadd6, shininess: 55 }),
      }

      const prods = [mkSpray(M), mkBrush(M), mkWoodBrush(), mkEraser()]

      // Base tilts so products show their most interesting face
      const baseRots = [
        [0.12, 0, 0],        // spray — slight forward tilt
        [0.12, 0, 0],        // brush — slight forward tilt
        [0.55, 0, 0.06],     // wood brush — tilt back to show bristle face
        [0.2, 0.15, 0.05],   // eraser — angle showing face + thickness
      ]

      prods.forEach((p, i) => {
        p.scale.setScalar(0.001)
        p.rotation.set(baseRots[i][0], baseRots[i][1], baseRots[i][2])
        scene.add(p)
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        },
      })

      // Each product gets 25% of the scroll — scale in, spin 360°, scale out
      prods.forEach((p, i) => {
        const s = i * 0.25
        tl.to(p.scale, { x: 1, y: 1, z: 1, duration: 0.07, ease: 'back.out(2)' }, s + 0.01)
        tl.to(p.rotation, { y: baseRots[i][1] + Math.PI * 2, duration: 0.15, ease: 'power1.inOut' }, s + 0.06)
        if (i < 3) {
          tl.to(p.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.05, ease: 'back.in(2)' }, s + 0.21)
        }
      })

      let rafId
      const animate = (t) => {
        rafId = requestAnimationFrame(animate)
        const dt = t * 0.001
        const prog = tl.scrollTrigger?.progress ?? 0
        const ai = Math.min(Math.floor(prog * 4), 3)
        prods.forEach((p, i) => {
          if (i === ai && p.scale.x > 0.5) {
            p.position.y = Math.sin(dt * 0.9 + i) * 0.07
          }
        })
        renderer.render(scene, camera)
      }
      animate(0)

      const onResize = () => {
        const w = el.clientWidth, h = el.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      return () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', onResize)
        tl.kill()
        ScrollTrigger.getAll().forEach((st) => st.kill())
        renderer.dispose()
        if (el?.contains(renderer.domElement)) el.removeChild(renderer.domElement)
      }
    }

    // ── DESKTOP: box animation ───────────────────────────────────────────────
    renderer.shadowMap.enabled = !isLowEnd
    renderer.shadowMap.type = THREE.PCFShadowMap

    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100)
    camera.position.set(0, 1.4, 6.0)
    camera.lookAt(0, 0.7, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const kl = new THREE.DirectionalLight(0xffffff, 1.1)
    kl.position.set(4, 10, 6); kl.castShadow = !isLowEnd; scene.add(kl)
    const fl = new THREE.DirectionalLight(0x4aadd6, 0.35)
    fl.position.set(-5, 2, -2); scene.add(fl)
    const rl = new THREE.DirectionalLight(0x6bbfe0, 0.2)
    rl.position.set(0, -3, -5); scene.add(rl)

    const M = {
      base: new THREE.MeshPhongMaterial({ color: 0x07091a, specular: 0x4aadd6, shininess: 65 }),
      edge: new THREE.MeshPhongMaterial({ color: 0x111c30, specular: 0x88ccff, shininess: 110 }),
      cap:  new THREE.MeshPhongMaterial({ color: 0x4aadd6, specular: 0xffffff, shininess: 240 }),
      wht:  new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0x88ccff, shininess: 80 }),
      clth: new THREE.MeshPhongMaterial({ color: 0x2570a8, specular: 0x88ccff, shininess: 18 }),
      brsh: new THREE.MeshPhongMaterial({ color: 0x0a0e1e, specular: 0x4aadd6, shininess: 55 }),
    }

    const kit = new THREE.Group()
    kit.position.y = -0.6
    scene.add(kit)

    const boxGrp = new THREE.Group()
    kit.add(boxGrp)

    const boxBot = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.95, 2.6),
      [M.edge, M.edge, M.base, M.base, M.edge, M.edge]
    )
    boxBot.position.y = 0.475
    boxBot.castShadow = !isLowEnd
    boxGrp.add(boxBot)

    const interior = new THREE.Mesh(
      new THREE.BoxGeometry(3.82, 0.9, 2.5),
      new THREE.MeshPhongMaterial({ color: 0x040610, side: THREE.BackSide })
    )
    interior.position.y = 0.475
    boxGrp.add(interior)

    const lidGrp = new THREE.Group()
    lidGrp.position.set(0, 0.95, -1.3)
    boxGrp.add(lidGrp)

    const mLidTop = new THREE.MeshPhongMaterial({ map: mkLogoTex(), specular: 0x4aadd6, shininess: 45 })
    const lidMesh = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.09, 2.6),
      [M.edge, M.edge, mLidTop, M.base, M.edge, M.edge]
    )
    lidMesh.position.set(0, 0.045, 1.3)
    lidGrp.add(lidMesh)

    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(1.12, 0.034, 0.44),
      new THREE.MeshPhongMaterial({ color: 0x4aadd6, specular: 0xffffff, shininess: 290 })
    )
    strip.position.set(0, 0.12, 1.3)
    lidGrp.add(strip)

    ;[-1.78, 1.78].forEach((x) => {
      ;[-1.0, 1.0].forEach((z) => {
        const rv = new THREE.Mesh(
          new THREE.SphereGeometry(0.052, 8, 8),
          new THREE.MeshPhongMaterial({ color: 0x4aadd6, specular: 0xffffff, shininess: 300 })
        )
        rv.position.set(x, 0.115, z + 0.3)
        lidGrp.add(rv)
      })
    })

    lidGrp.add(new THREE.Mesh(new THREE.BoxGeometry(4.06, 0.065, 0.09), M.edge))

    const gRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.016, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x4aadd6, transparent: true, opacity: 0.18 })
    )
    gRing.rotation.x = -Math.PI / 2
    gRing.position.y = -0.05
    boxGrp.add(gRing)

    const sPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    )
    sPlane.rotation.x = -Math.PI / 2
    sPlane.receiveShadow = !isLowEnd
    scene.add(sPlane)

    const prods = [
      { m: mkSpray(M),     sP: [-0.75, 0.2,  0.1],  eP: [-2.2,  1.1, 0.7],  eR: [-0.18, 0.48, 0.1]  },
      { m: mkBrush(M),     sP: [0.4,   0.2,  0.2],  eP: [2.2,   1.1, 0.4],  eR: [0.28, -0.38, -0.18] },
      { m: mkWoodBrush(),  sP: [-0.18, 0.18, -0.3], eP: [-1.2,  1.3, 1.1],  eR: [0.5, -0.4, 0.1]    },
      { m: mkEraser(),     sP: [0.68,  0.15, -0.4], eP: [0.8,   1.4, 1.2],  eR: [-0.2, 0.7, 0.1]    },
    ]

    const displayPos = [[-2.4, 1.8, 0.1], [2.4, 1.8, 0.1], [-2.5, -0.25, 0.4], [2.5, -0.25, 0.4]]
    const displayRot = [
      [0, 0,   0],
      [0, 0,   0],
      [0.4, 0, 0],
      [0, 0,   0],
    ]

    prods.forEach((p) => {
      p.m.position.set(p.sP[0], p.sP[1], p.sP[2])
      p.m.scale.setScalar(0.001)
      kit.add(p.m)
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    tl.to(kit.position, { y: 0, duration: 0.15 }, 0)
    tl.to(kit.rotation, { y: 0.22, duration: 0.2 }, 0)
    tl.to(lidGrp.rotation, { x: -Math.PI * 0.87, duration: 0.28, ease: 'power2.out' }, 0.09)

    prods.forEach((p, i) => {
      const d = 0.34 + i * 0.09
      tl.to(p.m.scale, { x: 1, y: 1, z: 1, duration: 0.13 }, d)
      tl.to(p.m.position, { x: p.eP[0], y: p.eP[1], z: p.eP[2], duration: 0.22, ease: 'power2.out' }, d + 0.07)
      if (p.eR) tl.to(p.m.rotation, { x: p.eR[0], y: p.eR[1], z: p.eR[2], duration: 0.22 }, d + 0.07)
    })

    tl.to(kit.rotation, { y: -0.38, duration: 0.28 }, 0.46)
    tl.to(kit.rotation, { y: 0, x: 0, duration: 0.14 }, 0.64)
    tl.to(boxGrp.position, { y: -8, duration: 0.2, ease: 'power2.in' }, 0.65)

    prods.forEach((p, i) => {
      const [dx, dy, dz] = displayPos[i]
      const [rx, ry, rz] = displayRot[i]
      tl.to(p.m.position, { x: dx, y: dy, z: dz, duration: 0.22, ease: 'power2.inOut' }, 0.69)
      tl.to(p.m.rotation, { x: rx, z: rz, duration: 0.18, ease: 'power2.inOut' }, 0.69)
      tl.to(p.m.rotation, { y: ry + Math.PI * 2, duration: 0.16, ease: 'power2.inOut' }, 0.83)
    })

    let pmx = 0, pmy = 0
    const supportsHover = window.matchMedia('(hover:hover)').matches
    const onMouseMove = (e) => {
      pmx = (e.clientX / window.innerWidth - 0.5) * 0.1
      pmy = (e.clientY / window.innerHeight - 0.5) * 0.055
    }
    if (supportsHover) window.addEventListener('mousemove', onMouseMove)

    let rafId
    const animate = (t) => {
      rafId = requestAnimationFrame(animate)
      const dt = t * 0.001

      const prog = tl.scrollTrigger?.progress ?? 0
      prods.forEach((p, i) => {
        if (prog > 0.87) {
          p.m.position.y = displayPos[i][1] + Math.sin(dt * 1.1 + i * 1.3) * 0.007
        }
      })

      gRing.material.opacity = 0.08 + Math.sin(dt * 0.7) * 0.07
      gRing.scale.x = gRing.scale.z = 1 + Math.sin(dt * 0.38) * 0.022

      camera.position.x += (pmx - camera.position.x) * 0.04
      camera.position.y += (1.4 - pmy * 4 - camera.position.y) * 0.04
      camera.lookAt(0, 0.7, 0)

      renderer.render(scene, camera)
    }
    animate(0)

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      if (supportsHover) window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      renderer.dispose()
      if (el?.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [sectionRef])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
}
