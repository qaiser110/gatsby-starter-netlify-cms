const path = require('path')
const { tags } = require('./data/index.js')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators
  const categoryPage = path.resolve('src/templates/posts-by-category.js')
  const tagPage = path.resolve('src/templates/posts-by-tag.js')

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
              series
              chapters
              date
              title
              cover
              category
              tags
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
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const categorySet = new Set()
    const tagSet = new Set()

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.category) {
        categorySet.add(node.frontmatter.category)
      }

      if (node.frontmatter.tags)
        node.frontmatter.tags.forEach(tag => {
          if (!tags[tag]) {
            const err = `Tag "${tag}" used in "${
              node.frontmatter.path
            }" doesn't exist in "data/index.js"
Allowed values are: ${Object.keys(tags).join(', ')}
`
            throw new Error(err)
          }
          tagSet.add(tag)
        })

      const pagePath = node.frontmatter.path
      const cover = node.frontmatter.cover
        ? `/${node.frontmatter.cover.split('/img/')[1].split('.')[0]}/`
        : '/chemex/'

      createPage({
        path: pagePath,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          cover,
          path: pagePath,
          series: node.frontmatter.series || '',
        },
      })

      if (node.frontmatter.series !== null) {
      } else {
      }
    })

    const tagList = Array.from(tagSet)
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagPage,
        context: {
          tag,
        },
      })
    })

    const categoryList = Array.from(categorySet)
    categoryList.forEach(category => {
      createPage({
        path: `/categories/${category}/`,
        component: categoryPage,
        context: {
          category,
        },
      })
    })

    return Promise.resolve()
  })
}
