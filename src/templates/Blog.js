import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { graphql } from "gatsby";
import { Toolbar, Link } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";

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

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" }
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon }
  ]
};

export default function Blog({
  data: {
    allMarkdownRemark: { edges }
  },
  pageContext
}) {
  const classes = useStyles();

  const mainFeaturedPost = edges[0].node;

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
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {edges.map(({ node }) => (
          <FeaturedPost key={node.fields.slug} post={node} />
        ))}
      </Grid>
      <Grid container spacing={5} className={classes.mainGrid}>
        <Main title="From the firehose" posts={edges} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
          social={sidebar.social}
        />
      </Grid>
    </>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "BlogPost" } } }
    ) {
      edges {
        node {
          html
          excerpt(pruneLength: 200)
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
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
