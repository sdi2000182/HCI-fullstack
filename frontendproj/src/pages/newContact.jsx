import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import Footer from "../Components/footer";
import LoggedNavbar from "../Components/navbarLOGGED";
import CustomButtonGroup from "../Components/menubar";
import TutorMenu from "../Components/menututor";
import { jwtDecode } from "jwt-decode";

const centerLabelStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "-5px 10px 0",
};

const inputTextStyle = {
  textAlign: "left",
  margin: "10px 10px 0",
};

const ContactPage = () => {
  const token = localStorage.getItem('token');
  const isTutor = jwtDecode(token).sub.isTutor;
  const [formData, setFormData] = useState({
    contactForm: {
      firstName: "",
      lastName: "",
      email: "",
    },
    contactFormComments: {
      comments: "",
    },
  });

  const [isMessageSent, setMessageSent] = useState(false);

  const handleFormSubmit = () => {
    if (formData.contactFormComments.comments.trim() !== "") {
      setFormData({
        contactForm: {
          firstName: "",
          lastName: "",
          email: "",
        },
        contactFormComments: {
          comments: "",
        },
      });

      setMessageSent(true);
    }
  };

  const handleReset = () => {
    setMessageSent(false);
  };

  return (
    <div>
      <LoggedNavbar /> 
      {isTutor==1 ? <TutorMenu activePage="ΕΠΙΚΟΙΝΩΝΙΑ"/> : <CustomButtonGroup activePage="ΕΠΙΚΟΙΝΩΝΙΑ" />}
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
            Επικοινωνία
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>

        <div style={{ width: "550px", marginLeft: "3%" }}>
          <p style={{ textAlign: "left", fontSize: "20px" }}>
            Για οποιαδήποτε παρατήρηση, πρόβλημα ή απορία μπορείτε να
            επικοινωνήσετε μαζί μας στέλνοντας email ή συμπληρώνοντας την φόρμα
            επικοινωνίας και θα σας απαντήσουμε εντός τριών εργάσιμων ημερών.
          </p>

          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MailOutlineSharpIcon />
            <span style={{ marginLeft: "8px", cursor: "pointer" }}>
              my_studies@uoa.gr
            </span>
          </div>
        </div>
        <div style={{ marginTop: "-200px", marginLeft: "1000px" }}>
          <h1
            className="form-title"
            style={{
              fontSize: "1.5rem",
              marginLeft: "-550px",
              color: "slateblue",
            }}
          >
            Φόρμα Επικοινωνίας
          </h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "225px",
                borderRadius: "10px",
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Box
                sx={{ display: "flex", width: "225px", marginRight: "10px" }}
              >
                <TextField
                  id="outlined-basic"
                  label={<div style={centerLabelStyle}>Όνομα</div>}
                  variant="standard"
                  className="group-67 elevation rectangle-7"
                  InputProps={{
                    disableUnderline: true,
                    style: { ...inputTextStyle, maxWidth: "25ch" },
                  }}
                  value={formData.contactForm.firstName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      contactForm: {
                        ...prevData.contactForm,
                        firstName: e.target.value,
                      },
                    }))
                  }
                />
              </Box>
              <Box sx={{ display: "flex", width: "225px" }}>
                <TextField
                  id="outlined-basic"
                  label={<div style={centerLabelStyle}>Επώνυμο</div>}
                  variant="standard"
                  className="group-67 elevation rectangle-7"
                  InputProps={{
                    disableUnderline: true,
                    style: { ...inputTextStyle, maxWidth: "25ch" },
                  }}
                  value={formData.contactForm.lastName}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      contactForm: {
                        ...prevData.contactForm,
                        lastName: e.target.value,
                      },
                    }))
                  }
                />
              </Box>
            </div>

            <TextField
              id="outlined-basic"
              label={<div style={centerLabelStyle}>Email</div>}
              variant="standard"
              className="group-67 elevation rectangle-7"
              InputProps={{
                disableUnderline: true,
                style: { ...inputTextStyle, width: "25ch" },
              }}
              value={formData.contactForm.email}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  contactForm: {
                    ...prevData.contactForm,
                    email: e.target.value,
                  },
                }))
              }
            />
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                m: 1,
                width: "52ch",
                height: "25ch",
                borderRadius: "10px",
                marginTop: "10px",
              },
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label={<div style={centerLabelStyle}>Σχόλια</div>}
              variant="standard"
              className="group-67 elevation rectangle-7"
              InputProps={{
                disableUnderline: true,
                style: inputTextStyle,
              }}
              value={formData.contactFormComments.comments}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  contactFormComments: {
                    ...prevData.contactFormComments,
                    comments: e.target.value,
                  },
                }))
              }
            />
          </Box>

          <div style={{ marginTop: "40px", marginLeft: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: isMessageSent ? "grey" : "slateblue",
                  color: "white",
                  pointerEvents:
                    formData.contactFormComments.comments.trim() === ""
                      ? "none"
                      : "auto",
                }}
                onClick={handleFormSubmit}
                endIcon={<SendSharpIcon />}
              >
                ΥΠΟΒΟΛΗ
              </Button>

              {isMessageSent && (
                <div
                  style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: "green", marginRight: "5px" }}>
                    Έγινε υποβολή της ερώτησής σας!
                  </p>
                  <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={handleReset}
                  >
                    Κλείσιμο
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
