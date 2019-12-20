import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as GatsbyLink } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    marginBottom: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create("box-shadow"),
    boxShadow: theme.shadows[1],
    overflow: "auto"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
}));
export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <BackgroundImage
      Tag="section"
      className={classes.mainFeaturedPost}
      fluid={post.frontmatter.featuredimage.childImageSharp.fluid}
      backgroundColor={`#040e18`}
    >
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {post.frontmatter.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.excerpt}
            </Typography>

            <Link
              variant="subtitle1"
              component={GatsbyLink}
              to={post.fields.slug}
            >
              Continue reading...
            </Link>
          </div>
        </Grid>
      </Grid>
    </BackgroundImage>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object
};
