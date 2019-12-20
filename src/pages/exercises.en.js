import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import Exercise from "../components/Exercise";

const ExecisesPage = ({ data }) => {
  const exercises = data.gymhub.getExercises;

  return (
    <Grid container spacing={4}>
      {exercises.map(({ slug, name, description, bodyParts, imageFile }) => (
        <Exercise
          key={slug}
          slug={slug}
          name={name}
          description={description}
          bodyParts={bodyParts}
          imageFile={imageFile}
        />
      ))}
    </Grid>
  );
};

export default ExecisesPage;

export const execisesQuery = graphql`
  query {
    gymhub {
      getExercises {
        slug
        id
        name
        description
        url
        bodyParts
        categories
        imageFile {
          childImageSharp {
            fluid(maxWidth: 160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
