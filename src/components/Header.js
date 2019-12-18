import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { Link as GatsbyLink } from "gatsby";
import { Link } from "@material-ui/core";
import LanguageSelect from "./LanguageSelect";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between"
  },
  nav: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around"
  }
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <div className={classes.nav}>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to=""
            className={classes.toolbarLink}
          >
            Home
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="exercises"
            className={classes.toolbarLink}
          >
            Workouts
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to=""
            className={classes.toolbarLink}
          >
            Trainers
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to=""
            className={classes.toolbarLink}
          >
            Gyms
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="blog"
            className={classes.toolbarLink}
          >
            Blog
          </Link>
        </div>
        <LanguageSelect></LanguageSelect>

        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string
};
