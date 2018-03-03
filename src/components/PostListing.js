import React from 'react';
import Link from 'gatsby-link';

export default ({ post }) => (
  <div
    className="content"
    style={{ border: '1px solid #eaecee', padding: '2em 4em' }}
    key={post.id}
  >
    <p>
      <Link className="has-text-primary" to={post.frontmatter.path}>
        {post.frontmatter.title}
      </Link>
      <span> &bull; </span>
      <small>
        {post.frontmatter.date} in {' '}
        <Link
          className="cat-link"
          to={`categories/${post.frontmatter.category}`}
        >
          {post.frontmatter.category}
        </Link>
      </small>
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
);
