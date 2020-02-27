import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "./Layout";
import { CircularProgress } from "@material-ui/core";

const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($email: String!, $emailConfirmToken: String!) {
    confirmEmail(email: $email, emailConfirmToken: $emailConfirmToken) {
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

export const ConfirmEmail = ({ email, token }) => {
  const classes = useStyles();

  const client = useApolloClient();
  const [signupByInvite, { loading, error }] = useMutation(CONFIRM_EMAIL, {
    onCompleted({ signupByInvite }) {
      localStorage.setItem("token", signupByInvite.token);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  useEffect(() => {
    signupByInvite({
      variables: {
        email,
        emailConfirmToken: token
      }
    });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <p>An error occurred</p>;

  return (
    <Layout>
      <div>Your email was confirmed</div>
    </Layout>
  );
};
