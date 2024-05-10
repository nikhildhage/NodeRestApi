const states = require("../model/states.json");

const validateState = (req, res, next) => {
	const stateCode = req.params.state.toUpperCase();
	if (states.some((state) => state.abbreviation === stateCode)) {
		req.stateCode = stateCode; // Normalize state code to uppercase
		next();
	} else {
		res.status(404).json({ error: "Invalid state abbreviation" });
	}
};

module.exports = validateState;
