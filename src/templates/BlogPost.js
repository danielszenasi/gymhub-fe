import React from "react";
import { Typography, Container } from "@material-ui/core";
import { HTMLContent } from "../components/Main";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h6">{post.frontmatter.title}</Typography>
        <Typography>{post.frontmatter.date}</Typography>
        <HTMLContent content={post.html}></HTMLContent>
      </Container>
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
