import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useAuth0 } from "@auth0/auth0-react";

const CustomApolloProvider = (props) => {
  const { getAccessTokenSilently } = useAuth0();

  const client = new ApolloClient({
    uri:
      "https://e3iu4ya5tvfurjlad4osey4gmm.appsync-api.us-east-1.amazonaws.com/graphql",
    headers: {
      Authorization: getAccessTokenSilently(),
    },
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default CustomApolloProvider;
