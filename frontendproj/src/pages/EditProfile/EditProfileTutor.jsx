import LoggedNavbar from "../../Components/navbarLOGGED";
import TutorMenu from "../../Components/menututor";
import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField, Breadcrumbs, Link } from "@mui/material";
import "@fontsource/fira-sans";
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../../Components/footer";
import axios from 'axios';
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
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

const buttoninBoxStyles = {
  position: 'relative',
  background: '#6A5ACD',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"36px",
  width:"49px",
  marginTop:"2%"
}

const submitBoxStyles = {
  position: 'relative',
  background: '#6A5ACD',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"50px",
  width:"auto",
  textTransform: 'none',
  marginTop:"2%"
}

const cancelBoxStyles = {
  position: 'relative',
  background: '#D32F2F',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer', 
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height:"auto",
  width:"auto",
  textTransform: 'none',
  marginTop:"2%"
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};



function EditProfileTutor() {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [emailAlert, setEmailAlert] = useState(false);
  const [AddPhoneAlert, setAddPhoneAlert] = useState(false);
  const [PhoneAlert, setPhoneAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.sub.User_ID;

      axios.get('http://127.0.0.1:5000/user/get_one/', {  
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);
 const handleEditClick = () => {
    setIsEditing(true);
    setEmailAlert(false);
    setAddPhoneAlert(false);
    setPhoneAlert(false);
    setEditedData({
      AddPhone: userData?.AddPhone || '',
      Phone: userData?.Phone || '',
      email: userData?.email || '',
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedData.email)) {
      setEmailAlert('Παρακαλώ εισάγετε ένα έγκυρο email');
      return;
    }
  
    if (editedData.AddPhone.length < 10) {
      setAddPhoneAlert('Το τηλέφωνο πρέπει να έχει τουλάχιστον 10 ψηφία');
      return;
    }
  
    if (editedData.Phone.length < 10) {
      setPhoneAlert('Το τηλέφωνο πρέπει να έχει τουλάχιστον 10 ψηφία');
      return;
    }
  
    const updatedData = {
      email: editedData.email,
      AddPhone: editedData.AddPhone,
      Phone: editedData.Phone,
    };
  
    axios.post('http://127.0.0.1:5000/update', updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        axios.get('http://127.0.0.1:5000/user/get_one/', {  
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
          .then(response => {
            setUserData(response.data.user);
          })
          .catch(error => console.error('Error fetching user data:', error));
        setIsEditing(false);
        setEmailAlert(false);
        setAddPhoneAlert(false);
        setPhoneAlert(false);
        setEditedData({});
      })
      .catch(error => {
        console.error('Error updating profile:', error.response.data.message);
      });
  };
  
  const handleCancelClick = () => {
    setIsEditing(false);
    setEmailAlert(false);
    setAddPhoneAlert(false);
    setPhoneAlert(false);
    setEditedData({
      AddPhone: userData?.AddPhone || '',
      Phone: userData?.Phone || '',
      email: userData?.email || '',
    });
  }
  
  
  
  
  return (
    <div>
      <LoggedNavbar />
      <TutorMenu activePage="ΑΡΧΙΚΗ" />
      <div style={{display:"flex", flexDirection:"row", margin:"1%"}}>
      <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
        <Breadcrumbs style={{ margin: "10px", marginLeft:"1%"}}>
            <Link color="inherit" href="/">
              Αρχική
            </Link>
            <span style={{ color: "#6A5ACD" }}>Επεξεργασία Στοιχείων</span>
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
          marginBottom:"70px"
        }}
      >
        <div style={{flexDirection:"row", display:"flex"}}>
        
        
        <h1 style={{
          fontFamily: "Fira Sans",
          fontSize: "40px",
          color: "#6A5ACD",
          width: "auto",
          marginLeft:"2%",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
        }}>
          {userData.First_Name}&#160;{userData.Last_Name}
        </h1>
        </div>
        <Divider aria-hidden="true" style={{ marginBottom: "10px", width: "42vw" }} />
        <div style={{flexDirection:"row", display:"flex", flex: "1",flexWrap: "wrap", gap: "40px"}}>

        <div>
        <h3 style={{
          fontFamily: "Fira Sans",
          color: "#6A5ACD",
          width: "auto",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          textAlign:"left"
        }}>
        Βασικές Πληροφορίες</h3>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            height: "30vh",
            width: "20vw",
            boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
            display: "flex",
          }}
        >
          <ThemeProvider theme={theme}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {userData && (
                <>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Ονοματεπώνυμο</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{`${userData.First_Name} ${userData.Last_Name}`}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Αριθμός Μητρώου</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{userData.User_ID}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Ακαδημαικό email</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{userData.academic_mail}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px",color:"grey"}}>Username</td>
                    <td style={{ textAlign: "left", paddingRight: "10px",color:"grey"}}>{userData.username}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          </ThemeProvider>
        </div>
        </div>

        <div>
        <h3 style={{
          fontFamily: "Fira Sans",
          color: "#6A5ACD",
          width: "auto",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          textAlign:"left"
        }}>
        Στοιχεία Διδάσκοντα</h3>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            height: "30vh",
            width: "20vw",
            boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
            display: "flex",
          }}
        >
          <ThemeProvider theme={theme}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {userData && (
                <>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey" }}>Τμήμα</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Πληροφορικής και Τηλεπικοινωνιών</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Θέση</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>ΕΔΙΠ</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Γραφείο</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd", color: "grey" }}>Α{Math.floor(Math.random() * (60 - 40 + 1)) + 40}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px",color:"grey"}}>Τηλέφωνο Γραφείου</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", color: "grey" }}>210{Math.floor(Math.random() * (9999999 - 1111111 + 1)) + 1111111}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          </ThemeProvider>
        </div>
        </div>

        <div>
      <div style={{ display: "flex", gap: "8%" }}>
        <h3 style={{
          fontFamily: "Fira Sans",
          color: "#6A5ACD",
          width: "auto",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          textAlign: "left"
        }}>
          Πληροφορίες Επικοινωνίας
        </h3>
        <Button style={buttoninBoxStyles} onClick={handleEditClick}>
          <EditIcon />
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          height: "30vh",
          width: "20vw",
          boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
          display: "flex",
        }}
      >
        <ThemeProvider theme={theme}>
          <table style={{ width: "100%", borderCollapse: "collapse"}}> 
          <tbody>
              {userData && (
                <>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Μόνιμη Διεύθυνση Κατοικίας</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>{`${userData.Address}`}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>ΤΚ Μόνιμης Διεύθυνσης Κατοικίας</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>{`${userData.ZIPCode}`}</td>
                  </tr>
                  <tr>
                      <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>Τηλέφωνο Μόνιμης Κατοικίας</td>
                      {isEditing ? (
                        <>
                          <td style={{ textAlign: "left", paddingRight: "10px" }}>
                            <TextField
                              size="small"
                              type="text"
                              name="AddPhone"
                              value={editedData.AddPhone}
                              onChange={handleInputChange}
                            />
                          </td>
                          
                        </>
                      ) : (
                        <td style={{ textAlign: "left", paddingRight: "10px" }}>
                          <TextField
                            size="small"
                            aria-readonly
                            type="text"
                            name="AddPhone"
                            value={userData.AddPhone}
                            onChange={handleInputChange}
                          />
                        </td>
                      )}
                    </tr>
                    {AddPhoneAlert && (
                      <tr>
                            <td colSpan='2' style={{ color: "red", textAlign: "left" }}>
                              {AddPhoneAlert}
                            </td>
                      </tr>
                          )}
                    <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                      Τηλέφωνο Επικοινωνίας
                    </td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                      {isEditing ? (
                        <TextField
                        size="small" 
                          type="text"
                          name="Phone"
                          value={editedData.Phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <TextField
                        size="small" 
                        aria-readonly
                          type="text"
                          name="AddPhone"
                          value={userData.Phone}
                          onChange={handleInputChange}
                        />
                      )}
                    </td>
                  </tr>
                  {PhoneAlert && (
                   <tr>
                        <td colSpan='2' style={{ color: "red", textAlign: "left" }}>
                          {PhoneAlert}
                        </td>
                  </tr>
                          )}
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px" }}>Email Επικοινωνίας</td>
                    {isEditing ? (
                      <td style={{ textAlign: "left", paddingRight: "10px" }}>
                        <TextField
                        size="small" 
                          type="text"
                          name="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                        />
                      </td>
                    ) : (
                      <td style={{ textAlign: "left", paddingRight: "10px" }}><TextField
                      size="small" 
                      aria-readonly
                        type="text"
                        name="AddPhone"
                        value={userData.email}
                        onChange={handleInputChange}
                      /></td>
                    )}
                  </tr>
                </>
              )}
              {emailAlert && (
                <tr>
                      <td colSpan='2' style={{ color: "red", textAlign: "left" }}>
                        {emailAlert}
                      </td>
                </tr>
                          )}
            </tbody>
          </table>
          </ThemeProvider>
          
      </div>
      <div style={{marginTop:"10px",display:"flex",gap:"10px", alignItems:"center"}}>
      <ThemeProvider theme={theme}>
      {isEditing && (
        <>
          <Button onClick={handleSaveClick} style={submitBoxStyles}>
            Αποθήκευση Αλλαγών
          </Button>
          <Button onClick={handleCancelClick} style={cancelBoxStyles}>
            Ακύρωση
          </Button>
        </>
      )}
      </ThemeProvider>
    </div>         
    </div>

        <div>
        <h3 style={{
          fontFamily: "Fira Sans",
          color: "#6A5ACD",
          width: "auto",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          textAlign:"left"
        }}>
        Προσωπικά Στοιχεία</h3>
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            height: "30vh",
            width: "20vw",
            boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
            display: "flex",
          }}
        >
          <ThemeProvider theme={theme}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {userData && (
                <>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Όνομα Πατέρα</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{`${userData.Father_Name}`}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Όνομα Μητέρας</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{`${userData.Mother_Name}`}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Ημερομηνία Γέννησης</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{formatDate(userData.Birth)}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>Οικογενειακή Κατάσταση</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{userData.Fam}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>Αριθμός Αδελφών</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey" }}>{userData.Siblings}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd",color:"grey"}}>Αριθμός Ταυτότητας</td>
                    <td style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" ,color:"grey"}}>{userData.Taut}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingRight: "10px",color:"grey"}}>ΑΜΚΑ</td>
                    <td style={{ textAlign: "left", paddingRight: "10px",color:"grey"}}>{userData.AMKA}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          </ThemeProvider>
        </div>
        </div>
        </div>
      </Box>
      <Footer/>
    </div>
  )
}

export default EditProfileTutor;
