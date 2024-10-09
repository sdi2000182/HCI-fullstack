import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Enrol from "./Enrol";
import Divider from "@mui/material/Divider";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SaveIcon from "@mui/icons-material/Save";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Alert from "@mui/material/Alert";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Grid from "@mui/material/Grid";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Step2 from "./Step2";
import axios from "axios";
import Footer from "../../Components/footer";
import Confetti from 'react-confetti'
import { jwtDecode } from "jwt-decode";



const steps = ["Επιλογή Μαθημάτων", "Αποθήκευση Δήλωσης"];

function VerticalSpacer({ height }) {
  const spacerStyle = {
    height: height || "6vh", 
    display: "block",
  };

  return <div style={spacerStyle}></div>;
}

const backBoxStyles = {
  position: "relative",
  background: "#C2AC5D",
  borderRadius: "5px",
  display: "flex",
  color: "#F2F2F2",
  cursor: "pointer",
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height: "5%",
  width: "auto",
  textTransform: "none",
  marginTop: "4%",
};

const submitBoxStyles = {
  position: "relative",
  background: "#047857",
  borderRadius: "5px",
  display: "flex",
  color: "#F2F2F2",

  cursor: "pointer",
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height: "70px",
  width: "300px",
  textTransform: "none",
  marginTop: "2%",
  marginLeft: "1%",
};

const tempBoxStyles = {
  position: "relative",
  background: "slateblue",
  borderRadius: "5px",
  display: "flex",
  color: "#F2F2F2",
  cursor: "pointer",
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height: "50px",
  width: "auto",
  textTransform: "none",
  marginTop: "3%",
  marginRight: "0%",
};

