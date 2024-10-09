import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Breadcrumbs, Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { elGR } from "@mui/x-data-grid";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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

const columns = [
  { field: "count", headerName: "#", flex: 1 },
  { field: "Type", headerName: "Είδος Πιστοποιητικού", flex: 1 },
  { field: "date", headerName: "Ημερομηνία Υποβολής", flex: 1 },
  { field: "Status", headerName: "Κατάσταση", flex: 1 },
  {
    field: "action",
    headerName: "Ενέργειες",
    flex: 1,
    renderCell: (params) => {
      if (params.row.Status === "Διαθέσιμο") {
        return <FileDownloadOutlinedIcon style={{ cursor: "pointer" }} />;
      }
      return <span style={{ marginLeft: "4px", fontSize: "25px" }}>-</span>;
    },
  },
];

function CertificatesDownload() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const fetchCertificates = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/get_certificates', {User_ID: jwtDecode(localStorage.getItem("token")).sub.User_ID}
      );
      const certificates = response.data.certificates;

      if (certificates && certificates.length > 0) {
        const rowsWithCount = certificates.map((certificate, index) => ({
          ...certificate,
          count: index + 1,
          date: new Date(certificate.Date).toLocaleDateString("el-GR"),
        }));
        setRows(rowsWithCount);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    // Fetch certificates when the component mounts
    fetchCertificates();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount


  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΠΙΣΤΟΠΟΙΗΤΙΚΑ'/>
      <div style={{ display: "flex", flexDirection: "row", margin: "1%", alignContent:"center" }}>
        <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
        <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
          <Link color="inherit" to="/certificates">
            Πιστοποιητικά
          </Link>
          <span style={{ color: "#6A5ACD" }}>Αιτήσεις Πιστοποιητικών</span>
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
          height: "78vh",
          alignItems: "start",
        }}
      >
        <div style={{ flexDirection: "row", display: "flex" }}>
          <h1
            style={{
              fontFamily: "Fira Sans",
              fontSize: "40px",
              color: "#6A5ACD",
              width: "27ch",
              marginLeft: "2%",
              textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
            }}
          >
            Αιτήσεις Πιστοποιητικών
          </h1>
        </div>
        <Divider
          aria-hidden="true"
          style={{ marginBottom: "10px", width: "42vw" }}
        />

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
              getRowId={(row) => row.count}
            />
          </div>
        </ThemeProvider>
      </Box>
      <Footer />
    </div>
  );
}

export default CertificatesDownload;
