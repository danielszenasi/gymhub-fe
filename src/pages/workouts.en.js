import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import Workout from "../components/Workout";

const WorkoutsPage = ({ data }) => {
  const workouts = data.gymhub.getWorkouts;

  return (
    <Grid container spacing={4}>
      {workouts.map(({ slug, name, categories, bodyParts }) => (
        <Workout
          key={slug}
          slug={slug}
          name={name}
          categories={categories}
          bodyParts={bodyParts}
        />
      ))}
    </Grid>
  );
};

export default WorkoutsPage;

export const workoutsQuery = graphql`
  query {
    gymhub {
      getWorkouts(type: GLOBAL) {
        id
        name
        slug
        categories
        bodyParts
      }
    }
  }
`;
