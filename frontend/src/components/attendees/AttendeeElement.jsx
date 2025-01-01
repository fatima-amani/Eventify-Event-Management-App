import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

export default function AtteendeeElement({ attendee, refreshAttendees }) {
  const deleteAttendee = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3000/attendee/${attendee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
    <ListItem >
      <ListItemIcon>
        <AccountCircleIcon fontSize="large" />
      </ListItemIcon>
      <ListItemText primary={attendee.name} />
      <Button variant="outlined" onClick={deleteAttendee}>
        Delete
      </Button>
    </ListItem>
  );
}
