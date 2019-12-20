const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const _ = require("lodash");
const slugify = require("slugify");
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
              langKey
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const items = result.data.allMarkdownRemark.edges;

  items.forEach(edge => {
    const id = edge.node.id;
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve(
        `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
      ),
      // additional data can be passed via context
      context: {
        id,
        langKey: edge.node.fields.langKey
      }
    });
  });

  // Tag pages:
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  items.forEach(edge => {
    if (_.get(edge, `node.frontmatter.tags`)) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = _.uniq(tags);

  // Make tag pages
  tags.forEach(tag => {
    const tagPath = `/tags/${_.kebabCase(tag)}/`;

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/Tags.js`),
      context: {
        tag,
        tags,
        langKey: "en"
      }
    });
  });

  createPage({
    path: "blog",
    component: path.resolve(`src/templates/Blog.js`),
    // additional data can be passed via context
    context: {
      tags,
      langKey: "en"
    }
  });

  const exercises = await graphql(`
    {
      gymhub {
        getExercises {
          id
          name
          slug
        }
      }
    }
  `);

  exercises.data.gymhub.getExercises.forEach(exercise => {
    createPage({
      path: exercise.slug,
      component: path.resolve(`src/templates/Exercise.js`),
      context: {
        id: exercise.id,
        langKey: "en"
      }
    });
  });

  const workouts = await graphql(`
    {
      gymhub {
        getWorkouts(type: GLOBAL) {
          id
          name
          slug
        }
      }
    }
  `);

  workouts.data.gymhub.getWorkouts.forEach(workout => {
    createPage({
      path: workout.slug,
      component: path.resolve(`src/templates/Workout.js`),
      context: {
        id: workout.id,
        langKey: "en"
      }
    });
  });
};

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions;
  createResolvers({
    GYMHUB_Assignment: {
      slug: {
        type: `String`,
        resolve: object => {
          const name = slugify(object.name);
          return `/exercises/${name}`;
        }
      },
      imageFile: {
        type: `File`,
        resolve: object => {
          return createRemoteFileNode({
            url: object.url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    },
    GYMHUB_AssignmentGroup: {
      slug: {
        type: `String`,
        resolve: object => {
          const name = slugify(object.name);
          return `/workouts/${name}`;
        }
      }
    }
  });
};
