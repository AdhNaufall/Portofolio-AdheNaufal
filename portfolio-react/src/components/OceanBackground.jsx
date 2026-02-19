import { useEffect, useRef } from 'react'

// Wave layers: back (lighter/slower) → front (darker/faster)
const WAVE_LAYERS = [
  { speed: 0.004, amplitude: 55, waveLen: 0.006, yRatio: 0.58, phase: 0,           fill: ['rgba(186,230,253,0.35)', 'rgba(147,210,252,0.25)'] },
  { speed: 0.006, amplitude: 48, waveLen: 0.008, yRatio: 0.63, phase: 1.2,         fill: ['rgba(125,211,252,0.45)', 'rgba(56,189,248,0.30)'] },
  { speed: 0.009, amplitude: 42, waveLen: 0.009, yRatio: 0.68, phase: 2.4,         fill: ['rgba(56,189,248,0.55)',  'rgba(14,165,233,0.38)'] },
  { speed: 0.012, amplitude: 36, waveLen: 0.011, yRatio: 0.73, phase: 0.8,         fill: ['rgba(14,165,233,0.65)',  'rgba(2,132,199,0.48)'] },
  { speed: 0.015, amplitude: 28, waveLen: 0.014, yRatio: 0.78, phase: 3.5,         fill: ['rgba(2,132,199,0.72)',   'rgba(3,105,161,0.55)'] },
  { speed: 0.019, amplitude: 22, waveLen: 0.017, yRatio: 0.83, phase: 1.8,         fill: ['rgba(3,105,161,0.80)',   'rgba(2,89,135,0.65)'] },
]

export default function OceanBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    // Foam sparkles
    const sparkles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      speedY: Math.random() * 0.3 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      reset() {
        this.x = Math.random()
        this.y = 0.5 + Math.random() * 0.5
        this.opacity = Math.random() * 0.6 + 0.2
      },
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawBackground(W, H) {
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0,    '#dbeafe')   // sky top
      grad.addColorStop(0.30, '#bae6fd')   // horizon haze
      grad.addColorStop(0.55, '#7dd3fc')   // ocean surface
      grad.addColorStop(0.80, '#0ea5e9')   // deep water
      grad.addColorStop(1,    '#0369a1')   // sea floor
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)
    }

    function drawSunGlare(W, H) {
      // Subtle light shimmer on water surface (upper-middle)
      const gx = W * 0.5, gy = H * 0.38
      const glare = ctx.createRadialGradient(gx, gy, 0, gx, gy, W * 0.55)
      glare.addColorStop(0,   'rgba(255,255,255,0.18)')
      glare.addColorStop(0.4, 'rgba(255,255,255,0.06)')
      glare.addColorStop(1,   'rgba(255,255,255,0)')
      ctx.fillStyle = glare
      ctx.fillRect(0, 0, W, H)
    }

    function drawWave(layer, W, H, t) {
      const baseY = H * layer.yRatio

      ctx.beginPath()
      ctx.moveTo(-5, H + 5)

      for (let x = -5; x <= W + 5; x += 2) {
        // Two sine waves combined for natural look
        const y = baseY
          + Math.sin(x * layer.waveLen + t * layer.speed + layer.phase) * layer.amplitude
          + Math.sin(x * layer.waveLen * 1.7 - t * layer.speed * 0.6 + layer.phase * 1.3) * layer.amplitude * 0.35
          + Math.sin(x * layer.waveLen * 0.4 + t * layer.speed * 0.4) * layer.amplitude * 0.2
        ctx.lineTo(x, y)
      }

      ctx.lineTo(W + 5, H + 5)
      ctx.closePath()

      const fillGrad = ctx.createLinearGradient(0, baseY - layer.amplitude, 0, H)
      fillGrad.addColorStop(0, layer.fill[0])
      fillGrad.addColorStop(1, layer.fill[1])
      ctx.fillStyle = fillGrad
      ctx.fill()
    }

    function drawFoamCrests(layer, W, H, t) {
      // Draw small white highlights at wave crests
      ctx.save()
      ctx.globalAlpha = 0.25
      const baseY = H * layer.yRatio
      for (let x = 0; x < W; x += 60) {
        const y = baseY
          + Math.sin(x * layer.waveLen + t * layer.speed + layer.phase) * layer.amplitude
          + Math.sin(x * layer.waveLen * 1.7 - t * layer.speed * 0.6 + layer.phase * 1.3) * layer.amplitude * 0.35
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 18)
        gradient.addColorStop(0, 'rgba(255,255,255,0.8)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.ellipse(x, y, 18, 6, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    function drawSparkles(W, H, t) {
      sparkles.forEach(s => {
        s.y -= s.speedY * 0.003
        s.x += s.speedX * 0.001
        if (s.y < 0.45) s.reset()
        if (s.x < 0) s.x = 1
        if (s.x > 1) s.x = 0

        const px = s.x * W
        const py = s.y * H
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.05 + s.phase || 0)

        ctx.save()
        ctx.globalAlpha = s.opacity * (0.5 + 0.5 * pulse)
        const g = ctx.createRadialGradient(px, py, 0, px, py, s.r * 2)
        g.addColorStop(0, 'rgba(255,255,255,0.9)')
        g.addColorStop(0.5, 'rgba(186,230,253,0.6)')
        g.addColorStop(1, 'rgba(56,189,248,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, s.r * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    function draw() {
      const W = canvas.width
      const H = canvas.height

      drawBackground(W, H)
      drawSunGlare(W, H)

      // Draw all wave layers back to front
      WAVE_LAYERS.forEach(layer => drawWave(layer, W, H, time))

      // Foam crests on top 3 waves
      drawFoamCrests(WAVE_LAYERS[2], W, H, time)
      drawFoamCrests(WAVE_LAYERS[3], W, H, time)
      drawFoamCrests(WAVE_LAYERS[4], W, H, time)

      drawSparkles(W, H, time)

      time++
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -2,
        pointerEvents: 'none',
      }}
    />
  )
}
