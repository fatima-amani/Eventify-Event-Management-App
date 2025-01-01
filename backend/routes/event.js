const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.js');

router.route("/")
    .get(eventController.getEvents)
    .post(eventController.createEvent)

router.route("/:id")
    .put(eventController.updateEvent)
    .delete(eventController.deleteEvent);

module.exports = router;
