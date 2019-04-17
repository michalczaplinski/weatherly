const proxy = require("http-proxy-middleware");

// This is used for local development

module.exports = function(app) {
  app.use(
    proxy("/.netlify/functions/", {
      target: "http://localhost:9000/",
      pathRewrite: {
        "^/\\.netlify/functions": ""
      }
    })
  );
};
