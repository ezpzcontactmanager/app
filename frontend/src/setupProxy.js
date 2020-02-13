const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/signup", "/login", "/me", "/me/contacts",
        "/me/contacts/add", "/me/contacts/:id", "/me/contacts/search"
        ,"me/contacts/edit/:id"],
        { target: "http://localhost:5000" }
    )
  );
};