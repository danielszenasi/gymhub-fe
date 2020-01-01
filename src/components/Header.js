import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link as GatsbyLink, navigate } from "gatsby";
import { Link, IconButton } from "@material-ui/core";
import LanguageSelect from "./LanguageSelect";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: "space-between"
  },
  nav: {
    flex: 1,
    display: "flex",
    justifyContent: "space-around"
  },
  menu: {
    zIndex: 1
  }
}));

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function Header() {
  const classes = useStyles();

  const { data } = useQuery(IS_LOGGED_IN);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const client = useApolloClient();
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

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
            to="/"
            className={classes.toolbarLink}
          >
            Home
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="/exercises"
            className={classes.toolbarLink}
          >
            Exercises
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="/workouts"
            className={classes.toolbarLink}
          >
            Workouts
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="/"
            className={classes.toolbarLink}
          >
            Trainers
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h5"
            component={GatsbyLink}
            to="/blog"
            className={classes.toolbarLink}
          >
            Blog
          </Link>
        </div>
        <LanguageSelect></LanguageSelect>

        {/* <IconButton>
          <SearchIcon />
        </IconButton> */}
        {data.isLoggedIn ? (
          <div className={classes.menu}>
            <IconButton
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              aria-label="profile"
              className={classes.margin}
            >
              <AccountCircleIcon />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>Clients</MenuItem>
                        <MenuItem component={GatsbyLink} to={"/app/history"}>
                          History
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Calendar</MenuItem>
                        <MenuItem
                          onClick={() => {
                            client.writeData({ data: { isLoggedIn: false } });
                            localStorage.clear();
                            navigate("/");
                          }}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        ) : (
          <Button
            component={GatsbyLink}
            to="/app/login"
            variant="outlined"
            size="small"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string
};
