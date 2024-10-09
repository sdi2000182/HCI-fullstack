import React from 'react';
import SimplifiedNavbar from '../../Components/navbarOG';
import Footer from '../../Components/footer';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Breadcrumbs } from '@mui/material';
import prof from "./stud.png";

function WhiteBox4() {
  return (
    <div style={{ backgroundColor: 'white', height: '15vh', width: '100%' }}>
      {/* Content of the white box */}
    </div>
  );
}

function StudentInfo() {
  const navigate = useNavigate();
  return (
    <div>
      <SimplifiedNavbar />
      <div style={{ display: "flex", flexDirection: "row", margin: "1%", alignContent: "center" }}>
        
        <div style={{ flexDirection: "column", display: "flex" }}>

          <img src={prof} alt="Professor" style={{ width: '100%', height: '40%', marginRight: '10px' }} />
         
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            marginTop: "1%",
            left: 0,
            bottom: 0,
            marginLeft: "2%",
            width: "10ch",
            marginBottom: "0%",
            alignSelf: 'flex-start',
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
             <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", marginRight:"10px",'&:hover': { color: '#4A0080', }, 'cursor': "pointer" }} onClick={() => navigate('/')} />
            Φοιτητές
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw", alignSelf: 'flex-start' }} />
          <div style={{ marginBottom: "2%" }}>
            <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ width: '60%' }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginLeft: "9%" }}>
    <h3 style={{ fontFamily: 'Roboto', textAlign: 'left' }}>
      Στο MyStudies με τη σύνδεση σας έχετε τη δυνατότητα να δείτε τα μαθήματα της σχολής σας ανά εξάμηνο καθώς και να τα δηλώσετε. Παράλληλα, μπορείτε να δείτε όλες τις πληροφορίες για αυτά, αναλυτικά τις βαθμολογίες και δηλώσεις προηγούμενων εξαμήνων. Δίνεται ,
      επίσης και η δυνατότητα αίτησης πιστοποιητικών αναλυτικής βαθμολογίας, στρατού , φοιτητικής και φορολογικής χρήσης από την γραμματεία του τμήματος σας.
    </h3>
    <div style={{ flexDirection: "column", display: "flex", textAlign: "right" ,alignItems: "flex-start", marginLeft: "9%"}}>
      <h3 style={{ fontFamily: 'Roboto' }}>Σχετικά:</h3>
      <Divider aria-hidden="true" style={{ marginTop: "-4%", marginLeft: "0%", marginBottom: "-3%", width: "10ch", alignSelf: 'flex-start' }} />
      <a href="readme.pdf" style={{ color: '#0000EE'}}>
    <h4 style={{whiteSpace: 'nowrap', fontFamily: 'Roboto'}}>Οδηγός χρήσης mystudies για φοιτητές</h4>
</a>

    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      <WhiteBox4>

      </WhiteBox4>
      <Footer />
    </div>
  );
}

export default  StudentInfo;