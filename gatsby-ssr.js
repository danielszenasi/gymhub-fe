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
    isLoggedIn: false
  }
});

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://gymbo-athletics.herokuapp.com/",
    headers: {
      authorization: ""
    }
  }),
  fetch,
  typeDefs,
  resolvers
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
