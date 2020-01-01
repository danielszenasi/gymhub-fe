import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";
import Layout from "./Layout";

const SIGNUP_BY_INVITE = gql`
  mutation SignupByInvite(
    $email: String!
    $password: String!
    $inviteToken: String!
    $firstName: String
    $lastName: String
  ) {
    signupByInvite(
      email: $email
      password: $password
      inviteToken: $inviteToken
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
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

export const Register = ({ email, token }) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: ""
  });

  const client = useApolloClient();
  const [signupByInvite, { loading, error }] = useMutation(SIGNUP_BY_INVITE, {
    onCompleted({ signupByInvite }) {
      localStorage.setItem("token", signupByInvite.token);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    signupByInvite({
      variables: {
        email,
        inviteToken: token,
        password: inputs.password,
        firstName: inputs.firstName,
        lastName: inputs.lastName
      }
    });
  };

  if (error) return <p>An error occurred</p>;

  return (
    <Layout>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Password"
          variant="filled"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <TextField
          label="First Name"
          variant="filled"
          name="firstName"
          type="text"
          value={inputs.firstName}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          variant="filled"
          name="lastName"
          type="text"
          value={inputs.lastName}
          onChange={handleInputChange}
        />

        <div className={classes.wrapper}>
          <Button disabled={loading} variant="contained" type="submit">
            Register
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </Layout>
  );
};
