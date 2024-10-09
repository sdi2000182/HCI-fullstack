import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TutorMenu = ({ activePage }) => {
  const navigate = useNavigate();

  const handleButtonClick = (page) => {
    switch (page) {
      case "ΑΡΧΙΚΗ":
        navigate('/');
        break;
      case "ΜΑΘΗΜΑΤΑ":
        navigate('/classes');
        break;
      case "ΒΑΘΜΟΛΟΓΙΟ":
        navigate('/gradebook');
        break;
      case "ΙΣΤΟΡΙΚΟ":
        navigate('/history');
        break;
      case "ΠΙΣΤΟΠΟΙΗΤΙΚΑ":
        navigate('/certificates');
        break;
      case "ΒΟΗΘΕΙΑ":
        navigate('/tutor-help');
        break;
      case "ΕΠΙΚΟΙΝΩΝΙΑ":
        navigate('/contact');
        break;

      default:
        break;
    }
  };

  return (
    <ButtonGroup
      variant="contained"
      style={{
        height: "36px",
        left: "0px",
        width: "100%", 
        display: "flex",
      }}
    >
      <Button
        style={{
          width: "100%",
          backgroundColor: activePage === "ΑΡΧΙΚΗ" ? "#787878" : "#6A5ACD",
        }}
        onClick={() => handleButtonClick("ΑΡΧΙΚΗ")}
      >
        ΑΡΧΙΚΗ
      </Button>
      <Button
        style={{
          width: "100%",
          backgroundColor: activePage === "ΜΑΘΗΜΑΤΑ" ? "#787878" : "#6A5ACD",
        }}
        onClick={() => handleButtonClick("ΜΑΘΗΜΑΤΑ")}
      >
        ΜΑΘΗΜΑΤΑ
      </Button>
      <Button
        style={{
          width: "100%",
          backgroundColor: activePage === "ΒΑΘΜΟΛΟΓΙΟ" ? "#787878" : "#6A5ACD",
        }}
        onClick={() => handleButtonClick("ΒΑΘΜΟΛΟΓΙΟ")}
      >
        ΒΑΘΜΟΛΟΓΙΟ
      </Button>
      <Button
        style={{
          width: "100%",
          backgroundColor: activePage === "ΒΟΗΘΕΙΑ" ? "#787878" : "#6A5ACD",
        }}
        onClick={() => handleButtonClick("ΒΟΗΘΕΙΑ")}
      >
        ΒΟΗΘΕΙΑ
      </Button>
      <Button
        style={{
          width: "100%",
          backgroundColor: activePage === "ΕΠΙΚΟΙΝΩΝΙΑ" ? "#787878" : "#6A5ACD",
        }}
        onClick={() => handleButtonClick("ΕΠΙΚΟΙΝΩΝΙΑ")}
      >
        ΕΠΙΚΟΙΝΩΝΙΑ
      </Button>
    </ButtonGroup>
  );
};

export default TutorMenu;
