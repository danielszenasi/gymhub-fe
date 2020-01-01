import React from "react";
import { Typography, Container, makeStyles } from "@material-ui/core";
import { Link } from "gatsby";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const useStyles = makeStyles(theme => ({}));

export const WORKOUT_BY_ID = gql`
  query WorkoutByID($id: ID!) {
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
`;

export const WorkoutDetails = ({ workoutId }) => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(WORKOUT_BY_ID, {
    variables: { id: workoutId }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <p>ERROR</p>;

  const group = data.getWorkout.assignmentHistories.reduce(
    (acc, assignmentHistory) => {
      if (acc[assignmentHistory.assignment.id]) {
        return {
          ...acc,
          [assignmentHistory.assignment.id]: {
            name: assignmentHistory.assignment.nameEn,
            url: assignmentHistory.assignment.url,
            slug: assignmentHistory.assignment.id,
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
          slug: assignmentHistory.assignment.id,
          executions: [assignmentHistory.executions]
        }
      };
    },
    {}
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h6">{data.getWorkout.name}</Typography>
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
  );
};
