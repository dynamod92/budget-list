import React, { Component, useEffect } from "react";
import ReactDOM from "react-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";

const OktaSignInWidget = () => {
  const signInWidgetConfig = {
    // Enable or disable widget functionality with the following options. Some of these features require additional configuration in your Okta admin settings. Detailed information can be found here: https://github.com/okta/okta-signin-widget#okta-sign-in-widget
    // Look and feel changes:
    logo: "//logo.clearbit.com/okta.com", // Try changing "okta.com" to other domains, like: "workday.com", "splunk.com", or "delmonte.com"
    language: "en", // Try: [fr, de, es, ja, zh-CN] Full list: https://github.com/okta/okta-signin-widget#language-and-text
    idps: [{ type: "Googlay", id: "beepidyboopitybop" }],
    idpDisplay: "PRIMARY",
    i18n: {
      //Overrides default text when using English. Override other languages by adding additional sections.
      en: {
        "primaryauth.title": "Sign In", // Changes the sign in text
        "primaryauth.submit": "Sign In", // Changes the sign in button
        // More e.g. [primaryauth.username.placeholder,  primaryauth.password.placeholder, needhelp, etc.].
        // Full list here: https://github.com/okta/okta-signin-widget/blob/master/packages/@okta/i18n/dist/properties/login.properties
      },
    },
    // Changes to widget functionality
    features: {
      registration: false, // Enable self-service registration flow
      rememberMe: true, // Setting to false will remove the checkbox to save username
      //multiOptionalFactorEnroll: true,  // Allow users to enroll in multiple optional factors before finishing the authentication flow.
      //selfServiceUnlock: true,          // Will enable unlock in addition to forgotten password
      //smsRecovery: true,                // Enable SMS-based account recovery
      //callRecovery: true,               // Enable voice call-based account recovery
      router: true, // Leave this set to true for the API demo
    },
    baseUrl: "https://live-widget.oktapreview.com",
    clientId: "0oaexo9c530ZUVuOj0h7",
    redirectUri: "https://developer.okta.com/live-widget",
    authParams: {
      issuer: "https://live-widget.oktapreview.com/oauth2/ausexqn31sz3HMxdf0h7",
      responseType: ["id_token", "token"],
      scopes: ["openid", "email", "profile"],
    },
  };

  const signInWidget = new OktaSignIn(signInWidgetConfig);

  useEffect(() => {
    const widgetSuccessCallback = (res) => {
      var key = "";
      if (res[0]) {
        key = Object.keys(res[0])[0];
        signInWidget.tokenManager.add(key, res[0]);
      }
      if (res[1]) {
        key = Object.keys(res[1])[0];
        signInWidget.tokenManager.add(key, res[1]);
      }
      if (res.status === "SUCCESS") {
        var token = signInWidget.tokenManager.get(key);
        console.log("Logged in to Okta and issued token:");
        console.log(token);
        console.log("Reload this page to start over.");
        alert("Logged in! Check your developer console for details");
      }
    };

    const widgetErrorCallback = (err) => {
      console.log(err);
      signInWidget.remove();
    };
    signInWidget.renderEl(
      { el: "#widget-container" },
      widgetSuccessCallback,
      widgetErrorCallback
    );
  }, [signInWidget]);

  return <div id="widget-container"></div>;
};

export default OktaSignInWidget;
