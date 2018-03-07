import React from 'react'
import Link from 'gatsby-link'

export default ({ tags }) => (
  <div className="post-tag-container">
    {tags &&
      tags.map(tag => (
        <Link key={tag} style={{ textDecoration: 'none' }} to={`/tags/${tag}`}>
          <button>{tag}</button>
        </Link>
      ))}
  </div>
)
