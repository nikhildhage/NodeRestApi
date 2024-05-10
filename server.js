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

//Default ROute
app.use("/", require("./routes/root"));

//States API ROutes

app.use("/state/", require("./routes/api/states"));

app.use("/:state/funfact", require("./routes/api/states"));

app.use("/:state/capital", require("./routes/api/states"));

// Handle 404 Page NOt Found Errors for un-defined routes

// Error Logger
app.use(errorHandler);

//Express is listening
const server = app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log(path.join(__dirname));
	console.log(`${indexpath}`);
});
