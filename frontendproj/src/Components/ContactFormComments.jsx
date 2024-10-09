import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./fig.css";

const centerLabelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "-3px 10px 0",
};

const inputTextStyle = {
  textAlign: "left",
  margin: "10px 10px 0",
};

export default function ContactFormComments() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "52ch",
          height: "25ch",
          borderRadius: "10px",
          marginTop: "10px",
        },
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label={<div style={centerLabelStyle}>Σχόλια</div>}
        variant="standard"
        className="group-67 elevation rectangle-7"
        InputProps={{
          disableUnderline: true,
          style: inputTextStyle,
        }}
      />
    </Box>
  );
}
