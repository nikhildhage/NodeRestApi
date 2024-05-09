const express = require("express");
const router = express();

const stateController = require("../../controllers/statesController");

router.route("/states/$").get(stateController.getAllStates);
router.route("/:state").get(stateController.getState);
router.route("/:state/funfact").get(stateController.getState);
module.exports = router;
