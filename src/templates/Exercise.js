import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { graphql } from "gatsby";

const useStyles = makeStyles(theme => ({
  image: { maxHeight: "400px" }
}));

const Exercise = ({ data }) => {
  const classes = useStyles();
  const {
    gymhub: { getExercise: exercise }
  } = data;
  return (
    <Container maxWidth="lg">
      <Typography variant="h6">{exercise.name}</Typography>
      <Typography variant="subtitle1">
        {exercise.bodyParts.join(", ")}
      </Typography>
      <Typography variant="subtitle2">
        {exercise.categories.join(", ")}
      </Typography>
      <img src={exercise.url} className={classes.image}></img>
      <Typography variant="body1">{exercise.description}</Typography>
    </Container>
  );
};

export default Exercise;

export const pageQuery = graphql`
  query ExerciseByID($id: ID!) {
    gymhub {
      getExercise(id: $id) {
        id
        name
        description
        url
        bodyParts
        categories
      }
    }
  }
`;
