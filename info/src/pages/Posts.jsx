import { useMemo, useState } from 'react'

const tabs = [
  { key: 'iGave', label: 'I gave' },
  { key: 'iHeardAFriend', label: 'I heard a friend' },
]

export default function Posts({ interviews = {} }) {
  const [activeTab, setActiveTab] = useState('iGave')

  const activeInterviews = useMemo(() => interviews[activeTab] || [], [interviews, activeTab])

  return (
    <div className="posts-page">
      <header className="posts-header">
        <h1>Interview Experiences</h1>
      </header>

      <div className="posts-tabs" role="tablist" aria-label="Interview categories">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`posts-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="posts-list">
        {activeInterviews.map((interview, index) => (
          <li key={`${interview.company}-${index}`} className="post-item">
            <div className="post-info">
              <span className="post-title">{interview.company}</span>
              <span className="post-meta">Role: {interview.role} · Tag: {interview.tag}</span>
              <p className="post-desc">{interview.desc}</p>

              <div className="post-links-group">
                <span className="post-links-label">Document links:</span>
                {(interview.documentLinks || []).map((link) => (
                  <a key={`${link.text}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                ))}
              </div>

              <div className="post-links-group">
                <span className="post-links-label">Voice notes:</span>
                {(interview.voiceNotes || []).length ? (
                  (interview.voiceNotes || []).map((note) => (
                    <a key={`${note.text}-${note.url}`} href={note.url} target="_blank" rel="noopener noreferrer">
                      {note.text}
                    </a>
                  ))
                ) : (
                  <span className="post-empty">None yet</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
