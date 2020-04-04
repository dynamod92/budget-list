import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useOktaAuth } from "@okta/okta-react";

const CustomApolloProvider = (props) => {
  const { authState } = useOktaAuth();

  const client = new ApolloClient({
    uri:
      "https://e3iu4ya5tvfurjlad4osey4gmm.appsync-api.us-east-1.amazonaws.com/graphql",
    headers: {
      Authorization: authState.accessToken,
    },
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default CustomApolloProvider;
