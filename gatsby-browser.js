import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";
import { InMemoryCache } from "apollo-cache-inmemory";
import { typeDefs, resolvers } from "./src/apollo/resolvers";

const cache = new InMemoryCache();

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token")
  }
});

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://gymbo-athletics.herokuapp.com/",
    headers: {
      authorization: !!localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : ""
    }
  }),
  fetch,
  typeDefs,
  resolvers
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
