import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CelebrationIcon from '@mui/icons-material/Celebration';



export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          {/* Icon */}
          <CelebrationIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }} // Margin between icon and text
          />

          {/* Text */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontSize: '1.5rem' }}
          >
            Eventify - Simplifying Event Management
          </Typography>
          &nbsp; &nbsp;
          <CelebrationIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }} // Margin between icon and text
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}