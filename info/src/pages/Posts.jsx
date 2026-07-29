import { Link } from 'react-router-dom'

const tabs = [
  { key: 'iGave', label: 'I gave' },
  { key: 'iHeardAFriend', label: 'I heard a friend' },
]

function getTags(interview) {
  if (Array.isArray(interview?.tags)) return interview.tags
  return interview?.tag ? [interview.tag] : []
}

export default function Posts({ interviews = {} }) {
  return (
    <div className="posts-page">
      <header className="posts-header">
        <h1>Interview Experiences</h1>
      </header>

      <div className="posts-sections">
        {tabs.map((tab) => (
          <section key={tab.key} className="posts-section">
            <h2 className="posts-section-title">{tab.label}</h2>
            <ul className="posts-list">
              {(interviews[tab.key] || []).map((interview, index) => {
                const tags = getTags(interview)
                return (
                  <li key={`${interview.company}-${index}`} className="post-item">
                    <div className="post-info">
                      <Link to={`/posts/${tab.key}/${index}`} className="post-title">
                        {interview.company} | {interview.role} | {interview.round} | {interview.date}
                      </Link>
                      <p className="post-desc">{interview.desc}</p>
                      <span className="post-meta">Tags: {tags.length ? tags.join(', ') : 'None'}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
