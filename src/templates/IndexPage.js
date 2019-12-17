import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Grid } from "@material-ui/core";
import Img from "gatsby-image";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

const useStyles = makeStyles(theme => ({
  langingBg: { height: "100vh" },
  heading: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  },
  feature: {
    display: "flex"
  },
  featureText: {
    paddingLeft: theme.spacing(1)
  }
}));

export const IndexPageTemplate = ({ heading, landingBg, mobile, langKey }) => {
  const classes = useStyles();
  return (
    <>
      <BackgroundImage
        Tag="section"
        className={classes.langingBg}
        fluid={landingBg.childImageSharp.fluid}
        backgroundColor={`#040e18`}
      ></BackgroundImage>
      <Container maxWidth="lg">
        <Typography component="h1" variant="h2" className={classes.heading}>
          {heading}
        </Typography>
        <Typography component="body2" variant="h5">
          This is the paragraph where you can write more details about your
          product. Keep you user engaged by providing meaningful information.
        </Typography>
        <Grid container justify="center" alignItems="center">
          <Grid item md={4}>
            <div className={classes.feature}>
              <AccessibilityIcon></AccessibilityIcon>
              <div className={classes.featureText}>
                <Typography variant="h6">For Developers</Typography>
                <Typography variant="body1">
                  The moment you use Material Kit, you know you’ve never felt
                  anything like it. With a single use, this powerfull UI Kit
                  lets you do more than ever before.
                </Typography>
              </div>
            </div>
            <div className={classes.feature}>
              <AccessibilityIcon></AccessibilityIcon>
              <div className={classes.featureText}>
                <Typography variant="h6">For Developers</Typography>
                <Typography variant="body1">
                  The moment you use Material Kit, you know you’ve never felt
                  anything like it. With a single use, this powerfull UI Kit
                  lets you do more than ever before.
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={3}>
            <Img fluid={mobile.childImageSharp.fluid}></Img>
          </Grid>
          <Grid item md={4}>
            <div className={classes.feature}>
              <AccessibilityIcon></AccessibilityIcon>
              <div className={classes.featureText}>
                <Typography variant="h6">For Developers</Typography>
                <Typography variant="body1">
                  The moment you use Material Kit, you know you’ve never felt
                  anything like it. With a single use, this powerfull UI Kit
                  lets you do more than ever before.
                </Typography>
              </div>
            </div>
            <div className={classes.feature}>
              <AccessibilityIcon></AccessibilityIcon>
              <div className={classes.featureText}>
                <Typography variant="h6">For Developers</Typography>
                <Typography variant="body1">
                  The moment you use Material Kit, you know you’ve never felt
                  anything like it. With a single use, this powerfull UI Kit
                  lets you do more than ever before.
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

IndexPageTemplate.propTypes = {
  heading: PropTypes.string,
  langKey: PropTypes.string,
  landingBg: PropTypes.object,
  mobile: PropTypes.object
};

const IndexPage = ({
  data: {
    markdownRemark: {
      fields: { langKey },
      frontmatter: { heading, redirectButtonText }
    },
    landingBg,
    mobile
  }
}) => (
  <IndexPageTemplate
    heading={heading}
    landingBg={landingBg}
    mobile={mobile}
    redirectButtonText={redirectButtonText}
    langKey={langKey}
  />
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query HomePageTemplate($langKey: String!) {
    markdownRemark(
      fields: { langKey: { eq: $langKey } }
      frontmatter: { templateKey: { eq: "IndexPage" } }
    ) {
      fields {
        langKey
      }
      frontmatter {
        metaTitle
        metaDescription
        heading
      }
    }
    landingBg: file(relativePath: { eq: "landing-bg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 80, fit: COVER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    mobile: file(relativePath: { eq: "mobile.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, quality: 80, fit: COVER) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
