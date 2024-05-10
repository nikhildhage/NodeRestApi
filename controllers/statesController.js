const fs = require("fs-extra");

const file = "./model/states.json";

async function readFile(f) {
	const S = await fs.readJson(f, { throws: false });
	console.log(States); // => null
	return S;
}

const States = readFile(file);

console.log(States);
function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Get States
const getAllStates = (req, res) => {
	const states = States.find();
	if (!states) {
		return res.status(400).json({ message: "No employees found!" });
	}
	res.json(states);
};

const getAllContiguousStates = (req, res, next) => {};
const getAllNonContiguousStates = (req, res, next) => {};
const getState = (req, res, next) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	res.json(state);
};

const getStateFunFact = (req, res) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	res.json(getRandomElement(state.funfacts));
};

const getStateCapital = (req, res, next) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	const statename = state.state;
	const stateCapital = state.capital;
	const stateData = {
		statename: statename,
		stateCapital: stateCapital,
	};
	res.json(stateData);
};
const getStateNickname = (req, res) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	const statename = state.state;
	const stateNickname = state.nickname;
	const stateData = {
		statename: statename,
		stateNickname: stateNickname,
	};
	res.json(stateData);
};
const getStatePopulation = (req, res) => {
	const stateCode = req.params.state;
	const state = States.find((state) => state.code == stateCode);
	const statename = state.state;
	const statePopulation = state.population;
	const stateData = {
		statename: statename,
		statePopulation: statePopulation,
	};
	res.json(stateData);
};

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
