import LoggedNavbar from "../../Components/navbarLOGGED";
import TutorMenu from "../../Components/menututor";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField, Breadcrumbs, Link, Typography } from "@mui/material";
import "@fontsource/fira-sans";
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../Components/footer";
import axios from 'axios';
import { useState, useEffect,useRef } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from "jwt-decode";
import UploadComponent from "../../Components/uploadVathmologio";
import CustomizedDataGrid from "../../Components/Vathmologio";
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { useParams } from "react-router-dom";
import { forceUpdate } from "react";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const primary = {
  main: '#6A5ACD',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const theme = createTheme({
  palette: {
    primary: primary,
  },
});

const backBoxStyles = {
  position: 'relative',
  background: '#C2AC5D',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"50px",
  width:"auto",
  textTransform: 'none',
  marginTop:"3%",
}

const submitBoxStyles = {
  position: 'relative',
  background: '#047857',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"70px",
  width:"300px",
  textTransform: 'none',
  marginTop:"2%",
}

const tempBoxStyles = {
  position: 'relative',
  background: '#7C39A5',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"50px",
  width:"auto",
  textTransform: 'none',
  marginTop:"3%",
}


function UploadGrades() {
  const uploadComponentRef = useRef(null);
  const uploadVathmologioRef = useRef(null);
  const [reloadComponent, setReloadComponent] = useState(false);
  const {classID} = useParams();
  const [gridKey, setGridKey] = useState(0);
  const [originalData, setOriginalData] = useState([]);
  const [revert, setRevert] = useState(false);
  const [temporary, setTemporary] = useState(false);
  const [classData, setClassData] = useState([]);
  const [isFinal, setIsFinal] = useState([]); 
  const [isFinalFront,setIsFinalFront] = useState(false);
  const navigate = useNavigate();

  
  const handleSubmitButtonClick = () => {
    if (uploadComponentRef.current.unsavedChanges === true) {
      uploadComponentRef.current.handleUploadClick(1);
      setReloadComponent(true);
      setIsFinalFront(true);
      setTimeout(() => {
        setGridKey((prevKey) => prevKey + 1);
      }, 1000); 
    }

    if (uploadVathmologioRef.current.unsavedChanges === true) {
      uploadVathmologioRef.current.handleUploadClick(1);
      setReloadComponent(true);
      setIsFinalFront(true);

      setTimeout(() => {
        setGridKey((prevKey) => prevKey + 1);
      }, 1000); 
    }

  };

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/get_enrolled_students', {
      Class_ID: classID,
      Semester: 'Χειμερινό Εξάμηνο 2023',
    })
    .then(response => {
     setOriginalData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  
    axios.post('http://127.0.0.1:5000/get_one_class', {
      Class_ID: classID,})
    .then(response => {
      setClassData(response.data.class);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

    axios.post(`http://127.0.0.1:5000/check_final_grades/${classID}`, {
      Semester: 'Χειμερινό Εξάμηνο 2023',
    })

    .then(response => {
      setIsFinal(response.data.all_final);
    })

  }, []);

  const resetRevert = () => {
    setRevert(false);
  };

  useEffect(() => {
    if (revert) {
      const timeoutId = setTimeout(resetRevert, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [revert]);

  const resetTemp = () => {
    setTemporary(false);
  };

  useEffect(() => {
    if (temporary) {
      const timeoutId = setTimeout(resetTemp, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [temporary]);

  const handleTempButtonClick = () => {
    if (uploadComponentRef.current.unsavedChanges === true) {
      uploadComponentRef.current.handleUploadClick(0);
      setReloadComponent(true);

      setTimeout(() => {
        setGridKey((prevKey) => prevKey + 1);
      }, 1000); 
    }

    if (uploadVathmologioRef.current.unsavedChanges === true) {
      uploadVathmologioRef.current.handleUploadClick(0);
      setReloadComponent(true);

      setTimeout(() => {
        setGridKey((prevKey) => prevKey + 1);
      }, 1000); 
    }

    setTemporary(true);
  };


  const handleCancelButtonClick = () => {
    axios.post(`http://127.0.0.1:5000/upload_grades_regular/${classID}/0`, originalData)
    .then(response => {
      setRevert(true);
      setReloadComponent(true);
      setTimeout(() => {
        setGridKey((prevKey) => prevKey + 1);
      }, 1000); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  };
  


  const uploadComponentProps = {
    classID: classID,
  };
  
  
  
  return (
    <div>
      <LoggedNavbar />
      <TutorMenu activePage='ΒΑΘΜΟΛΟΓΙΟ'/>
      <div style={{marginBottom:"350px"}}>
      <div style={{ display: "flex", flexDirection: "row", margin: "1%" }}>
      <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
        <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
          <Link color="inherit" href="/gradebook">
            Βαθμολόγιο
          </Link>
          <span style={{ color: "#6A5ACD" }}>Δημιουργία Νέου Βαθμολογίου</span>
        </Breadcrumbs>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          backgroundColor: "#f0f0f0", 
          padding: "10px", 
          margin: "20px",
          borderRadius: "8px", 
          height: "100%", 
          alignItems: "start", 
        }}
      >
        <div style={{ flexDirection: "row", display: "flex" }}>
  
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            width: "27ch",
            marginLeft: "2%",
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
            Δημιουργία Νέου Βαθμολογίου
          </h1>
        </div>
        <Divider aria-hidden="true" style={{ marginBottom: "10px", width: "42vw" }} />
        <div style={{
          
        }}>
        {classData[0] && (
        <h3 style={{
              fontFamily: "Fira Sans",
              color: "black",
              marginLeft: "30px",
            }}>
              Μάθημα: {classData[0].Name}
              
        </h3>
        )}
        </div>
        {console.log("isFinal",isFinal)}
        {isFinal!==true && isFinalFront!==true?  (
          < >
          <div style={{ flexDirection: "row", display: "flex", flex: "1", flexWrap: "wrap", gap: "50px", marginLeft: "2%", alignItems: "center" }}>
            <CustomizedDataGrid key={gridKey} ref={uploadVathmologioRef} classID={classID} reloadComponent={reloadComponent} />
            <span>ή</span>
            <UploadComponent ref={uploadComponentRef} classID={classID} />
          </div>
          <div style={{ flexDirection: "row", display: "flex", flex: "1", flexWrap: "wrap", marginLeft: "2%", gap: "30px" }}>
            <Button style={submitBoxStyles} onClick={handleSubmitButtonClick}>Οριστική Υποβολή Βαθμολογίου <MoveToInboxIcon sx={{ marginLeft: "10px" }} /></Button>
            <Button style={tempBoxStyles} onClick={handleTempButtonClick}>Προσωρινή Αποθήκευση <SaveIcon sx={{ marginLeft: "10px" }} /></Button>
            <Button style={backBoxStyles} onClick={handleCancelButtonClick}>Αναίρεση Αλλαγών <SettingsBackupRestoreIcon sx={{ marginLeft: "10px" }} /></Button>
            {revert && (
              <div style={{ color: "green", marginTop: "50px" }}>
                Έχετε επαναφέρει τις αλλαγές σας
              </div>
              
            )}
            {temporary && (
              <div style={{ color: "green", marginTop: "50px" }}>
                Έχετε αποθηκεύσει προσωρινά την δήλωση σας
              </div>
              
            )}
          </div>
          </>
        ) : (
          <div>
            <h3 style={{
              fontFamily: "Fira Sans",
              color: "green",
              marginLeft: "30px",
            }}>
             Έχει οριστικοποιηθεί το βαθμολόγιο του μαθήματος
              
        </h3>
          </div>
        )}
      </Box>
      </div>
      <Footer/>
    </div>
  );

}

export default UploadGrades;
