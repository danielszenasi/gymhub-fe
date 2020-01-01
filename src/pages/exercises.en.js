import React from "react";
import { graphql } from "gatsby";
import { Grid } from "@material-ui/core";
import Exercise from "../components/Exercise";
import Layout from "../components/Layout";

const ExecisesPage = ({ data }) => {
  const exercises = data.gymhub.getExercises;

  return (
    <Layout>
      <Grid container spacing={4}>
        {exercises.map(
          ({ slug, nameEn, descriptionEn, bodyParts, imageFile }) => (
            <Exercise
              key={slug}
              slug={slug}
              name={nameEn}
              description={descriptionEn}
              bodyParts={bodyParts.map(item => item.nameEn)}
              imageFile={imageFile}
            />
          )
        )}
      </Grid>
    </Layout>
  );
};

export default ExecisesPage;

export const execisesQuery = graphql`
  query {
    gymhub {
      getExercises {
        slug
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
