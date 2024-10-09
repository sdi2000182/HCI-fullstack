import Divider from "@mui/material/Divider";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { SubmitCertificate } from '../../Components/Buttons.jsx';
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer";
import LoggedNavbar from "../../Components/navbarLOGGED";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";
import "../../Components/Buttons.css";
import {Alert,AlertTitle} from "@mui/material"
import { useParams,Link,useNavigate } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function getCurrentSemesterNumber(registerDate) {
  const registrationDate = new Date(registerDate);

  // Calculate the year and month difference from the registration date
  const yearDiff = new Date().getFullYear() - registrationDate.getFullYear();
  const monthDiff = new Date().getMonth() - registrationDate.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;

  // Determine the semester number based on the months
  let semesterNumber;
  if ((registrationDate.getMonth() >= 3 && registrationDate.getMonth() <= 8) ||
      (registrationDate.getMonth() === 2 && registrationDate.getDate() >= 20)) {
    // If the registration date is in March to September, or February after the 20th
    semesterNumber = Math.floor(totalMonths / 6) + 2; // Spring/Summer semester
  } else {
    semesterNumber = Math.floor(totalMonths / 6) + 1; // Fall/Winter semester
  }

  return semesterNumber;
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

const Certificate = () => {
  const {copies,type} = useParams();
  const [selectedOption, setSelectedOption] = React.useState(type);
  const [grades, setGrades] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [userData, setUserData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/user/get_one/', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          cancelToken: source.token
        });
        setUserData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel('Request canceled due to component unmounting');
    };
  }, []);

  React.useEffect(() => {
    const student_id = jwtDecode(localStorage.getItem('token')).sub.User_ID
    axios.post(`http://127.0.0.1:5000/get_all_grades/${student_id}`)
    .then(response => {
      setGrades(response.data.grades);
    })
    .catch(error => console.error('Error fetching user grades:',error));
  },[]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitButton = () => {
    const token = localStorage.getItem('token');
    const User_ID = jwtDecode(token).sub.User_ID;
     
  
    const data = {
      Type: selectedOption,
    };
  
    axios.post(`http://127.0.0.1:5000/create_certificate/${User_ID}/${copies}`,data)
    .then(response => {
      setAlertSeverity("success");
      setAlertMessage(response.data.message);
      setAlertOpen(true);
    })
    .catch(error => {
      setAlertSeverity("error");
      setAlertMessage("Error creating certificate. Please try again.");
      setAlertOpen(true);
      console.error('Error creating certificate:', error);
    });
  };
 
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };


  return (
    <div>
      <LoggedNavbar/>
      <CustomButtonGroup activePage='ΠΙΣΤΟΠΟΙΗΤΙΚΑ'/>
      <div style={{ display: "flex", flexDirection: "row", margin: "1%", alignContent:"center" }}>
        <Link to="/certificates"> <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', } }} /></Link>
        <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
          <Link color="inherit" to="/certificates">
            Πιστοποιητικά
          </Link>
          <span style={{ color: "#6A5ACD" }}>Συμπλήρωση Πιστοποιητικού</span>
        </Breadcrumbs>
      </div>
      <div className="boxgrey" style={{ height: 1300, marginBottom:"40px", borderRadius:"25px" }}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <h1
            style={{
              fontFamily: "Fira Sans",
              fontSize: "40px",
              color: "slateblue",
              width: "27ch",
              marginLeft: "2%",
              textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
            }}
          >
            Συμπλήρωση Πιστοποιητικού
          </h1>
          <Divider
            aria-hidden="true"
            style={{
              marginLeft: "-550px",
              marginBottom: "20px",
              width: "42vw",
            }}
          />
        </div>
        <Box
          sx={{
            m: 1,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{backgrocolor:"white"}}>
              Είδος Πιστοποιητικού
            </InputLabel>
            <NativeSelect
              value={selectedOption}
              onChange={handleSelectChange}
              inputProps={{
                name: "certificate",
                id: "uncontrolled-native",
              }}
            >
              <option value={"Στρατολογικής Χρήσης (Αναλυτικό)"}>
                Στρατολογικής Χρήσης (Αναλυτικό)
              </option>
              <option value={"Στρατολογικής Χρήσης (Συνοπτικό)"}>
                Στρατολογικής Χρήσης (Συνοπτικό)
              </option>
              <option value={"Φοιτητικής Ιδιότητας"}>
                Φοιτητικής Ιδιότητας
              </option>
              <option value={"Φορολογικής Χρήσης"}>Φορολογικής Χρήσης</option>
              <option value={"Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς"}>
                Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς
              </option>
            </NativeSelect>
          </FormControl>
          {isLoading ? (
            <p></p>
          ) : (
            <>
          {selectedOption && (
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "16px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                width: "1000px",
                height: "1030px",
                fontSize: "30px",
                color: "slateblue",
              }}
            >
              <div style={{ marginTop: "20px" }}>{selectedOption}</div>
              <div
                style={{
                  marginLeft: "40px",
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <p style={{ fontSize: "15px", color: "black" }}>
                  Ονοματεπώνυμο
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={`${userData.First_Name} ${userData.Last_Name}`}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Ημερομηνία Γέννησης
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={formatDate(userData.Birth)}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Όνομα Πατέρα
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={userData.Father_Name}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Όνομα Μητέρας
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={userData.Mother_Name}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Αριθμός Μητρώου Φοιτητή
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={userData.User_ID}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Εξάμηνο Φοίτησης
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={getCurrentSemesterNumber(userData.Register_Date)}
                  sx={{ width: "55ch" }}
                />
                <p
                  style={{
                    fontSize: "15px",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Ημερομηνία Εγγραφής
                </p>
                <TextField
                  id="outlined-multiline-flexible"
                  defaultValue={formatDate(userData.Register_Date)}
                  sx={{ width: "55ch" }}
                />
              </div>
              {selectedOption ===
                "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς" && (
                <div align="left">
                  <p
                    style={{
                      marginLeft: "40px",
                      fontSize: "15px",
                      color: "black",
                      marginTop: "15px",
                    }}
                  >
                    Αναλυτική Βαθμολογία Μαθημάτων
                  </p>
                  <Paper
                    sx={{
                      marginLeft: "40px",
                      width: "55ch",
                      marginTop: "20px",
                      overflowY: "auto",
                      maxHeight: "70px",
                      borderRadius: "10px",
                    }}
                  >
                    <table style={{ width: "100%" }}>
                    <tbody>
                      {Array.isArray(grades) &&
                        grades.map((grade, index) => (
                          <tr key={index}>
                            <td style={{fontSize:"medium"}}>{`${grade.Class_ID} - ${grade.Name} - ${grade.Semester}ο Εξάμηνο`}</td>
                            <td style={{fontSize:"medium"}}>{grade.Grade}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  </Paper>
                </div>
              )}
              <div style={{ marginLeft: "40px", marginTop: "20px" }}>
                <button
                  className="view-grades"
                  style={{ display: "flex", alignItems: "center", alignContent:"center", marginLeft: "10px", height:"50px",width:"900px", justifyContent:"center",fontSize:"Large"}}
                  onClick={handleSubmitButton}
                >
                  ΥΠΟΒΟΛΗ
                  
                </button>
                <div style={{marginTop:"20px"}}>
                {alertOpen && 
                <Alert severity={alertSeverity} onClose={handleAlertClose} open={alertOpen}>
                  <AlertTitle>{alertSeverity === "success" ? "Επιτυχία" : "Σφάλμα"}</AlertTitle>
                  {alertMessage}
                </Alert>}
                </div>
              </div>
              
            </Box>
            )}
            </>
          )}
        </Box>
      </div>
      <Footer/>
    </div>
  );
};
export default Certificate;
