//imports
const express = require("express");
const path = require("path");
const { logger } = require("./middleware/logEvents");

//Defined variables
const app = express();
const PORT = process.env.PORT || 5000;
const indexpath = path.join(__dirname + "/views/index.html");

//Built in Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Custom middleware
app.use(logger);

//Cross Origin Resource sharing
//app.use(cors);

// Routes
// Default Route :/
app.get("^/$|/index(.html)?", (req, res) => {
	res.status(200).sendFile(path.join(__dirname + "/views/index.html"));
});

// States routes :/states/
app.get("^/states/| /States/?", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "model", "states.json"));
});

app.get("*", (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//Express is listening
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log(path.join(__dirname));
	console.log(`${indexpath}`);
});
