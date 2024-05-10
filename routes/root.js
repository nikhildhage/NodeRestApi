const express = require("express");
const path = require("path");
const router = express();

// Routes
// Default Route :/
router.get("^/$|/index(.html)?$", (req, res) => {
	res.status(200).sendFile(path.join(__dirname, "..", "/views/index.html"));
});

module.exports = router;
