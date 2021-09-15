const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

const APP_ROUTES = [
  {
    page: "index",
    pattern: "/",
  },
  {
    page: "offer/[id]",
    pattern: "offer/:id"
  },
  {
    page: "post/[slug]",
    pattern: "post/:slug"
  },
  {
    page: "user/[id]",
    pattern: "/user/:id"
  }
];

APP_ROUTES.forEach((route) => routes.add(route));
