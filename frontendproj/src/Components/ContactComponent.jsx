import React from "react";
import Divider from "@mui/material/Divider";
import MailOutlineSharpIcon from "@mui/icons-material/MailOutlineSharp";
import ContactForm from "./ContactForm";
import ContactFormComments from "./ContactFormComments";
import Submit from "./Submit";
import "./ContactComponent.css";

const ContactComponent = () => {
  return (
    <div>
      <div className="footerholder"></div>
      <div className="navbarholder"></div>
      <div className="boxgrey" style={{ height: 650 }}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <h1
            style={{
              fontFamily: "Fira Sans",
              fontSize: "40px",
              color: "slateblue",
              width: "27ch",
              marginLeft: "-5%",
              textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
            }}
          >
            Επικοινωνία
          </h1>
          <Divider
            aria-hidden="true"
            style={{
              marginLeft: "-400px",
              marginBottom: "20px",
              width: "42vw",
            }}
          />
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
        <div style={{ marginTop: "-150px", marginLeft: "1000px" }}>
          <h1
            className="form-title"
            style={{
              fontSize: "1.5rem",
              marginLeft: "-500px",
            }}
          >
            Φόρμα Επικοινωνίας
          </h1>
          <ContactForm />
          <ContactFormComments />
          <div style={{ marginTop: "40px", marginLeft: "10px" }}>
            <Submit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
