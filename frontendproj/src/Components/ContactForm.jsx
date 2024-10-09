import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./fig.css";

const centerLabelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "-5px 10px 0",
};

const inputTextStyle = {
  textAlign: "left",
  margin: "10px 10px 0",
};

export default function ContactForm() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "225px",
          borderRadius: "10px",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", width: "225px", marginRight: "10px" }}>
          <TextField
            id="outlined-basic"
            label={<div style={centerLabelStyle}>Όνομα</div>}
            variant="standard"
            className="group-67 elevation rectangle-7"
            InputProps={{
              disableUnderline: true,
              style: { ...inputTextStyle, maxWidth: "25ch" },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "225px" }}>
          <TextField
            id="outlined-basic"
            label={<div style={centerLabelStyle}>Επώνυμο</div>}
            variant="standard"
            className="group-67 elevation rectangle-7"
            InputProps={{
              disableUnderline: true,
              style: { ...inputTextStyle, maxWidth: "25ch" },
            }}
          />
        </Box>
      </div>

      <TextField
        id="outlined-basic"
        label={<div style={centerLabelStyle}>Email</div>}
        variant="standard"
        className="group-67 elevation rectangle-7"
        InputProps={{
          disableUnderline: true,
          style: { ...inputTextStyle, width: "25ch" },
        }}
      />
    </Box>
  );
}
