import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "gatsby";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  }
});

export default function Workout(props) {
  const classes = useStyles();
  const { slug, name, categories, bodyParts } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} to={slug}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {name}
              </Typography>

              <Typography variant="subtitle1" paragraph>
                {categories.join(", ")}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {bodyParts.join(", ")}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Workout.propTypes = {
  slug: PropTypes.string,
  name: PropTypes.string,
  categories: PropTypes.array,
  bodyParts: PropTypes.array
};
