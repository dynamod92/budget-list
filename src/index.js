import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CustomApolloProvider } from "./providers/CustomApolloProvider";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <CustomApolloProvider>
    <App />
  </CustomApolloProvider>,
  document.getElementById("root")
);
