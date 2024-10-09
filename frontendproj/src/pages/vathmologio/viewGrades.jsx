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
import excellogo from "../../Components/excel_logo_icon_208937.png";
import { InputLabel, NativeSelect, FormControl} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { elGR } from "@mui/x-data-grid";
import { saveAs } from 'file-saver';
import { useParams } from "react-router-dom";
import { Diversity1 } from "@mui/icons-material";
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
  },
    elGR,
  );

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
  
  const columns = [
    { field: 'id', headerName: 'Αριθμός Μητρώου', flex: 1 },
    { field: 'firstName', headerName: 'Όνομα', flex: 1 },
    { field: 'lastName', headerName: 'Επώνυμο', flex: 1 },
    {field: 'semester', headerName: 'Εξάμηνο Φοιτητή',flex: 1,},
    {field: 'grade',headerName: 'Βαθμός',flex: 1,},
  ];


const buttoninBoxStyles = {
    position: 'relative',
    background: '#6A5ACD',
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
    width:"300px",
    whitespace:"nowrap",
}



function ViewGrades(props) {
  const [userData, setUserData] = useState({});
  const [editedData, setEditedData] = useState({});
  const uploadComponentRef = useRef();
  const [selectedOption, setSelectedOption] = React.useState("");
  const [rows, setRows] = useState([]);
  const [classData, setClassData] = useState({});

  const navigate = useNavigate();
  const { classID } = useParams();

  useEffect(() => {
    if (selectedOption !== "") {
      axios.post(`http://127.0.0.1:5000/get_grades/${classID}`, {
        Current_Semester: selectedOption, 
      })
      .then(response => {
        const rowsWithId = response.data.grade.map(row => ({
          ...row,
          id: row.ID,
          firstName: row['Name'],
          lastName: row['Surname'],
          semester: getCurrentSemesterNumber(row['Register_Date']),
          grade: row['Grade'],
        }));
        setRows(rowsWithId);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    axios.post(`http://127.0.0.1:5000/get_one_class`,{
      Class_ID: classID,
    })
    .then(response => {
      setClassData(response.data.class);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [selectedOption, classID]);

  const semesterOptions = [
    { value: "Χειμερινό Εξάμηνο 2023", label: "Χειμερινό Εξάμηνο 2023" },
    { value: "Χειμερινό Εξάμηνο 2022", label: "Χειμερινό Εξάμηνο 2022" },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const clickExportExcel = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/get_grades_excel/${classID}`, {
        Current_Semester: 'Χειμερινό Εξάμηνο 2023',
      }, {
        responseType: 'blob',
      });
  

      saveAs(response.data, 'vathmologio.xlsx');
  
    } catch (error) {
      console.error('Error triggering file export:', error);
    }
  }

  return (
    <div>
      <LoggedNavbar />
      <TutorMenu />
      <div style={{ display: "flex", flexDirection: "row", margin: "1%" }}>
      <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
      <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
        <Link color="inherit" href="/gradebook">
          Βαθμολόγιο
        </Link>
        <span style={{ color: "#6A5ACD" }}>Παρακολούθηση Βαθμολογίου</span>
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
            Παρακολούθηση Βαθμολογίου
          </h1>
        </div>
        <Divider aria-hidden="true" style={{ marginBottom: "10px", width: "42vw" }} />
          <div style={{display:"flex", flexDirection:"row"}}>
          {classData[0] && (
            <h3 style={{
              fontFamily: "Fira Sans",
              color: "black",
            }}>
              {classData[0].Name}
            </h3>
          )}
        </div>  
          
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "row",
              marginLeft: "2%",
              gap:"20px"
            }}
          > 
            
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Επιλογή Εξαμήνου
              </InputLabel>
              <NativeSelect
                value={selectedOption}
                onChange={handleSelectChange}
                inputProps={{
                  name: "certificate",
                  id: "uncontrolled-native",
                }}
              >
                <option value="" disabled>
                  Επιλογή Εξαμήνου
                </option>
                {semesterOptions.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <Button style={buttoninBoxStyles} onClick={clickExportExcel}>Εξαγωγή σε Excel <img src={excellogo} style={{filter: 'invert(100%)',height:"24px", width:"auto", marginLeft:"10px"}}/></Button>
            
        </Box>
        <ThemeProvider theme={theme}>
        {selectedOption && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              sx={{borderRadius:"24px",backgroundColor:"white",boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",}}
              rows={rows}
              columns={columns}
            />
          </div>
        )}
      </ThemeProvider>
      </Box>
      <Footer/>
    </div>
  );
}

export default ViewGrades;
