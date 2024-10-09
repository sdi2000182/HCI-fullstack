import AddIcon from "@mui/icons-material/Add";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Buttons.css";

function ViewGrades() {
  return (
    <button className="view-grades">Προβολη αναλυτικής βαθμολογίας</button>
  );
}

function Add(props) {
  const navigate = useNavigate();

  const handleAddGrades = () => {
    navigate(`/${props.where}/${props.classID}`)
  }

  const buttonStyle = {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "slateblue",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease", 
    ":hover": {
      background: "darkslateblue",
    },
  };

  const iconStyle = {
    fontSize: "20px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <button className="edit-info" style={buttonStyle} onClick={handleAddGrades}>
      <span role="img" aria-label="eye" style={iconStyle}>
        <AddIcon />
      </span>
    </button>
  );
}

function EditPersonalInfo() {
  return (
    <button className="edit-info">
      Επεξεργασία Προσωπικών Στοιχείων
      <EditIcon style={{ fontSize: "1.5rem" }} />
    </button>
  );
}

function Eye(props) {
  const navigate = useNavigate();
  const handleViewGrades = () => {
    navigate(`/${props.where}/${props.classID}`)
  }

  return (
    <button className="edit-info" onClick={handleViewGrades}>
      <span role="img" aria-label="eye">
        <RemoveRedEyeOutlinedIcon />
      </span>
    </button>
  );
}

function Pencil(props) {
  const navigate = useNavigate();
  const handleViewGrades = () => {
    navigate(`/${props.where}/${props.classID}`)
  }
  return (
    <button className="edit-info" onClick={handleViewGrades}>
      <span role="img" aria-label="pencil">
        <CreateOutlinedIcon />
      </span>
    </button>
  );
}

function Apply(props) {
  const navigate = useNavigate();

  const handleApplyButton = ()=>{
    navigate(`/create-certificate/${props.type}/${props.counter}`)
  }

  return (
    <button
      className="apply-button"
      style={{ display: "flex", alignItems: "center", padding: "3px 12px" }}
      onClick={handleApplyButton}
    >
      <span style={{ marginRight: "8px" }}>Αίτηση</span>
      <span role="img" aria-label="paper">
        <PostAddOutlinedIcon />
      </span>
    </button>
  );
}


function ViewApplication() {

  return (
    <button className="view-grades" >
      Προβολη Δηλωσης
      <span role="img" aria-label="eye">
        <RemoveRedEyeOutlinedIcon />
      </span>
    </button>
  );
}



function ViewCertificates() {
  const navigate = useNavigate();

  const handleViewCertificates = () => {
    navigate("/certificates/download");
  };

  return (
    <button
      className="view-grades"
      style={{ display: "flex", alignItems: "center" }}
      onClick={handleViewCertificates}
    >
      <span style={{ marginRight: "8px" }}>Τα πιστοποιητικά μου</span>
      <span role="img" aria-label="eye">
        <RemoveRedEyeOutlinedIcon />
      </span>
    </button>
  );
}

function Submit() {
  return (
    <button
      className="view-grades"
      style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
    >
      ΥΠΟΒΟΛΗ
      <SendSharpIcon style={{ marginLeft: "5px" }} />
    </button>
  );
}

function SubmitCertificate() {
  return (
    <button
      className="view-grades"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "920px",
        height: "50px", 
        fontSize: "20px", 
        marginTop: "20px", 
      }}
    >
      ΥΠΟΒΟΛΗ
    </button>
  );
}

function SubmitClasses() {
  return (
    <button
      style={{
        backgroundColor: "darkgreen ",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Οριστικοποίηση Δήλωσης
    </button>
  );
}

export {
  Add, Apply, EditPersonalInfo,
  Eye,
  Pencil, Submit, SubmitCertificate, SubmitClasses, ViewApplication,
  ViewCertificates, ViewGrades
};

