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
import AtteendeeElement from "./AttendeeElement";

export default function AttendeeCard({ attendees,refreshAttendees }) {

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {attendees.map((attendee, index) => (
            <AtteendeeElement key={attendee._id} attendee={attendee} refreshAttendees={refreshAttendees}/>
          ))}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
