const express = require('express');
const router = express.Router();
const attendeeController = require('../controller/attendee.js');

router.route("/")
    .get(attendeeController.getAttendee)
    .post(attendeeController.createAttendee)

router.route("/:id")
    .delete(attendeeController.deleteAttendee);

module.exports = router;
