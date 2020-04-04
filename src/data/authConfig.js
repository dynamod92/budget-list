const config = {
  // Required config
  issuer: "https://dev-175272.okta.com/oauth2/default",
  baseUrl: "https://dev-175272.okta.com",
  url: "https://dev-175272.okta.com",

  // Required for login flow using getWithRedirect()
  clientId: "0oa5855xya1WgXmXt4x6",
  redirectUri: "https://localhost:3000",
  callback: "/implicit/callback",
  // Parse authorization code from hash fragment instead of search query
  responseMode: "fragment",

  // Configure TokenManager to use sessionStorage instead of localStorage
  tokenManager: {
    storage: "sessionStorage"
  }
};

export default config;
