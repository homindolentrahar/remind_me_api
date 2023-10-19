const express = require("express");
const router = express.Router();

const reminderController = require("../controllers/reminder_controller");

router.get("/:id", reminderController.getReminder);
router.post("/", reminderController.enableReminder);
router.put("/:id", reminderController.toggleReminder);

module.exports = router;
