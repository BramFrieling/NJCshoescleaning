// Frees all GPU resources held by a Three.js scene + renderer.
// Without forceContextLoss(), dev HMR leaks WebGL contexts until the
// browser's ~16-context limit is hit and the GPU process crashes.

export function disposeScene(scene) {
  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : []
    for (const m of mats) {
      for (const key of Object.keys(m)) {
        const val = m[key]
        if (val && val.isTexture) val.dispose()
      }
      m.dispose()
    }
  })
}

export function disposeRenderer(renderer, el) {
  renderer.dispose()
  renderer.forceContextLoss()
  if (el && renderer.domElement && el.contains(renderer.domElement)) {
    el.removeChild(renderer.domElement)
  }
}
