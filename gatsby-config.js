module.exports = {
  siteMetadata: {
    title: 'Gatsby + Netlify CMS Starter',
    siteUrl: `https://www.example.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/some-other-sitemap.xml`,
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
 
          allSitePage {
            edges {
              node {
                path
              }
            }
          }
      }`
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-53JKHV5",
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
  ],
};
