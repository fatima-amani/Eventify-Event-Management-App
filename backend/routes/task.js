const express = require("express");
const router = express.Router();
const taskController = require("../controller/task.js");

router
    .get("/", taskController.getTasks)
    .post("/", taskController.createTask);

router
  .get("/:eventId", taskController.getTasksForEvent)
  .put("/:taskId", taskController.updateTaskStatus);

module.exports = router;
