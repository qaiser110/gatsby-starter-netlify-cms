const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const categoryPage = path.resolve("src/templates/posts-by-category.js");

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            id
            frontmatter {
              templateKey
              path
              date
              title
              category
              image
              heading
              description
              intro {
                blurbs {
                  image
                  text
                }
                heading
                description
              }
              main {
                heading
                description
                image1 {
                  alt
                  image
                }
                image2 {
                  alt
                  image
                }
                image3 {
                  alt
                  image
                }
              }
              testimonials {
                author
                quote
              }
              full_image
              pricing {
                heading
                description
                plans {
                  description
                  items
                  plan
                  price
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const categorySet = new Set();

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.category) {
        categorySet.add(node.frontmatter.category);
      }

      const pagePath = node.frontmatter.path;
      createPage({
        path: pagePath,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          path: pagePath
        }
      });
    });

    const categoryList = Array.from(categorySet);
    categoryList.forEach(category => {
      createPage({
        path: `/categories/${category}/`,
        component: categoryPage,
        context: {
          category
        }
      });
    });
  });
};
