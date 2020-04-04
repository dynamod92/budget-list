import React, { Component } from "react";
import ReactDOM from "react-dom";
import OktaSignIn from "@okta/okta-signin-widget";

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      url: "https://dev-175272.okta.com",
      authParams: {
        display: "page",
        pkce: true
      }
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    console.log(this);
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}
