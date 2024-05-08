const express = require("express");
const path = require("path");
const router = express();

// Routes
// Default Route :/
router.get("^/$|/index(.html)?$", (req, res) => {
	res.status(200).sendFile(path.join(__dirname + "/views/index.html"));
});

// States routes :/states/
router.get("^/states/$|/states(.json)?$", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "model", "states.json"));
});

router.get("*", (req, res) => {
	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

module.exports = router;
