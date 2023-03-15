const router = require("express").Router();
const { createRecords, getRecords } = require("../controller/taskController");

router.post("/create", createRecords);
router.get("/getrecords", getRecords);

module.exports = router;
