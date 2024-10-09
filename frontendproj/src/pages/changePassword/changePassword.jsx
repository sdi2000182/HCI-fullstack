import React, { useState } from "react";
import axios from 'axios';
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import TutorMenu from "../../Components/menututor";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField, Alert } from "@mui/material";
import "@fontsource/fira-sans";
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../Components/footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertProblem, setAlertProblem] = useState('');
  const navigate = useNavigate();

  const isTutor = jwtDecode(localStorage.getItem('token')).sub.isTutor;

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setAlertProblem('');
    setAlertMessage('');

    // Check if new password matches confirmation
    if (newPassword !== confirmPassword) {
      setAlertProblem('Δεν ταιριάζει ο νέος κωδικός και η επιβεβαίωση');
      return;
    }

    // Check if new password is at least 8 characters
    if (newPassword.length < 8) {
      setAlertProblem('Ο νέος κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/update/password', {
        current_password: currentPassword,
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.message === 'Ο κωδικός άλλαξε με επιτυχία'){
        setAlertMessage(response.data.message);
      }else{
        setAlertProblem(response.data.message);
      }
      

    } catch (error) {
      setAlertProblem('Πρόβλημα κατά την αλλαγή κωδικού');
      console.error('Error during password change:', error);
    }
  };

  return (
    <div>
      <LoggedNavbar />
      {isTutor==1 ? <TutorMenu activePage="ΑΡΧΙΚΗ"/> : <CustomButtonGroup activePage="ΑΡΧΙΚΗ" />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", 
          backgroundColor: "#f0f0f0", 
          padding: "10px", 
          margin: "20px", 
          borderRadius: "8px", 
          height: "78vh", 
          alignItems: "start", 
        }}
      >
        <div style={{flexDirection:"row", display:"flex"}}>
        <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "30px" , '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            width: "auto",
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
            marginLeft:"20px"

          }}>
            Αλλαγή Κωδικού Πρόσβασης
          </h1>
        </div>
        <Divider aria-hidden="true" style={{ marginBottom: "10px", width: "42vw" }} />
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "24px",
            height: "60vh",
            width: "40vw",
            boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
            display: "flex",
          }}
        >
          <ThemeProvider theme={theme}>
            <form onSubmit={handlePasswordChange}>
              
              <TextField
                type="password"
                name="current_password"
                label="Τρέχων Κωδικός"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                type="password"
                name="new_password"
                label="Νέος Κωδικός"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                style={{ color: "#6A5ACD" }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                type="password"
                name="confirm_password"
                label="Επιβεβαίωση Κωδικού"
                fullWidth
                required
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div style={{display:"flex", flexDirection:"left"}}>
              {alertProblem && (
                <p style={{ marginBottom: '10px', color:"red" }}>
                  {alertProblem}
                </p>
              )}
              {alertMessage && (
                <p style={{ marginBottom: '10px', color:"green" }}>
                  {alertMessage}
                </p>
              )}
              </div>
              <Button type="submit" variant="contained" margin="normal" style={{ backgroundColor: "#6A5ACD", marginTop: "10px", marginRight:"82%", textTransform:"none", whiteSpace:"nowrap"}}>
                Αποθήκευση Αλλαγών
              </Button>
            </form>
          </ThemeProvider>
        </div>
      </Box>
      <Footer/>
    </div>
  );
}

export default ChangePasswordPage;
