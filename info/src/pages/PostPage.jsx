import { Link, Navigate, useParams } from 'react-router-dom'

const tabLabels = {
  iGave: 'I gave',
  iHeardAFriend: 'I heard a friend',
}

function getTags(post) {
  if (Array.isArray(post?.tags)) return post.tags
  return post?.tag ? [post.tag] : []
}

export default function PostPage({ interviews = {} }) {
  const { category, postIndex } = useParams()
  const posts = interviews[category] || []
  const post = posts[Number(postIndex)]

  if (!post) {
    return <Navigate to="/posts" replace />
  }

  const tags = getTags(post)

  return (
    <div className="posts-page">
      <header className="posts-header">
        <Link to="/posts" className="back-link">
          ← Back
        </Link>
        <h1 className="post-title">
          <span className="post-title-chip">{post.company}</span>
          <span className="post-title-chip">{post.role}</span>
          <span className="post-title-chip">{post.round}</span>
          <span className="post-title-chip">{post.date}</span>
        </h1>
      </header>

      <p className="post-category">{tabLabels[category] || category}</p>
      {post.friendMention?.url ? (
        <p className="post-mention-line">
          Mentioned friend:{' '}
          <a href={post.friendMention.url} target="_blank" rel="noopener noreferrer" className="post-mention">
            {post.friendMention.text || post.friendMention.url}
          </a>
        </p>
      ) : null}
      <p className="post-desc">{post.desc}</p>

      <div className="post-tags">
        <span className="post-links-label">Tags:</span>
        {tags.length ? tags.map((tag) => <span key={tag}>{tag}</span>) : <span className="post-empty">None yet</span>}
      </div>

      <div className="post-links-group">
        <span className="post-links-label">Document links:</span>
        {(post.documentLinks || []).map((link) => (
          <a key={`${link.text}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ))}
      </div>

      <div className="post-links-group">
        <span className="post-links-label">Voice notes:</span>
        {(post.voiceNotes || []).length ? (
          (post.voiceNotes || []).map((note) => (
            <a key={`${note.text}-${note.url}`} href={note.url} target="_blank" rel="noopener noreferrer">
              {note.text}
            </a>
          ))
        ) : (
          <span className="post-empty">None yet</span>
        )}
      </div>
    </div>
  )
}
