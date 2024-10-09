import React, { useState } from "react";
import "../../Components/footer1.css";
import "../../Components/Buttons.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Apply, ViewCertificates } from "../../Components/Buttons";
import img1 from "../../Components/images/army.png";
import img2 from "../../Components/images/yeah.png";
import img3 from "../../Components/images/laptop.png";
import img4 from "../../Components/images/calculator.png";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import Footer from "../../Components/footer";
import CustomButtonGroup from "../../Components/menubar";
import LoggedNavbar from "../../Components/navbarLOGGED";

export default function CertificateMenu() {
  const cardWidth = 315;
  const cardHeight = 320;

  const initialCardsData = [
    {
      img: img1,
      counter: 1,
      name: "Στρατολογικής Χρήσης (Αναλυτικό)",
      marginTop: "25px",
    },
    {
      img: img1,
      counter: 1,
      name: "Στρατολογικής Χρήσης (Συνοπτικό)",
      marginTop: "25px",
    },
    { img: img3, counter: 1, name: "Φοιτητικής Ιδιότητας", marginTop: "25px" },
    { img: img4, counter: 1, name: "Φορολογικής Χρήσης", marginTop: "25px" },
    {
      img: img2,
      counter: 1,
      name: "Αναλυτική βαθμολογία με προβιβάσιμους βαθμούς",
      marginTop: "5px",
    },
  ];

  const incrementCounter = (index) => {
    setCardsData((prevData) => {
      const newData = [...prevData];
      newData[index].counter += 1;
      return newData;
    });
  };

  const decrementCounter = (index) => {
    setCardsData((prevData) => {
      const newData = [...prevData];
      if (newData[index].counter > 1) {
        newData[index].counter -= 1;
      }
      return newData;
    });
  };

  const [cardsData, setCardsData] = useState(initialCardsData);

  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΠΙΣΤΟΠΟΙΗΤΙΚΑ'/>
      <div className="boxgrey" style={{ height: 650}}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "20px",
            color: "slateblue",
            marginTop: "20px",
          }}
        >
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
            Πιστοποιητικά
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>

          <h5 style={{ fontSize: 15, color: "black" }}>
            Αίτηση για παροχή πιστοποιητικού
          </h5>
          <div style={{ display: "flex", gap: "50px" }}>
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
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontSize: "1rem", marginTop: "-15px" }}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {card.name}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginTop: card.marginTop || "5px" }}
                      >
                        Αντίτυπα {card.counter}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ marginTop: "5px" }}
                      ></Typography>
                      <div style={{ cursor: "pointer" }}>
                        <Button onClick={() => decrementCounter(index)}>
                          -
                        </Button>
                        <Button onClick={() => incrementCounter(index)}>
                          +
                        </Button>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ marginTop: "5px" }}
                        ></Typography>
                        <div
                          style={{
                            display: "flex",
                            marginLeft: "16px",
                          }}
                        >
                          <Apply counter={card.counter} type={card.name}/>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginTop: "30px" }}
          ></Typography>
          <ViewCertificates
            style={{ marginTop: "20px", marginBottom: "20px" }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
