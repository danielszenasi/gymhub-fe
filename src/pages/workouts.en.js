import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import Workout from "../components/Workout";
import Layout from "../components/Layout";

const WorkoutsPage = ({ data }) => {
  const workouts = data.gymhub.getWorkouts;

  return (
    <Layout>
      <Grid container spacing={4}>
        {workouts.map(({ slug, nameEn, categories, bodyParts }) => (
          <Workout
            key={slug}
            slug={slug}
            name={nameEn}
            categories={categories ? categories.map(item => item.nameEn) : []}
            bodyParts={bodyParts ? bodyParts.map(item => item.nameEn) : []}
          />
        ))}
      </Grid>
    </Layout>
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
