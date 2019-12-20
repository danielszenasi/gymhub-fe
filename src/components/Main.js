import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);

export default function Main(props) {
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map(({ node }) => (
        <div key={node.fields.slug}>
          <Typography variant="h6">{node.frontmatter.title}</Typography>
          <Typography>{node.frontmatter.date}</Typography>
          <HTMLContent content={node.html}></HTMLContent>
        </div>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string
};
