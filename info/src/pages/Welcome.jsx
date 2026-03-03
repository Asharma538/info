import { Link } from 'react-router-dom'
import { useMemo, useEffect, useState } from 'react'

function generateRects(count, viewW, viewH) {
  // Define the center exclusion zone (where welcome-content sits)
  const centerW = 520
  const centerH = 360
  const cx = viewW / 2
  const cy = viewH / 2
  const exclusion = {
    left: cx - centerW / 2 - 30,
    right: cx + centerW / 2 + 30,
    top: cy - centerH / 2 - 30,
    bottom: cy + centerH / 2 + 30,
  }

  const rects = []
  let attempts = 0

  while (rects.length < count && attempts < count * 40) {
    attempts++
    const size = 40 + Math.random() * 160 // 40–200px
    const x = Math.random() * (viewW - size)
    const y = Math.random() * (viewH - size)
    const rectRight = x + size
    const rectBottom = y + size

    // Skip if overlapping with the center content
    const overlapsCenter =
      rectRight > exclusion.left &&
      x < exclusion.right &&
      rectBottom > exclusion.top &&
      y < exclusion.bottom

    if (overlapsCenter) continue

    // Skip if overlapping with another rect (with padding)
    const pad = 20
    const overlapsOther = rects.some(
      (r) =>
        x < r.x + r.size + pad &&
        x + size + pad > r.x &&
        y < r.y + r.size + pad &&
        y + size + pad > r.y
    )

    if (overlapsOther) continue

    rects.push({
      x,
      y,
      size,
      duration: 8 + Math.random() * 14, // 8–22s
      delay: -(Math.random() * 10),     // stagger start
      borderRadius: 8 + size * 0.1,
      borderWidth: Math.max(2, Math.floor(size / 50) + 1),
      opacity: 0.12 + Math.random() * 0.18,
    })
  }

  return rects
}

export default function Welcome({ info }) {
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    const onResize = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const rects = useMemo(() => {
    // Fewer rects on small screens
    const count = dims.w < 480 ? 4 : dims.w < 768 ? 10 : 10
    return generateRects(count, dims.w, dims.h)
  }, [dims.w, dims.h])

  return (
    <div className="welcome">
      {rects.map((r, i) => (
        <div
          key={i}
          className="rotrect"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            borderRadius: r.borderRadius,
            borderWidth: r.borderWidth,
            opacity: r.opacity,
            animationDuration: `${r.duration}s`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}
      <div className="welcome-content">
        <h1 className="name">{info.name}</h1>
        {info.username && <p className="username">@{info.username}</p>}
        <p className="tagline">{info.tagline}</p>
        <p className="bio">{info.bio}</p>
        <div className="welcome-links">
          <Link to="/posts" className="enter-link">
            View my posts &rarr;
          </Link>
          <a href="https://asharma.tech" target="_blank" rel="noopener noreferrer" className="enter-link">
            Portfolio &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
