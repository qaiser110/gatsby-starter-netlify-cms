import React from 'react'
import Script from 'react-load-script'
import graphql from 'graphql'
import PostListing from '../components/PostListing'

export default class IndexPage extends React.Component {
  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={() => this.handleScriptLoad()}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>
          </div>
          {posts
            .filter(
              post =>
                post.node.frontmatter.templateKey === 'blog-post' &&
                post.node.frontmatter.series !== post.node.frontmatter.path
            )
            .map(({ node }, key) => (
              <PostListing key={key} post={node} showCat />
            ))}
        </div>
      </section>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            cover
            category
            tags
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
            series
            chapters
          }
        }
      }
    }
  }
`
