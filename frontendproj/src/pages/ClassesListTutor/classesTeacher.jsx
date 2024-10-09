import React, { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Breadcrumbs, Link, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import TutorMenu from "../../Components/menututor";
import Footer from "../../Components/footer";
import LoggedNavbar from "../../Components/navbarLOGGED";
import { elGR } from "@mui/x-data-grid";
import axios from "axios"; // Import axios library
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const primary = {
  main: "#6A5ACD",
  light: "#42a5f5",
  dark: "#1565c0",
  contrastText: "#fff",
};

const theme = createTheme(
  {
    palette: {
      primary: primary,
    },
  },
  elGR
);

function ClassesTeacher() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleReadMore = (classId) => {
    navigate(`/classes/${classId}`);
  }

  
const columns = [
  { field: "where", headerName: "Τμήμα", flex: 1.5 },
  { field: "class", headerName: "Μάθημα", flex: 2 },
  { field: "classId", headerName: "Κωδικός Μαθήματος", flex: 1 },
  { field: "when", headerName: "Περίοδος", flex: 1 },
  { field: "hours", headerName: "Ώρες", flex: 1 },
  {
    field: "action",
    headerName: "Λεπτομέρειες",
    flex: 1,
    renderCell: (params) => (
      <ReadMoreOutlinedIcon
        style={{ cursor: "pointer" }}
        onClick={() => handleReadMore(params.row.classId)}
      />
    ),
  },
];

  useEffect(() => {
    const fetchTutorClasses = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/get_tutor_classes1", {
          Tutor_ID: jwtDecode(localStorage.getItem('token')).sub.User_ID,
        });

        const tutorClasses = response.data.class || [];

        const processedRows = tutorClasses.map((clas) => ({
          where: 'ΤΜΗΜΑ ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΤΗΛΕΠΙΚΟΙΝΩΝΙΩΝ',
          class: clas.Name,
          classId: clas.Class_ID,
          when: clas.Semester % 2 === 0 ? "Χειμερινή" : "Εαρινή",
          hours: clas.Theory + clas.Lab,
        }));

        setRows(processedRows);
      } catch (error) {
        console.error("Error fetching tutor classes:", error.message);
      }
    };

    fetchTutorClasses();
  }, []); 


  return (
    <div>
      <LoggedNavbar/>
      <TutorMenu activePage='ΜΑΘΗΜΑΤΑ'/>
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
        <div style={{ flexDirection: "column", display: "flex" }}>
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            marginTop: "40px",
            marginLeft: "-3%",  
            width: "18ch",
            marginBottom: "0%",
            alignSelf: 'flex-start',
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
            Μαθήματα
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>

        <ThemeProvider theme={theme}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              sx={{
                borderRadius: "24px",
                backgroundColor: "white",
                boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
              }}
              rows={rows}
              columns={columns}
              getRowId={(row) => row.classId} 
            />
          </div>
        </ThemeProvider>
      </Box>
      <Footer/>
    </div>
  );
}

export default ClassesTeacher;
