import React from 'react'
import graphql from 'graphql'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Content, { HTMLContent } from '../components/Content'
import { categories } from '../../data'
import PostTags from '../components/PostTags'
import Chapters from '../components/SeriesChapters'
import SEO from '../components/SEO'
import UserInfo from '../components/UserInfo'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import './blog-post.sass'

export const BlogPostTemplate = ({
  post,
  series,
  chapters,
  imageSharp,
  contentComponent,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const { path, title, description, cover, category, tags } = post.frontmatter
  const smallImage = imageSharp.sizes.srcSet.split(' ')[0]
  const isSeries = series && series.chapters && series.chapters.length > 0
  return (
    <section className="section">
      {helmet || ''}
      <SEO postSEO postPath={path} postNode={post} coverImage={smallImage} />
      <div className="container content">
        <div className="columns">
          {isSeries && (
            <div className="column is-3">
              <Chapters series={series} chapters={chapters} />
            </div>
          )}
          <div className={`column ${isSeries ? 'is-9' : 'is-9 offset-3'}`}>
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
            <div className="post-meta">
              <SocialLinks postPath={path} postNode={post} />
              <br />
              <PostTags tags={tags} />
            </div>
            <UserInfo />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post, imageSharp, chapters } = data
  let chaps = {}
  let series = null
  if (chapters) {
    chapters.edges.forEach(
      ch =>
        ch.node.frontmatter.path === ch.node.frontmatter.series
          ? (series = ch.node.frontmatter)
          : (chaps[ch.node.frontmatter.path] = ch.node.frontmatter)
    )
  }
  return (
    <BlogPostTemplate
      imageSharp={imageSharp}
      post={post}
      series={series}
      chapters={chaps}
      contentComponent={HTMLContent}
      helmet={<Helmet title={`Blog | ${post.frontmatter.title}`} />}
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $cover: String!, $series: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        series
        chapters
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
    chapters: allMarkdownRemark(
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            series
            chapters
          }
        }
      }
    }
  }
`
