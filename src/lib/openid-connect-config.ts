export const openIDConfig = () => ({
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8080",
  routes: {
    login: "/auth/login",
    logout: "/auth/logout",
    postLogoutRedirect: "/",
    callback: "/auth/callback",
  },
  clientID: process.env.AUTH0_CLIENT_PUBLIC,
  issuerBaseURL: "https://dev-aglusrio.us.auth0.com",
  secret: process.env.AUTH0_CLIENT_SECRET,
});
