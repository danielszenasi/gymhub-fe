import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { formatDistanceToNow } from "date-fns";
import Layout from "./Layout";
import { WorkoutDetails } from "./WorkoutDetails";
import { Router } from "@reach/router";
import { navigate } from "gatsby";
import { Container, Box } from "@material-ui/core";

const GET_WORKOUTS = gql`
  query GetWorkouts {
    getWorkouts {
      id
      state
      nameEn
      nameHu
      startsAt
      user {
        id
        firstName
        lastName
      }
      bodyParts {
        nameEn
        nameHu
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  block: {
    display: "block"
  }
}));

export const History = () => {
  const { data, loading, error } = useQuery(GET_WORKOUTS);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    navigate(`/app/history/${id}`);
  };
  if (loading) return <div>Loading</div>;
  if (error) return <p>ERROR</p>;

  return (
    <Layout>
      <Box display="flex">
        <List className={classes.list}>
          {data.getWorkouts.map(
            ({ id, nameEn, startsAt, bodyParts, user }, index) => {
              const bodyPartsEn = bodyParts.map(item => item.nameEn);
              return (
                <>
                  <ListItem
                    button
                    selected={selectedIndex === index}
                    onClick={event => handleListItemClick(event, index, id)}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {nameEn}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            className={classes.block}
                            color="textSecondary"
                          >
                            {formatDistanceToNow(new Date(startsAt), {
                              addSuffix: true
                            })}
                          </Typography>

                          <Typography
                            component="span"
                            variant="caption"
                            className={classes.block}
                            color="textSecondary"
                          >
                            {bodyPartsEn.join(", ")}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            }
          )}
        </List>
        <Router>
          <WorkoutDetails path="/:workoutId" />
        </Router>
      </Box>
    </Layout>
    // <Grid container spacing={4}>

    //     <Workout
    //       key={id}
    //       slug={`/app/workout/${id}`}
    //       name={nameEn}
    //       categories={categories.map(item => item.nameEn)}
    //       bodyParts={bodyParts.map(item => item.nameEn)}
    //     />

    // </Grid>
  );
};
