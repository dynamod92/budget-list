import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri:
    "https://e3iu4ya5tvfurjlad4osey4gmm.appsync-api.us-east-1.amazonaws.com/graphql",
  headers: {
    "x-api-key": "da2-kbivmehoqrec7mrk3fpo5f4ifq"
  }
});

export const CustomApolloProvider = props => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);
