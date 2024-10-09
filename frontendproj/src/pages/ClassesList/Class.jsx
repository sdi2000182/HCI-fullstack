import React, { useState, useRef } from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Search from "../../Components/searchcomp";
import { Link } from "react-router-dom";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer.jsx";
import { useParams } from "react-router-dom";

const textStyle = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: "17px",
    display: "flex",
    marginLeft: "50px",
  };
  
  const textStyle1 = {
    ...textStyle,
    fontSize: "15px",
    top: 0,
    left: 0,
    position: "absolute",
  };
const cardStylessubj = {
    width: 500,
    height: 60,
    left: "100px",
    marginLeft: 5, 
    marginTop: 3, 
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 8,
  };


  const textStyle3 = {
    ...textStyle,
    fontSize: "13px",
    marginTop: "-5px",
    whiteSpace: "nowrap",
    bottom: 10,
    left: 0,
    position: "absolute",
  
    color: "#6A5ACD",
  };
const Class = () => {
    const { Name, Id } = useParams();
  const card8Ref = useRef(null);
  const boxGreyRef = useRef(null);

  const YourCardComponent = () => (
    <Card sx={{ ...cardStylessubj, left: 100, width: 720} } >
      <p
        style={{
          ...textStyle1,
          whiteSpace: "nowrap",
        }}
      >
        {Name}
      </p>
  
      <span style={{ ...textStyle3 }}>
        <Link to={`/courses/${ Id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          Πληροφορίες
        </Link>
      </span>
      
    </Card>
  );

  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΜΑΘΗΜΑΤΑ' />
      
      <div className="boxgrey" style={{height:"400px"}}>
        <div style={{ flexDirection: "column", display: "flex" }}>
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            marginTop: "40px",
            marginLeft: "2%",  
            width: "18ch",
            marginBottom: "0%",
            alignSelf: 'flex-start',
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
            Λίστα Μαθημάτων
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Search />
        </div>

        {<YourCardComponent  />}
      </div>
      <div style={{bottom:0}}>
    
      </div>
      <div style={{bottom:0,marginTop:"15%",marginBottom:"0"}}>
     <Footer />
     </div>
    </div>
    

  );
};

export default Class;