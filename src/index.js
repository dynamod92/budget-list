import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./Login";
import CustomApolloProvider from "./providers/customApolloProvider";

ReactDOM.render(
  <Auth0Provider
    domain="imdarrell.auth0.com"
    clientId="IZvcN2UKG0SNbYNdvokO41bzutbOJhSX"
    redirectUri={window.location.origin}
  >
    <Login />
  </Auth0Provider>,
  document.getElementById("root")
);
