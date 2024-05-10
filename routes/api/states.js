const express = require("express");
const router = express();

const stateController = require("../../controllers/statesController");

router.get("/states", stateController.getState);

router.route("/:state").get(stateController.getState);
router.route("/:state/funfact").get(stateController.getStateFunFact);
router.route("/:state/capital").get(stateController.getStateCapital);

module.exports = router;
