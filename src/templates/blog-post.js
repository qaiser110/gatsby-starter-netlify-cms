import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Content, { HTMLContent } from '../components/Content'
import { categories } from '../../data'
import PostTags from '../components/PostTags'
import SEO from '../components/SEO'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import './blog-post.sass'

export const BlogPostTemplate = ({
  post,
  imageSharp,
  contentComponent,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const { path, title, description, cover, category, tags } = post.frontmatter
  const smallImage = imageSharp.sizes.srcSet.split(' ')[0]
  return (
    <section className="section">
      {helmet || ''}
      <SEO postSEO postPath={path} postNode={post} coverImage={smallImage} />
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
            <Img sizes={imageSharp.sizes} alt={`Image for "${title}"`} />
            <p>{description}</p>
            <PostContent content={post.html} />
            <SocialLinks postPath={path} postNode={post} />
            <br />
            <PostTags tags={tags} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post, imageSharp } = data

  return (
    <BlogPostTemplate
      imageSharp={imageSharp}
      post={post}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $cover: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        cover
        category
        tags
        hashtags
        description
      }
    }
    imageSharp(id: { regex: $cover }) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes_noBase64
      }
    }
  }
`
