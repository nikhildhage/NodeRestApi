const states = require("../model/states.json");

const validateState = (req, res, next) => {
	const stateCode = req.params.state.toUpperCase();
	if (states.some((state) => state.code === stateCode)) {
		console.log(stateCode);
		console.log(req.stateCode);
		req.stateCode = stateCode; // Normalize state code to uppercase
		next();
	} else {
		console.log(stateCode);
		console.log(req.stateCode);
		res.status(404).json({ error: "Invalid state abbreviation" });
	}
};

module.exports = validateState;
