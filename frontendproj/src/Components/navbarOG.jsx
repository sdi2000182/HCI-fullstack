import React, { useState } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LanguageDropdown from "./languagedropdown.jsx"; // Import your LanguageDropdown component
import mystudieslogo from "./mystudieslogo.png";
import { Link, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';

function SimplifiedNavbar() {
  const location = useLocation();
  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "#282828", height: "70px"}}
    >
      <Toolbar sx={{ minHeight: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/">
          <img
            src={mystudieslogo}
            alt="Logo"
            style={{
              maxWidth: "150px",
            }}
            href="/"
          />
          </Link>
        </div>
        
        <div>
        <Typography
        component={Link}
        to="/"
        variant="body1"
        sx={{
          color: "white",
          fontFamily: "Roboto",
          marginRight: "16px",
          textDecoration: "none",
          ...(location.pathname === '/' && { textDecoration: 'underline' }),
        }}
      >
        ΑΡΧΙΚΗ
      </Typography>
      <Typography
        component={Link}
        to="/teachers"
        variant="body1"
        sx={{
          color: "white",
          fontFamily: "Roboto",
          marginRight: "16px",
          textDecoration: "none",
          ...(location.pathname === '/teachers' && { textDecoration: 'underline' }),
        }}
      >
        ΚΑΘΗΓΗΤΕΣ
      </Typography>
      <Typography
        component={Link}
        to="/students"
        variant="body1"
        sx={{
          color: "white",
          fontFamily: "Roboto",
          marginRight: "16px",
          textDecoration: "none",
          ...(location.pathname === '/students' && { textDecoration: 'underline' }),
        }}
      >
        ΦΟΙΤΗΤΕΣ
      </Typography>
        </div>
        <div>
        
          <LanguageDropdown />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default SimplifiedNavbar;