export default function HorizontalLinearStepper({ isWinter }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [hasFinal, setHasFinal] = useState(false);
  const boxGreyRef = useRef(null);
  const [hasTemp, setHasTemp] = useState(false);
  const [isTemp, setisTemp] = useState(false);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const id = jwtDecode(localStorage.getItem("token")).sub.User_ID;
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}
  const { width1, height1 } = getWindowDimensions();
  const handleNextFinal = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/make_final_enrol/${id}`, {
        class_ids: Object.keys(checkedItems),
        Semester: "Εαρινό Εξάμηνο 2024",
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
 
  const handleNextTemp = async () => { 
    try {
      const response = await axios.post(`http://127.0.0.1:5000/make_temp_enrol/${id}`, {
        class_ids: Object.keys(checkedItems),
        Semester: "Εαρινό Εξάμηνο 2024",
      });
      console.log(response.data);
      setisTemp(true);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }

  };
  const handleNext1 = (checkedCount) => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/has_final/',
          { Semester: "Εαρινό Εξάμηνο 2024", User: id }
        );
        setHasFinal(response.data.has_final);
        console.log("flag",response.data.has_final)
      } catch (error) {
        console.error("Error fetching has_final:", error);
      }
      try {
        const response = await axios.post(
          'http://127.0.0.1:5000/has_temp/',
          { Semester: "Εαρινό Εξάμηνο 2024", User: id }
        );
        setHasTemp(response.data.has_temp);
        console.log("flag",response.data.has_temp)
      } catch (error) {
        console.error("Error fetching has_final:", error);
      }
    };

    fetchData();
  }, [id]);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setisTemp(false)
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBackandReset = () => {
    setCheckedItems({});
    localStorage.removeItem(`${id}`);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setisTemp(false)
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage="ΔΗΛΩΣΕΙΣ" />
      <div style={{  height: hasFinal ? '0px' : '80vh', width: '100%' }}>
      <div className="boxgrey">
        
        <React.Fragment>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
            }}
          >
            <h1
              style={{
                fontFamily: "Fira Sans",
                fontSize: "40px",
                color: "#6a5acd",
                marginTop: "1%",
                left: 0,
                bottom: 0,
                marginLeft: "2%",
                width: "20ch",
                marginBottom: "0%",
                alignSelf: "flex-start",
                textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
              }}
            >
              Δήλωση Μαθημάτων
            </h1>
            <Divider
              aria-hidden="true"
              style={{
                marginTop: "0",
                marginLeft: "2%",
                marginBottom: "20px",
                width: "42vw",
                alignSelf: "flex-start",

              }}
            />
          </div>
          <div>
            <Box
              sx={{
                width: "94%",
                Index: 4,
                marginTop: "1%",
                marginLeft: "2%",
                background: "#D9D9D9",
                borderRadius: "8px",
              }}
            >
              {!hasFinal &&(
                 <>
              <div>
              
               
                <Stepper activeStep={activeStep} sx={{ marginTop: "0%" }}>
                  {steps.map((label, index) => (
                    <Step
                      key={label}
                      sx={{
                        "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
                          color: "#6a5acd", // Change color here
                        },
                        ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
                          color: "#6a5acd",
                        },
                        "&.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed ": {
                          color: "#6a5acd",
                        },
                        "& MuiStepLabel-iconContainer Mui-completed css-vnkopk-MuiStepLabel-iconContainer ": {
                          color: "#6a5acd",
                        },
                        "& .css-j5w0w9-MuiStepConnector-root ": {
                          marginTop: "2%",
                        },
                        marginTop: "1%",
                      }}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              {(activeStep === 2) ? (
                <React.Fragment>
                  
                  <p style={{ color: "black", marginTop: 2, marginBottom: 1 }}>
                              Η δήλωση μαθημάτων ολοκληρώθηκε επιτυχώς
                     </p>
                  <Step2 id={id}/>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    
                      {activeStep === 1 && (
                              
                              <Button
                                  color="inherit"
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  sx={{ ...tempBoxStyles, mr: 2 }}
                              >
                                  Πίσω
                              </Button>
                          )}
                    
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="center"
                    >
                      
                        {activeStep === 0 && (
                            <Typography
                            sx={{
                              left: 0,
                              fontFamily: "Roboto",
                              fontSize: "40px",
                              mt: 6,
                              mb: 1,
                              whiteSpace: "nowrap",
                              ml: "5%",
                              color:'black',
                            }}
                          >
                            Επιλογή Μαθημάτων
                            </Typography>
                        )}
                        {activeStep === 1 && (
                            <Typography
                            sx={{
                              left: 0,
                              fontFamily: "Roboto",
                              fontSize: "40px",
                              mt: 6,
                              mb: 1,
                              whiteSpace: "nowrap",
                              ml: "5%",
                              color:'black',
                            }}
                          >
                            Αποθήκευση Δήλωσης
                            </Typography>
                        )}
                      
                      {(activeStep === 1 &&  isTemp && <Alert severity="success" sx={{marginTop:'2%',marginLeft:'2%'}}> Έγινε προσωρινή αποθήκευση δήλωσης </Alert>)}
                      <Box sx={{ flex: "1 1 auto" }} />
                    </Grid>
                  </Box>
                </React.Fragment>
              )}
              {activeStep === 0 && (
                <div>
                  {Object.values(checkedItems).filter(
                    (isChecked) => isChecked
                  ).length === 0 && (
                    <Alert severity="warning" sx={{ fontSize: "20px", marginTop: "1%" }}>
                      Για να προχωρήσετε στο επόμενο βήμα πρέπει να δηλώσετε
                      τουλάχιστον ένα μάθημα
                    </Alert>
                  )}
                  <Enrol
                    id={id}
                    isWinter={isWinter}
                    checkedItems={checkedItems}
                    setCheckedItems={setCheckedItems}
                  />
                  <Button
                    onClick={
                      activeStep === steps.length - 3
                        ? () =>
                            handleNext1(
                              Object.values(checkedItems).filter(
                                (isChecked) => isChecked
                              ).length
                            )
                        : handleNext
                    }
                    sx={{ ...tempBoxStyles, ml: 10 }}
                    endIcon={
                      activeStep !== 2 && <NavigateNextIcon />
                    }
                    disabled={
                      activeStep !== 2 &&
                      Object.values(checkedItems).filter(
                        (isChecked) => isChecked
                      ).length === 0
                    }
                  >
                    {activeStep === 0 && "Επόμενο"}
                  </Button>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <div>
                    <Step2 id={id} />
                  </div>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      flex: "1",
                      flexWrap: "wrap",
                      marginLeft: "2%",
                      gap: "30px",
                    }}
                  >
                    <Button
                      onClick={handleNextFinal}
                      style={submitBoxStyles}
                      sx={{ fontSize: "20px" }}
                    >
                      Οριστικοποίηση Δήλωσης
                      <MoveToInboxIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                    <Button
            onClick={handleNextTemp}
            style={{
                ...tempBoxStyles,

                ...(isTemp && {
                    backgroundColor: '#4b0082', 
                    color: '#808080', 
                }),
            }}
            disabled={isTemp}
        >
            Προσωρινή Αποθήκευση <SaveIcon sx={{ marginLeft: "10px" }} />
        </Button>

                    <Button onClick={handleBackandReset} style={{ ...backBoxStyles, marginTop: '3.7%' }}>
                      Εκ Νέου Δήλωση{" "}
                      <SettingsBackupRestoreIcon sx={{ marginLeft: "10px" }} />
                    </Button>
                  </div>
                </div>
              )}
              {activeStep === 2 && <p></p>}
              <React.Fragment>
                <VerticalSpacer />
              </React.Fragment>
              <VerticalSpacer />
              </>
              )}
              
            </Box>
            {(hasFinal && <Step2 id={id}/>)}
            <VerticalSpacer />
          </div>
          <React.Fragment>
                <VerticalSpacer />
              </React.Fragment>
        </React.Fragment>
      </div>
      <Footer />
      </div>
      
    </div>
  );
}