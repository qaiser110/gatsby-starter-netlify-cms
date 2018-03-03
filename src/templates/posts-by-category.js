import React from 'react';
import Helmet from 'react-helmet';
import PostListing from '../components/PostListing';
import config from '../../data/SiteConfig';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pathContext.category;
    return (
      <section className="section">
        <Helmet
          title={`Posts in category "${capitalize(category)}" | ${
            config.siteTitle
          }`}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              Category: <i>{capitalize(category)}</i>
            </h1>
          </div>
          {this.props.data.allMarkdownRemark.edges.map(({ node }) => (
            <PostListing key={node.id} post={node} />
          ))}
        </div>
      </section>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            category
            path
            date
          }
        }
      }
    }
  }
`;
