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

    return () => {
      cancelled = true
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
        <h1>Anadi</h1>
        <h2>Sharma</h2>
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
