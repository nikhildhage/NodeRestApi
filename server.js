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

// Error Logger
app.use(errorHandler);

//Express is listening
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
	console.log(path.join(__dirname));
	console.log(`${indexpath}`);
});
