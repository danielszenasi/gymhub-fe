import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({
  image: { maxHeight: "400px" }
}));

const Exercise = ({ data }) => {
  const classes = useStyles();
  const {
    gymhub: { getExercise: exercise }
  } = data;
  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h6">{exercise.nameEn}</Typography>
        <Typography variant="subtitle1">
          {exercise.bodyParts.map(item => item.nameEn).join(", ")}
        </Typography>
        <Typography variant="subtitle2">
          {exercise.categories.map(item => item.nameEn).join(", ")}
        </Typography>
        <img src={exercise.url} className={classes.image}></img>
        <Typography variant="body1">{exercise.descriptionEn}</Typography>
      </Container>
    </Layout>
  );
};

export default Exercise;

export const pageQuery = graphql`
  query ExerciseByID($id: ID!) {
    gymhub {
      getExercise(id: $id) {
        id
        nameEn
        descriptionEn
        url
        bodyParts {
          id
          nameEn
        }
        categories {
          id
          nameEn
        }
      }
    }
  }
`;
