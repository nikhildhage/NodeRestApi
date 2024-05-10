const fetch = require("node-fetch");

const file = "./model/states.json";

async function fetchJSONData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching JSON:", error);
		throw error; // Rethrow the error for the caller to handle
	}
}

function getRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Get States
const getAllStates = async (req, res, next) => {
	try {
		const jsonData = await fetchJSONData("path_to_your_json_file.json");
		res.json(jsonData);
	} catch (error) {
		res.status(500).send("Error fetching JSON data");
	}
};

const getAllContiguousStates = (req, res, next) => {};
const getAllNonContiguousStates = (req, res, next) => {};
const getState = async (req, res, next) => {
	try {
		const States = await fetchJSONData("../model/states.json");
		const stateCode = req.params.state;
		const state = States.find((state) => state.code == stateCode);
		res.json(state);
	} catch (error) {
		res.status(500).send("Error fetching JSON data");
	}
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
