import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import Workout from "../components/Workout";

const WorkoutsPage = ({ data }) => {
  const workouts = data.gymhub.getWorkouts;

  return (
    <Grid container spacing={4}>
      {workouts.map(({ slug, nameEn, categories, bodyParts }) => (
        <Workout
          key={slug}
          slug={slug}
          name={nameEn}
          categories={categories.map(item => item.nameEn)}
          bodyParts={bodyParts.map(item => item.nameEn)}
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
        nameEn
        slug
        categories {
          id
          nameEn
        }
        bodyParts {
          id
          nameEn
        }
      }
    }
  }
`;
