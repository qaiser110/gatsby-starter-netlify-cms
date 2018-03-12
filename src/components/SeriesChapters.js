import React from 'react'
import Link from 'gatsby-link'

export default ({ series, chapters }) => (
  <div className="chapters-container">
    <Link style={{ textDecoration: 'none' }} to={`${series.path}`}>
      <li>
        <h2>{series.title}</h2>
      </li>
    </Link>
    {series.chapters.map((chap, key) => (
      <Link
        key={key}
        style={{ textDecoration: 'none' }}
        to={`${chapters[chap].path}`}
      >
        <li>
          <h6>
            {key}. {chapters[chap].title}
          </h6>
        </li>
      </Link>
    ))}
  </div>
)
