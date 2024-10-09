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
import TutorMenu from "../Components/menututor.jsx";

const dateProth=20

const primary = {
  main: '#6a5acd',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const buttonStyles = {
    position: '',
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
    day.getDate() === 13 &&
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



function TutorHomePage() {
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
    

    axios.post('http://127.0.0.1:5000/get_3grades', { STUDENT_ID: jwtDecode(token).sub.User_ID})
      .then(response => setLastGrades(response.data.grades))
      .catch(error => console.error('Error fetching last 3 grades:', error));

      axios.post('http://127.0.0.1:5000/get_tutor_classes1', {
        Tutor_ID: '2117',
        Semester: "Χειμερινό Εξάμηνο 2023"
      })
        .then(response => setEnrolledClasses(response.data.class))
        .catch(error => console.error('Error fetching last enrolled classes:', error));

    axios.post('http://127.0.0.1:5000/progress', {Student_ID: jwtDecode(token).sub.User_ID})
      .then(response => setProgressData(response.data))
      .catch(error => console.error('Error fetching student progress:', error));

      console.log("Progress",progressData)
  }, []); 


  const handleStoix = () =>{
    navigate('/edit-profile');
  }



  return (
    <div>
      <LoggedNavbar />
      <TutorMenu activePage='ΑΡΧΙΚΗ'/>
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
        <div style={{flexDirection:"row", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <h1 style={{
          fontFamily: "Fira Sans",
          fontSize: "40px",
          color: "#6a5acd",
          width: "20ch",
          textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          marginLeft:"30px",
          whiteSpace: "nowrap",
        }}>
          Καλωσήρθατε, {userData.First_Name}
        </h1>
        <Button style={buttonStyles} onClick={handleStoix} sx={{marginLeft:"5vw"}}>
            Επεξεργασία Προσωπικών Στοιχείων
            <EditIcon sx={{marginLeft:"2%"}}/>
        </Button>
        </div>
        <div>
        </div>
        
        <Divider aria-hidden="true" style={{ marginBottom: "30px", width: "50vw" }} />
        <div style={{display:"flex", flex: "1",flexWrap: "wrap", gap: "40px"}}>
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
                {console.log(enrolledClasses)}
                {enrolledClasses.map((enrolledClasses, index) => (
                  <tr key={index} style={{ textAlign: "left", paddingRight: "10px", borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: '10px' }}>
                      <strong>{enrolledClasses.Name}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </ThemeProvider>
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
            <p>🟠Καταληκτική ημερομηνία βαθμολογιών</p>

          </ThemeProvider>
        </div>  
      </LocalizationProvider>
      
        </div>
      </Box>
      <Footer/>
    </div>
  )
}

export default TutorHomePage;
