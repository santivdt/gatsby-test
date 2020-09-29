/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    plugins: [
  {
    resolve: `gatsby-source-wordpress-experimental`,
    options: {
      url:
      // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
        process.env.WPGRAPHQL_URL ||
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
