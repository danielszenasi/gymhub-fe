import React, { useState, useEffect } from "react";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, TextField, Link, Typography } from "@material-ui/core";
import { Link as GatsbyLink } from "gatsby";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import Layout from "./Layout";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const SignIn = props => {
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const client = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    login({
      variables: {
        email: formState.values.email,
        password: formState.values.password
      }
    });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  if (error) return <p>An error occurred</p>;

  return (
    <Layout>
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.content} item md={12} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={handleSignIn}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>

                  <TextField
                    className={classes.textField}
                    error={hasError("email")}
                    fullWidth
                    helperText={
                      hasError("email") ? formState.errors.email[0] : null
                    }
                    label="Email address"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ""}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError("password")}
                    fullWidth
                    helperText={
                      hasError("password") ? formState.errors.password[0] : null
                    }
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ""}
                    variant="outlined"
                  />
                  <div className={classes.wrapper}>
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      Register
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>

                  <Typography color="textSecondary" variant="body1">
                    Don't have an account?{" "}
                    <Link component={GatsbyLink} to="/sign-up" variant="h6">
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default SignIn;
