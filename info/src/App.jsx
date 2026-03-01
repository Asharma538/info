import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Posts from './pages/Posts'
import './App.css'

function App() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch('/info.json')
      .then((r) => r.json())
      .then(setInfo)
  }, [])

  if (!info) return null

  return (
    <Routes>
      <Route path="/" element={<Welcome info={info} />} />
      <Route path="/posts" element={<Posts posts={info.posts} />} />
    </Routes>
  )
}

export default App
