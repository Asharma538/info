import { Link } from 'react-router-dom'

const platformIcons = {
  Medium: '◉',
  LinkedIn: '■',
  Instagram: '◆',
  Blog: '○',
}

export default function Posts({ posts }) {
  return (
    <div className="posts-page">
      <header className="posts-header">
        <Link to="/" className="back-link">&larr; Back</Link>
        <h1>Posts</h1>
      </header>
      <ul className="posts-list">
        {posts.map((post, i) => (
          <li key={i} className="post-item">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <span className="post-platform" title={post.platform}>
                {platformIcons[post.platform] || '●'}
              </span>
              <span className="post-info">
                <span className="post-title">{post.title}</span>
                <span className="post-meta">
                  {post.platform}{post.date ? <> &middot; {post.date}</> : null}
                </span>
              </span>
              <span className="post-arrow">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
