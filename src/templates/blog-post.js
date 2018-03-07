import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Content, { HTMLContent } from '../components/Content'
import { categories } from '../../data'
import PostTags from '../components/PostTags'
// import SEO from '../components/SEO'
import './blog-post.sass'

export const BlogPostTemplate = ({ post, contentComponent, helmet }) => {
  const PostContent = contentComponent || Content
  const { path, title, description, cover, category, tags } = post.frontmatter
  return (
    <section className="section">
      {helmet || ''}
      {/*<SEO postPath={path} postNode={post} postSEO />*/}
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
            <img src={cover} alt={`Image for "${title}"`} />
            <p>{description}</p>
            <PostContent content={post.html} />
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
      post={post}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
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
        cover
        category
        tags
        description
      }
    }
  }
`
