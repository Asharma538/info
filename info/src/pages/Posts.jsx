import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const activePosts = interviews[activeTab] || []

  return (
    <div className="posts-page">
      <header className="posts-header">
        <h1>My Experiences</h1>
      </header>

      <div className="posts-tabs" role="tablist" aria-label="Post category">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`posts-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="posts-sections">
        <section className="posts-section">
          <ul className="posts-list">
            {activePosts.map((interview, index) => {
              const tags = getTags(interview)
              return (
                <li key={`${interview.company}-${index}`} className="post-item">
                  <div className="post-info">
                    <Link to={`/posts/${activeTab}/${index}`} className="post-title">
                      <span className="post-title-chip">{interview.company}</span>
                      <span className="post-title-chip">{interview.role}</span>
                      <span className="post-title-chip">{interview.round}</span>
                      <span className="post-title-chip">{interview.date}</span>
                    </Link>
                    {interview.friendMention?.url ? (
                      <a href={interview.friendMention.url} target="_blank" rel="noopener noreferrer" className="post-mention">
                        Mentioned: {interview.friendMention.text || interview.friendMention.url}
                      </a>
                    ) : null}
                    <p className="post-desc post-desc-preview">{interview.desc}</p>
                    <span className="post-meta">Tags: {tags.length ? tags.join(', ') : 'None'}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
