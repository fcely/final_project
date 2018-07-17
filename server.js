
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

//==============================================================

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

var exphbs = require("express-handlebars");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./app/routes/api-routes.js")(app);

//8888888888888888888888 Pengind to add passport routes 88888888888888888888888888888888888888888888888888888888888

// Starts sequalize to update tables then the server to begin listening

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
  });
});