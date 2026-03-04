import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function Welcome({ info }) {
  const canvasRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const initBackground = async () => {
      try {
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.8/build/backgrounds/spheres2.cdn.min.js')
        const Spheres2Background = module.default

        if (cancelled || !canvasRef.current) return

        const bg = Spheres2Background(canvasRef.current, {
          count: 200,
          colors: [0xff0000, 0x0, 0xffffff],
          minSize: 0.5,
          maxSize: 1
        })
        bgRef.current = bg
      } catch (error) {
        console.error('Failed to load spheres background:', error)
      }
    }

    initBackground()

    // On mobile/touch devices, map touch events to mousemove so the
    // library's internal mouse-tracking still works.
    const isTouchDevice = () => window.innerWidth <= 1024

    const handleTouch = (e) => {
      if (!isTouchDevice() || !canvasRef.current) return
      const touch = e.touches[0]
      if (!touch) return

      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true
      })
      canvasRef.current.dispatchEvent(mouseEvent)
    }

    // Use non-passive listener on the canvas to prevent default touch
    // behavior (scrolling) so touchmove fires continuously while dragging.
    const preventAndHandle = (e) => {
      if (!isTouchDevice()) return
      e.preventDefault()
      handleTouch(e)
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('touchstart', preventAndHandle, { passive: false })
      canvas.addEventListener('touchmove', preventAndHandle, { passive: false })
    }
    document.addEventListener('touchmove', handleTouch, { passive: true })
    document.addEventListener('touchstart', handleTouch, { passive: true })

    return () => {
      cancelled = true
      if (canvas) {
        canvas.removeEventListener('touchstart', preventAndHandle)
        canvas.removeEventListener('touchmove', preventAndHandle)
      }
      document.removeEventListener('touchmove', handleTouch)
      document.removeEventListener('touchstart', handleTouch)
      if (bgRef.current && bgRef.current.dispose) {
        bgRef.current.dispose()
        bgRef.current = null
      }
    }
  }, [])

  const handleColorsClick = () => {
    if (bgRef.current) {
      bgRef.current.spheres.setColors([
        0xffffff * Math.random(),
        0xffffff * Math.random(),
        0xffffff * Math.random()
      ])
      bgRef.current.spheres.light1.color.set(0xffffff * Math.random())
    }
  }

  return (
    <div className="welcome-app">
      <div className="hero">
        <h1>Anadi Sharma</h1>
        <h2>Asharma538</h2>
      </div>
      <div className="buttons">
        <Link to="/posts">
          View my posts
        </Link>
        <a href="https://asharma.tech" target="_blank" rel="noopener noreferrer">
          Portfolio
        </a>
      </div>
      <canvas ref={canvasRef} id="webgl-canvas"></canvas>
    </div>
  )
}
