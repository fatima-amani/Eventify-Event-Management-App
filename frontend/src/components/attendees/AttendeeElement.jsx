import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

export default function AtteendeeElement({ attendee, refreshAttendees }) {
  const deleteAttendee = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/attendee/${attendee._id}`,
        {
          method: "DELETE", 
        }
      );
      if (response.ok) {
        refreshAttendees();
      } else {
        alert("Failed to delete the Attendee");
      }
    } catch (err) {
      alert("Error deleting Attendee: " + err.message);
    }
  };

  return (
    <ListItem>
      <ListItemIcon>
        <AccountCircleIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText primary={attendee.name} />
      <Button variant="outlined" onClick={() => deleteAttendee()}>
        Delete
      </Button>

      
      
    </ListItem>
  );
}
