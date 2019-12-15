import React from "react";
import FeaturedPost from "../components/FeaturedPost";
import { Grid, Toolbar, Link } from "@material-ui/core";
import { graphql } from "gatsby";
import { Link as GatsbyLink } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textTransform: "capitalize"
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const Tags = ({ data, pageContext }) => {
  const classes = useStyles();
  const posts = data.allMarkdownRemark.edges;
  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {pageContext.tags.map(tag => (
          <Link
            color="inherit"
            noWrap
            key={tag}
            variant="body2"
            component={GatsbyLink}
            to={`tags/${tag}`}
            className={classes.toolbarLink}
          >
            {tag}
          </Link>
        ))}
      </Toolbar>
      <Grid container spacing={4}>
        {posts.map(({ node }) => (
          <FeaturedPost key={node.id} post={node} />
        ))}
      </Grid>
    </>
  );
};

export default Tags;

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 610, quality: 80, fit: COVER) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            title
          }
        }
      }
    }
  }
`;
