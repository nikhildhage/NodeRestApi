const fs = require("fs");
const path = require("path");

const readStatesFile = () => {
	const filePath = path.join(__dirname, "..", "model", "states.json");

	try {
		const fileData = fs.readFileSync(filePath, "utf8");
		const states = JSON.parse(fileData);
		return states;
	} catch (err) {
		if (err.code === "ENOENT") {
			console.error("Error: states.json file not found");
			return [];
		} else if (err instanceof SyntaxError) {
			console.error("Error: Invalid JSON format in states.json file");
			return [];
		} else {
			console.error("Error reading states.json file:", err);
			return [];
		}
	}
};

const States = readStatesFile();
//Get States methods
const getAllStates = async (req, res) => {
	try {
		States = await States.find();
		console.log(States);
		if (States.length === 0) {
			return res.status(404).json({ message: "No states found" });
		}
		res.json(States);
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
		console.error(err);
	}
};

const getAllContiguousStates = (req, res) => {};
const getAllNonContiguousStates = (req, res) => {};
const getState = (req, res) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	res.json(state);
};

const getStateFunFact = (req, res) => {};
const getStateCapital = (req, res) => {};
const getStateNickname = (req, res) => {};
const getStatePopulation = (req, res) => {};

const addStateFunFacts = (req, res) => {};
const UpdateStateFunFacts = (req, res) => {};
const DeleteStateFunFacts = (req, res) => {};

module.exports = {
	getAllStates,
	getAllContiguousStates,
	getAllNonContiguousStates,
	getState,
	getStateFunFact,
	getStateCapital,
	getStateNickname,
	getStatePopulation,
	addStateFunFacts,
	UpdateStateFunFacts,
	DeleteStateFunFacts,
};
