import React, { useState } from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export default function AssignAttendee({
  setIsAssigning,
  refreshAttendees,
  attendees,
}) {
  const [selectedAttendee, setSelectedAttendee] = useState("");

  const handleAttendeeChange = (event) => {
    setSelectedAttendee(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAttendee) {
      alert("Please select an attendee!");
      return;
    }

    setIsAssigning(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Assign Attendee</h2>

      <FormControl fullWidth style={{ marginBottom: "16px" }}>
        <InputLabel id="attendee-select-label">Select Attendee</InputLabel>
        <Select
          labelId="attendee-select-label"
          value={selectedAttendee}
          onChange={handleAttendeeChange}
          label="Select Attendee"
        >
          {attendees.map((attendee) => (
            <MenuItem key={attendee._id} value={attendee.name}>
              {attendee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: "8px" }}
        >
          Assign
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setIsAssigning(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
