import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./Home";
import Login from "./Login";
import Protected from "./Protected";
import config from "./data/authConfig";
import CustomApolloProvider from "./providers/CustomApolloProvider";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  return (
    <Security
      issuer={config.issuer}
      clientId={config.clientId}
      redirectUri={window.location.origin + config.callback}
      onAuthRequired={onAuthRequired}
      pkce={true}
    >
      <CustomApolloProvider>
        <Route path="/" exact={true} component={Home} />
        <SecureRoute path="/protected" component={Protected} />
        <Route path="/login" render={() => <Login baseUrl={config.domain} />} />
        <Route path="/implicit/callback" component={LoginCallback} />
      </CustomApolloProvider>
    </Security>
  );
};
export default AppWithRouterAccess;
