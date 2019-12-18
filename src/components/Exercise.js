import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "gatsby";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  cardMediaImage: {
    width: "100%",
    height: "100%",
    backgroundPosition: "bottom center",
    backgroundRepeat: "repeat-y",
    backgroundSize: "cover",
    color: "white",
    padding: "8px 24px"
  }
});

export default function Exercise(props) {
  const classes = useStyles();
  const { name, url, slug, description, bodyParts } = props;
  console.log(name, url, slug, description, bodyParts);

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} to={slug}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {description}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {bodyParts}
              </Typography>

              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={url} title={name} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Exercise.propTypes = {
  post: PropTypes.object
};
