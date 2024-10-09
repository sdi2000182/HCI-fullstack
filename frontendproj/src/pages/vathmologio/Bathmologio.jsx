import Divider from "@mui/material/Divider";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "../../Components/Buttons.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import img1 from "../../Components/images/old_grades.png";
import img2 from "../../Components/images/exam.png";
import img3 from "../../Components/images/proodos.png";
import img4 from "../../Components/images/ergasia.png";
import { Eye, Add, Pencil } from "../../Components/Buttons";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import LoggedNavbar from "../../Components/navbarLOGGED";
import Footer from "../../Components/footer";
import TutorMenu from "../../Components/menututor";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Bathmoi = () => {
  const [subjectOptions, setSubjectOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [finalGradesCheck, setFinalGradesCheck] = React.useState([]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const cardWidth = 315;
  const cardHeight = 335;

  const cardsData = [
    { img: img1, name: "Παρακολούθηση βαθμολογίων" },
    { img: img2, name: "Υποβολή νέου βαθμολογίου τελικής εξέτασης" },
    { img: img3, name: "Υποβολή νέου βαθμολογίου προόδου" },
    { img: img4, name: "Υποβολή νέου βαθμολογίου εργασίας" },
  ];

  React.useEffect(() => {
    axios.post(`http://127.0.0.1:5000/check_final_grades/${selectedOption}`, { Semester: 'Χειμερινό Εξάμηνο 2023' })
      .then(response => {
        // Handle the response here
        setFinalGradesCheck(response.data);
      })
      .catch(error => {
        console.error("Error checking final grades:", error.message);
      });
  }, [selectedOption]);
  

  React.useEffect(() => {
    const fetchTutorClasses = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/get_tutor_classes1", {
          Tutor_ID: jwtDecode(localStorage.getItem("token")).sub.User_ID,
        });

        const tutorClasses = response.data.class || [];
        const options = tutorClasses.map((clas) => ({
          value: clas.Class_ID,
          label: clas.Name,
        }));

        setSubjectOptions(options);
      } catch (error) {
        console.error("Error fetching tutor classes:", error.message);
      }
    };

    fetchTutorClasses();
  }, []); 

  return (
    <div>
      <LoggedNavbar />
      <TutorMenu activePage='ΒΑΘΜΟΛΟΓΙΟ'/>
      <div className="boxgrey" style={{ height: 650 }}>
      <div style={{ flexDirection: "column", display: "flex" }}>
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            marginTop: "40px",
            marginLeft: "0%",
            width: "18ch",
            marginBottom: "0%",
            alignSelf: 'flex-start',
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
            Βαθμολόγιο
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>
        <Box
          sx={{
            m: 1,
            maxWidth: 200,
            display: "flex",
            flexDirection: "column",
            marginLeft: "7%",
            marginTop: "1%"
          }}
        >
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Επιλογή Μαθήματος
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
                Επιλογή Μαθήματος
              </option>
              {subjectOptions.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            gap: "100px",
            marginLeft: "120px",
            marginTop: "50px",
          }}
        >
          {cardsData.map((card, index) => (
            <Card
              key={index}
              sx={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 7,
                border: "2px solid black",
              }}
            >
              <CardActionArea className="card" disableRipple={true} >
                <CardMedia
                  component="img"
                  width="217"
                  height="140"
                  image={card.img}
                />

                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      {card.name}
                    </Typography>

                    {selectedOption && index === 0 && (
                      <div style={{ marginTop: "90px" }}>
                        <Eye where='view-grades' classID={selectedOption}/>
                      </div>
                    )}

                    {selectedOption && index === 1 && (
                      <div>
                        {finalGradesCheck.grades_remain===true && (
                            <div style={{ display: "flex", alignItems: "center" }}>
                          
                            <div
                              style={{ marginRight: "10px", marginTop: "5px" }}
                            >
                              <PriorityHighIcon
                                style={{ color: "slateblue", fontSize: "40px" }}
                              />
                            </div>
                            <div>
                              <Typography
                                variant="body2"
                                style={{ marginTop: "10px" }}
                              >
                                Δεν έχουν δημιουργηθεί Βαθμολογίες από το Web για
                                αυτή την εξεταστική περίοδο
                              </Typography>
                            </div>
                            <div
                              style={{
                                marginLeft: "125px",
                                marginTop: "10px",
                              }}
                            >
                              <Add  where='upload-grades' classID={selectedOption}/>
                            </div>
                          </div>
                          )}
                        
                        {finalGradesCheck.all_checks!==true && (
                          <div>
                            <Typography variant="body2" style={{ marginTop: "10px" , marginBottom:"20px"}}>
                              Υπάρχουν ΜΗ οριστικοποιημένες Βαθμολογίες για την τελική εξέταση
                            </Typography>
                            <Pencil  where='upload-grades'  classID={selectedOption}/>
                          </div>
                          
                          )}
                          {console.log("All_final_before",finalGradesCheck.all_final)}
                        {finalGradesCheck.all_final=== true && (
                            <Typography variant="body2" style={{ marginTop: "10px" }}>
                              Έχει γίνει τελική υποβολή για αυτό το μάθημα
                            </Typography>
                          )}
                        
                      </div>
                    )}

                    {selectedOption && index === 2 && (
                      <div>
                      <Typography
                        variant="body2"
                        style={{ marginTop: "30px" }}
                      >
                        Υπάρχουν ΜΗ οριστικοποιηένες Βαθμολογίες από το Web
                        για εργασίες
                      </Typography>
                      <div style={{ marginTop: "25px" }}>
                        <Eye />
                        <Pencil />
                      </div>
                    </div>
                    )}

                    {selectedOption && index === 3 && (
                      <div>
                        <Typography
                          variant="body2"
                          style={{ marginTop: "30px" }}
                        >
                          Υπάρχουν ΜΗ οριστικοποιηένες Βαθμολογίες από το Web
                          για εργασίες
                        </Typography>
                        <div style={{ marginTop: "25px" }}>
                          <Eye />
                          <Pencil />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bathmoi;
