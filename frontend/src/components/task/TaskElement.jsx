import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

export default function TaskElement({ task, refreshTasks }) {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const updateTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/task/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: taskStatus }), // Send the updated status
      });

      if (response.ok) {
        refreshTasks(); // Refresh the tasks after a successful update
      } else {
        alert("Failed to update the task");
      }
    } catch (err) {
      alert("Error updating task: " + err.message);
    }
  };

  const handleChange = async () => {
    const newStatus = taskStatus === "Pending" ? "Completed" : "Pending";
    setTaskStatus(newStatus); // Update the local state
    await updateTask(); // Send the update to the server
  };

  return (
    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary={task.name} />
        <ListItemIcon>
          <Checkbox
            checked={taskStatus === "Completed"}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </ListItemIcon>
      </ListItemButton>
    </List>
  );
}
