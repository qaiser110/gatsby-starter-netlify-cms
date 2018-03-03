import React from 'react'
import Link from 'gatsby-link'
import { categories } from '../../data'

const CatLink = ({ category }) => (
  <small className="cat-link">
    {' in '}
    <Link to={`/categories/${category}`}>{categories[category]}</Link>
  </small>
)

export default ({ post, showCat }) => (
  <div
    className="content"
    style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
  >
    <p>
      <Link className="has-text-primary" to={post.frontmatter.path}>
        {post.frontmatter.title}
      </Link>
      <span> &bull; </span>
      <small>{post.frontmatter.date}</small>
      {showCat && <CatLink category={post.frontmatter.category} />}
    </p>
    <p>
      {post.excerpt}
      <br />
      <br />
      <Link className="button is-small" to={post.frontmatter.path}>
        Keep Reading →
      </Link>
    </p>
  </div>
)
