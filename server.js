//imports
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

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

app.use(cors(corsOptions));

app.use("/", require("./routes/root"));

// Handle 404 Page NOt Found Errors for un-defined routes
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// Error Logger
app.use(errorHandler);

//Express is listening
const server = app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log(path.join(__dirname));
	console.log(`${indexpath}`);
});
