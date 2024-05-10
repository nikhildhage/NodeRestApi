const express = require("express");
const router = express.Router();
const State = require("../../model/States"); // MongoDB model for States
const validateState = require("../../middleware/validateState"); // Middleware to validate state codes
const statesData = require("../../model/states.json"); // Static JSON data for states

// Utility to merge state data with fun facts from MongoDB
async function mergeStateData(states) {
	const mergedStates = await Promise.all(
		states.map(async (state) => {
			const funFactData = await State.findOne({
				stateCode: state.code,
			});
			return {
				...state,
				funfacts: funFactData ? funFactData.funfacts : [],
			};
		})
	);
	return mergedStates;
}

// GET all states or by contiguity
router.get("/", async (req, res) => {
	try {
		const { contig } = req.query;
		let filteredStates = statesData;
		if (contig !== undefined) {
			const contiguousStates = ["AK", "HI"];
			const isContig = contig === "true";
			filteredStates = statesData.filter((state) =>
				isContig
					? !contiguousStates.includes(state.code)
					: contiguousStates.includes(state.code)
			);
		}
		const states = await mergeStateData(filteredStates);
		res.json(states);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET specific state data with fun facts
router.get("/:state", validateState, async (req, res) => {
	try {
		const stateData = statesData.find((state) => state.code === req.stateCode);
		if (stateData) {
			const response = {
				...stateData,
				funfacts: stateData ? stateData.funfacts : [],
			};
			res.json(response);
		} else {
			res.status(404).json({ message: "State not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET random fun fact for a specific state
router.get("/:state/funfact", validateState, async (req, res) => {
	try {
		const state = statesData.find((state) => state.code === req.stateCode);
		console.log(state.funfacts);
		if (state.funfacts && state.funfacts.length > 0) {
			const funFact =
				state.funfacts[Math.floor(Math.random() * state.funfacts.length)];
			//console.log(funFact);
			res.json({ funfact: funFact });
		} else {
			//console.log(funFact);
			res.status(404).json({ message: "No fun facts found for this state" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Additional specific attribute endpoints
router.get("/:state/capital", validateState, async (req, res) => {
	const state = statesData.find((s) => s.code === req.stateCode);
	if (state) {
		res.json({ state: state.name, capital: state.capital_city });
	} else {
		res.status(404).json({ error: "State Capital not found" });
	}
});

router.get("/:state/nickname", validateState, async (req, res) => {
	const state = statesData.find((s) => s.code === req.stateCode);
	if (state) {
		res.json({ state: state.name, nickname: state.nickname });
	} else {
		res.status(404).json({ error: "State Nickname not found" });
	}
});

router.get("/:state/population", validateState, async (req, res) => {
	const state = statesData.find((s) => s.code === req.stateCode);
	if (state) {
		res.json({ state: state.name, population: state.population });
	} else {
		res.status(404).json({ error: "State Population not found" });
	}
});

router.get("/:state/admission", validateState, async (req, res) => {
	const state = statesData.find((s) => s.code === req.stateCode);
	if (state) {
		res.json({ state: state.name, admitted: state.admission_date });
	} else {
		res.status(404).json({ error: "State Admission Date not found" });
	}
});

// POST fun facts to a specific state
router.post("/:state/funfact", validateState, async (req, res) => {
	if (!req.body.funfacts || !Array.isArray(req.body.funfacts)) {
		return res.status(400).json({ message: "Invalid fun facts data" });
	}
	try {
		const funFactData = await State.findOneAndUpdate(
			{ stateCode: req.stateCode },
			{ $push: { funfacts: { $each: req.body.funfacts } } },
			{ new: true, upsert: true }
		);
		res.json(funFactData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// PATCH a specific fun fact
router.patch("/:state/funfact", validateState, async (req, res) => {
	const { index, funfact } = req.body;
	if (!index || !funfact) {
		return res.status(400).json({ message: "Missing index or funfact" });
	}
	try {
		const state = await State.findOne({ stateCode: req.stateCode });
		if (!state || !state.funfacts[index - 1]) {
			return res.status(404).json({ message: "Fun fact does not exist" });
		}
		state.funfacts[index - 1] = funfact;
		await state.save();
		res.json(state);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// DELETE a specific fun fact
router.delete("/:state/funfact", validateState, async (req, res) => {
	const { index } = req.body;
	if (!index) {
		return res.status(400).json({ message: "Missing index" });
	}
	try {
		const state = await State.findOne({ stateCode: req.stateCode });
		if (!state || !state.funfacts[index - 1]) {
			return res.status(404).json({ message: "Fun fact does not exist" });
		}
		state.funfacts.splice(index - 1, 1);
		await state.save();
		res.json(state);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
