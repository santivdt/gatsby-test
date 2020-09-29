/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const {
    data: {
      allWpPost: { nodes: allPosts },
    },
  } = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/post.js`)

  allPosts.forEach(post => {
    createPage({
      // will be the url for the page
      path: post.uri,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this post's data.
      context: {
        id: post.id,
      },
    })
  })
}
module.exports = {
    plugins: [
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      `gatsby-plugin-material-ui`,
      {
        resolve: `gatsby-plugin-sharp`
      },
  {
    resolve: `gatsby-source-wordpress-experimental`,
    options: {
      url:
      // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        'https://debovengrondse.nl/graphql' ||
        `https://localhost/graphql`,
      schema: {
        //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
        typePrefix: `Wp`,
      },
      develop: {
        //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
        hardCacheMediaFiles: true,
      },
      type: {
        Post: {
          limit:
            process.env.NODE_ENV === `development`
              ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
              50
              : // and we don't actually need more than 5000 in production for this particular site
              5000,
        },
      },
    },
  },
]
}
