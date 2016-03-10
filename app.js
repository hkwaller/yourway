var express = require("express");
var mustacheExpress = require("mustache-express");

var app = express();
var port = process.env.PORT || 8000;

app.engine("html", mustacheExpress());

app.set("view engine", "html");
app.set("views", __dirname + "/public/html");

app.use("/public", express.static("public"));


app.get("/", function(req, res) {
	res.render("index", {
		publicPath: "public",
		pageTitle: "Yourway",
		displaySiteTitle: true
	})
});

app.get("/finished", function(req, res) {
	res.render("index", {
		publicPath: "public",
		pageTitle: "Yourway",
		displaySiteTitle: false
	})
});

app.get("/takk", function(req, res) {
	res.render("takk", {
		publicPath: "public",
		pageTitle: "Yourway",
		displaySiteTitle: false
	})
});



app.listen(port, function() {
	console.log("Appen kjører på port " + port);
});
