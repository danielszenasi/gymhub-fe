import React from "react";
import { Typography } from "@material-ui/core";
import { HTMLContent } from "../components/Main";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Typography variant="h6">{post.frontmatter.title}</Typography>
      <Typography>{post.frontmatter.date}</Typography>
      <HTMLContent content={post.html}></HTMLContent>
    </div>
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
