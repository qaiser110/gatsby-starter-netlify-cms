import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import { categories } from '../../data'
import PostTags from '../components/PostTags'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  category,
  tags,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            in{' '}
            <Link className="cat-link" to={`/categories/${category}`}>
              {categories[category]}
            </Link>
            <br />
            <br />
            <p>{description}</p>
            <PostContent content={content} />
            <br />
            <PostTags tags={tags} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
      category={post.frontmatter.category}
      tags={post.frontmatter.tags}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        category
        tags
        description
      }
    }
  }
`
