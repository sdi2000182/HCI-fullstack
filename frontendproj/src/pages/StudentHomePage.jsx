import LoggedNavbar from "../Components/navbarLOGGED";
import CustomButtonGroup from "../Components/menubar";
import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Badge, Box, Button, TextField } from "@mui/material";
import "@fontsource/fira-sans";
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../Components/footer";
import EditIcon from '@mui/icons-material/Edit';
import LinearProgress from '@mui/material/LinearProgress';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import {longFormatters} from 'date-fns'
import {el} from 'date-fns/locale'
import { isSameDay } from 'date-fns';
import { PickersDay } from "@mui/x-date-pickers";
import Calendar from "../Components/Calendar.jsx";
import dayjs from 'dayjs';
import RingChart from "../Components/RingChart.jsx";

const dateProth=20

const primary = {
  main: '#6a5acd',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const buttonStyles = {
  position: 'relative',
  width: '342px',
  height: '41px',
  background: '#6a5acd',
  borderRadius: '5px',
  display: 'flex',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '0.5px',
  color: '#FFFFFF',
  mixBlendMode: 'normal',
  cursor: 'pointer', 
  textTransform:"none",
  marginTop:"2%"
};

const buttoninBoxStyles = {
    position: 'relative',
    background: '#6a5acd',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#FFFFFF',
    cursor: 'pointer', 
    textTransform:"none",
    marginLeft:"5%"
}

const theme = createTheme({
  palette: {
    primary: primary,
  }
});



function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    day.getDate() === 15 &&
    day.getMonth() === new Date().getMonth();

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🟠' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}



function getCurrentSemesterNumber(registerDate) {
  const registrationDate = new Date(registerDate);
  const yearDiff = new Date().getFullYear() - registrationDate.getFullYear();
  const monthDiff = new Date().getMonth() - registrationDate.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;
  let semesterNumber;
  if ((registrationDate.getMonth() >= 3 && registrationDate.getMonth() <= 8) ||
      (registrationDate.getMonth() === 2 && registrationDate.getDate() >= 20)) {
    // If the registration date is in March to September, or February after the 20th
    semesterNumber = Math.floor(totalMonths / 6) + 1; // Spring/Summer semester
  } else {
    semesterNumber = Math.floor(totalMonths / 6) + 0; // Fall/Winter semester
  }

  return semesterNumber;
}


function StudentHomePage() {
  const [userData, setUserData] = useState({});
  const [lastGrades, setLastGrades] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [value,setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem('token');
      axios.get('http://127.0.0.1:5000/user/get_one/', {  
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => console.error('Error fetching user data:', error));
    

    // Fetch last 3 grades
    axios.post('http://127.0.0.1:5000/get_3grades', { STUDENT_ID: jwtDecode(token).sub.User_ID})
      .then(response => setLastGrades(response.data.grades))
      .catch(error => console.error('Error fetching last 3 grades:', error));

      axios.post('http://127.0.0.1:5000/get_enrolled', {
        Student_ID: jwtDecode(token).sub.User_ID,
        Semester: "Εαρινό Εξάμηνο 2024"
      })
        .then(response => setEnrolledClasses(response.data.enrol))
        .catch(error => console.error('Error fetching last enrolled classes:', error));

    axios.post('http://127.0.0.1:5000/progress', {Student_ID: jwtDecode(token).sub.User_ID})
      .then(response => setProgressData(response.data))
      .catch(error => console.error('Error fetching student progress:', error));

  }, []); 


  const handleStoix = () =>{
    navigate('/edit-profile');
  }

  const handleFullGrades = () =>{
    navigate('/grades');
  }


  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΑΡΧΙΚΗ'/>
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
        <div style={{flexDirection:"row", display:"flex", alignContent:"center", justifyContent:"center"}}>
        <h1 style={{
          fontFamily: "Fira Sans",
          fontSize: "40px",
          color: "#6a5acd",
          width: "20ch",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
        }}>
          Καλωσήρθατε, {userData.First_Name}
        </h1>
        <Button style={buttonStyles} onClick={handleStoix} sx={{marginLeft:"47vw"}}>
            Επεξεργασία Προσωπικών Στοιχείων
            <EditIcon sx={{marginLeft:"2%"}}/>
        </Button>
        </div>
        <div>
        <h2 style={{
          marginLeft:"10px",
          marginTop:"-10%",
          fontFamily: "Fira Sans",
          color: "#6a5acd",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",}}>
            Τρέχων εξάμηνο: {getCurrentSemesterNumber(userData.Register_Date)}
        </h2>
        </div>
        
        <Divider aria-hidden="true" style={{ marginBottom: "10px", width: "42vw" }} />
        <div style={{display:"flex", flex: "1",flexWrap: "wrap", gap: "40px"}}>
        <div
          style={{
            backgroundColor: "white", 
            padding: "10px",
            borderRadius: "24px", 
            height: "70%", 
            width: "20vw", 
            boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
            display: "flex"
          }}
        >
          <ThemeProvider theme={theme}>
          <div>
            <h3 style={{
              fontFamily: "Fira Sans",
              color: "#6a5acd",
              textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
              marginLeft:"-100px",
            }}>Πρόοδος Φοιτητή</h3>

            <table
              style={{
                marginLeft: '10%',
                borderCollapse: 'collapse',
                width: '90%',
                marginBottom: '5%'
              }}
            >
              <tbody>
              <tr  style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: '10px' }}><strong>Περασμένα Μαθήματα:</strong></td>
                  <td style={{ padding: '10px' }}><span>{progressData.num_passed_classes}</span></td>
                </tr>
                <tr  style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: '10px' }}><strong>Μέσος Όρος:</strong></td>
                  <td style={{ padding: '10px' }}><span>{progressData.average_grade}</span></td>
                </tr>
                <tr  style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: '10px' }}><strong>ECTS:</strong></td>
                  <td style={{ padding: '10px' }}><span>{progressData.total_ects}</span></td>
                </tr>
              </tbody>
            </table>

            <div style={{ alignItems: 'center', marginLeft: '10%', width:"auto"}}>
              <LinearProgress
                variant="determinate"
                value={(progressData.total_ects / 240) * 100}
                sx={{ width: '100%' }}
              />
              <Typography variant="body2" style={{ marginLeft: '5px' }}>
                {Math.round((progressData.total_ects / 240) * 100)}% των ECTS συμπληρώθηκαν
              </Typography>
              
            </div>
            <RingChart/>
          </div>

          </ThemeProvider>
        </div>
        <div
        style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '24px',
            height: '70%',
            width: '20vw',
            boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column', 
        }}
        >
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start"}}>
            <h3
                style={{
                fontFamily: 'Fira Sans',
                color: '#6a5acd',
                textShadow: '0px 4px 5.9px rgba(0, 0, 0, 0.25)',
                marginLeft:"5%"
                }}
            >
                Τελευταίοι Βαθμοί
            </h3>
            <table
              style={{
                marginLeft: '5%',
                borderCollapse: 'collapse',
                width: '90%',
                marginBottom:'5%'
              }}
            >
              <tbody>
                {lastGrades.map((grade, index) => (
                  <tr key={index} style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: '10px' }}>
                      <strong>{grade.Name}:</strong>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span>{grade.Grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button style={buttoninBoxStyles} onClick={handleFullGrades}>
            Αναλυτική Βαθμολογία
            </Button>
            </div>
        </ThemeProvider>
        </div>
        <div
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              height: 'auto',
              width: 'auto',
              maxHeight:"74%",
              boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
        
        </div>
        <LocalizationProvider adapterLocale={el} dateAdapter={AdapterDateFns}>
         <div
            style={{
              backgroundColor: 'white',
              borderRadius: '24px',
              height: 'auto',
              width: 'auto',
              maxHeight:"74%",
              boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ThemeProvider theme={theme}>
            <DateCalendar
              sx={{ marginTop: '10px', borderRadius: '24px'}}
              value={value}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays,
                },
              }}
            />
            <p>🟠Καταληκτική ημερομηνία δηλώσεων</p>

          </ThemeProvider>
        </div>  
      </LocalizationProvider>
      <div
        style={{
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '24px',
            height: '70%',
            width: '20vw',
            boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column', 
        }}
        >
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "flex-start"}}>
            <h3
                style={{
                fontFamily: 'Fira Sans',
                color: '#6a5acd',
                textShadow: '0px 4px 5.9px rgba(0, 0, 0, 0.25)',
                marginLeft:"5%"
                }}
            >
                Τα μαθήματα μου
            </h3>
            <table
              style={{
                marginLeft: '5%',
                borderCollapse: 'collapse',
                width: '90%',
                marginBottom:'5%'
              }}
            >
              <tbody>
                {enrolledClasses.map((enrolledClasses, index) => (
                  <tr key={index} style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: '10px' }}>
                      <strong>{enrolledClasses.Class_Name}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </ThemeProvider>
        </div>  
        </div>
      </Box>
      <Footer/>
    </div>
  )
}

export default StudentHomePage;
