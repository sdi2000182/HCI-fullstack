import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PublicIcon from "@mui/icons-material/Public";

const CustomComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("Ελληνικά");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    handleClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          width: "135px",
          height: "36px",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "13px",
            color: "#FFFFFF",
            marginRight: "4px",
          }}
        >
          {selectedLanguage}
        </span>
        <PublicIcon style={{ color: "#FFFFFF" }} />
        <ArrowDropDownIcon
          style={{
            color: "#FFFFFF",
            transform: isMenuOpen ? "rotate(0deg)" : "rotate(90deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleLanguageChange("Ελληνικά")}>
          Ελληνικά
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("English")}>
          English
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("Français")}>
          Français
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("Español")}>
          Español
        </MenuItem>
        <MenuItem onClick={() => handleLanguageChange("日本語")}>
          日本語
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomComponent;
