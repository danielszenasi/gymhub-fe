import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { graphql, Link } from "gatsby";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Layout from "../components/Layout";

const useStyles = makeStyles(theme => ({}));

const Workout = ({ data }) => {
  const classes = useStyles();
  const {
    gymhub: { getWorkout: workout }
  } = data;

  const group = workout.assignmentHistories.reduce((acc, assignmentHistory) => {
    if (acc[assignmentHistory.assignment.id]) {
      return {
        ...acc,
        [assignmentHistory.assignment.id]: {
          name: assignmentHistory.assignment.nameEn,
          url: assignmentHistory.assignment.url,
          slug: assignmentHistory.assignment.slug,
          executions: [
            ...acc[assignmentHistory.assignment.id].executions,
            assignmentHistory.executions
          ]
        }
      };
    }
    return {
      ...acc,
      [assignmentHistory.assignment.id]: {
        name: assignmentHistory.assignment.nameEn,
        url: assignmentHistory.assignment.url,
        slug: assignmentHistory.assignment.slug,
        executions: [assignmentHistory.executions]
      }
    };
  }, {});

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h6">{workout.name}</Typography>
        <List className={classes.root}>
          {Object.keys(group).map(id => (
            <>
              <ListItem
                alignItems="flex-start"
                button
                component={Link}
                to={group[id].slug}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={group[id].url} />
                </ListItemAvatar>
                <ListItemText
                  primary={group[id].name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {`${group[id].executions.length} Sets | ${group[
                          id
                        ].executions[0]
                          .map(item => `${item.value} ${item.measure.nameEn}`)
                          .join(" | ")}`}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Container>
    </Layout>
  );
};

export default Workout;

export const pageQuery = graphql`
  query WorkoutByID($id: ID!) {
    gymhub {
      getWorkout(id: $id) {
        nameEn
        noteEn
        categories {
          id
          nameEn
        }
        bodyParts {
          id
          nameEn
        }
        assignmentHistories {
          id
          assignment {
            id
            nameEn
            url
            slug
          }
          executions {
            value
            measure {
              nameEn
            }
          }
        }
      }
    }
  }
`;
