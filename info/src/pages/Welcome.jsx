import { Link } from 'react-router-dom'

export default function Welcome({ info }) {
  return (
    <div className="welcome">
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
