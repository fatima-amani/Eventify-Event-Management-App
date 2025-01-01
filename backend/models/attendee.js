const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Event schema 
const attendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
 });
  
const Attendee = mongoose.model('Attendee', attendeeSchema);
module.exports = Attendee;

