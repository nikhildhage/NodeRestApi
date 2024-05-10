// Import dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Custom middleware and configurations
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

// Connect to MongoDB
mongoose
	.connect(process.env.DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

// Define variables
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(logger);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/states", require("./routes/api/states")); // Adjusted to point to /states for REST API root

// Error handling for undefined routes
app.all("*", (req, res) => {
	const acceptType = req.headers["accept"];
	if (acceptType && acceptType.includes("application/json")) {
		res.status(404).json({ error: "404 Not Found" });
	} else {
		res.status(404).sendFile(path.join(__dirname, "views/404.html"));
	}
});

// Global error handling
app.use(errorHandler);

// Server listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
