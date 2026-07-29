import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PostPage from './pages/PostPage'
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
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/posts" element={<Posts interviews={info.interviews} />} />
      <Route path="/posts/:category/:postIndex" element={<PostPage interviews={info.interviews} />} />
    </Routes>
  )
}

export default App
