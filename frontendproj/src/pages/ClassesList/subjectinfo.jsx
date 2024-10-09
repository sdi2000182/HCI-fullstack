import React, { useState } from "react";
import "../../Components/footer1.css";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate,useParams, Link } from "react-router-dom";
import { Button } from "@mui/material";
import  Image1 from "../../Components/images/eudoxus.png";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer";
import {Breadcrumbs} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const cardStyles = {
  width: 883,
  height: 50,
  marginLeft: 5,
  marginTop: 3,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  zIndex: 9,
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

const cardStyles1 = {
  ...cardStyles,
  position: "relative",
  left: "75px",
};

const arrowStyle = {
  width: "40.55px",
  height: "40.87px",
  position: "absolute",
  left: "30px",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "15px",
  display: "flex",
  marginLeft: "50px",
};

const textStyle1 = {
  ...textStyle,
  fontSize: "20px",
  top: 0,
  left: 0,
  position: "absolute",
};

const textStyle3 = {
  ...textStyle,
  fontSize: "15px",
  marginTop: "-5px",
  whiteSpace: "nowrap",
  bottom: 15,
  left: 0,
  position: "absolute",

  color: "#6A5ACD",
};
const textStyle2 = {
  ...textStyle,

  fontSize: "12px",
  fontWeight: "normal",
  position: "absolute",
  left: 0,
  top: 40,
};
const updatedTextStyle = {
  ...textStyle, 
  marginLeft: "25px",
};

const cardWithRectangleStyles = {
  ...cardStyles,
  position: "relative", 
  left: "50px",
  aligntems: "center",
  "&::before": {
    content: '""',
    position: "relative",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "#FFC700",
  },
};

const cardWithRectangleStyles1 = {
  ...cardStyles,
  position: "relative", 
  left: "50px",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "relative",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "#00F0FF",
  },
};

const cardWithRectangleStyles2 = {
  ...cardStyles,
  left: "75px",
  position: "relative", 
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "relative",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "green",
  },
};



const cardWithRectangleStyles3 = {
  ...cardStyles,
  position: "relative",
  left: "50px",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "relative",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "purple",
  },
};

const cardWithRectangleStyles4 = {
  ...cardStyles,
  position: "relative", 
  left: "75px",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "blue",
  },
};

const cardWithRectangleStyles5 = {
  ...cardStyles,
  position: "relative",
  left: "50px",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "brown",
  },
};

const cardWithRectangleStyles6 = {
  ...cardStyles,
  position: "relative", 
  left: "75px",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "8px",
    height: "64px",
    left: "0px",
    top: "0px",
    background: "fuchsia",
  },
};

const SubjectInfo = () => {
  const navigate = useNavigate();
  const [cardStates, setCardStates] = useState(Array(3).fill(false));
  const [clickedIndices, setClickedIndices] = useState([null]);
  const bookRef =useRef(null);
  const [boxHeight, setBoxHeight] = useState("calc(90px)");
  const [boxHeight2, setBoxHeight2] = useState("calc(100vh)");
  const [book,setbook] = useState(null);
  const [teacher,setteacher] = useState(null);
  const [subj,setsubj] = useState(null);
  const [heightChanges, setHeightChanges] = useState(Array(8).fill(0));
  const card8Ref = useRef(null);
  const boxGreyRef = useRef(null);

  const boxGrey2Ref = useRef(null);
  const [offset, setOffset] = useState(null);
  const { classID } = useParams();
  

  const handleClick = () => {
  
    window.location.href = 'https://eudoxus.gr/';
  };


 
  const checkCard8Position = () => {
    if (card8Ref && card8Ref.current && boxGreyRef.current) {
      const cardRect = card8Ref.current.getBoundingClientRect();
      const boxGreyRect = boxGreyRef.current.getBoundingClientRect();
      const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
   
      setBoxHeight(`${verticalDistance + 60}px`);
      setOffset(verticalDistance);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/get_one_class", {
          Class_ID: classID,
        });

        if (!response.data || !response.data.class || response.data.class.length === 0) {
          setsubj(null);
        } else {
          setsubj(response.data.class);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [classID]);

  

  const handleCardClick = async (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
   
    checkCard8Position();
    setClickedIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((clickedIndex) => clickedIndex !== index);
      } else {
        return [...prevIndices, index];
      }
    });
    if(index==2){
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_class_book", {
        Clas_ID: classID,
      });
      
      if (
        !response.data ||
        !response.data.book ||
        response.data.book.length === 0
      ) {

        setbook(null);
      } else {
 
        setbook(response.data.book);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    }
  if(index==1){
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_tutor", {
        Clas_ID: classID,
      });
      if (
        !response.data ||
        !response.data.tutor ||
        response.data.tutor.length === 0
      ) {
       
        setteacher(null);
      } else {
     
        setteacher(response.data.tutor);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
    
  };
  useEffect(() => {

    checkCard8Position();
    const getPosition = (reference,refname) => {
      if (reference && reference.current && boxGreyRef.current) {
        const cardRect = reference.current.getBoundingClientRect();
        const boxGreyRect = boxGreyRef.current.getBoundingClientRect();
        const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
     
        return verticalDistance;
  
      }
      else{
        return 0;
      }
    }
    const positions = [
      getPosition(card8Ref,"card8"),
      getPosition(bookRef,"book"),

    ];
    const maxPosition = Math.max(...positions);
 
    setBoxHeight(`${maxPosition + 100}px`);
    
    
    window.addEventListener("resize", checkCard8Position);
 
    return () => {
      window.removeEventListener("resize", checkCard8Position);
    };
  }, [
    handleCardClick,
  ]);
  return (
    <div>
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΜΑΘΗΜΑΤΑ' />
      <div style={{ display: "flex", flexDirection: "row", margin: "1%", alignContent:"center" }}>
        <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
        <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
          <Link color="inherit" to="/courses">
            Λίστα Μαθημάτων
          </Link>
          <span style={{ color: "#6A5ACD" }}>Πληροφορίες Μαθήματος</span>
        </Breadcrumbs>
      </div>
      <div className="boxgrey" style={{ height: boxHeight, marginBottom:"140px"}} ref={boxGreyRef}>
       
        
      <div style={{ flexDirection: "column", display: "flex" }}>
  <h1 style={{
    fontFamily: "Fira Sans",
    fontSize: "40px",
    color: "#6A5ACD",
    marginTop: "40px",
    left:0,
    bottom:0,
    marginLeft: "2%",  
    width: "27ch",
    marginBottom: "0%",
    alignSelf: 'flex-start',
    textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
  }}>
    Πληροφορίες Μαθήματος
  </h1>
  <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
  </div>
        <div className="rectangle-22" style={{ height: boxHeight + 300}}  >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
         
        </div>
          <div className="elevation fix-card">
         
          <Card
                  sx={{
                    marginTop: 3,
                    ...cardStyles,
                    
                  }}
                >
                   {subj!==null && (
                      <strong style={{ ...textStyle }}> {subj[0].Name}</strong>)}
                  </Card>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={{ marginBottom: "10px", zIndex: 9 }}>
                <Card
                  sx={{
                    marginTop: index === 0 ? 3 : 1,
                    left:'50px',
                    ...cardStyles,
                    
                  }}
                  ref={index == 2 ? card8Ref: null}
                
                  onClick={() => handleCardClick(index)}
                >
                  {cardStates[index] ? (
                    <ArrowDropDownIcon sx={{ ...arrowStyle }} />
                  ) : (
                    <ArrowRightIcon sx={{ ...arrowStyle }} />
                  )}
                  <p style={{ ...textStyle }}>
                    {index === 0 && "Γενικά Στοιχεία Μαθήματος"}
                    {index === 1 && "Διδάσκων Καθηγητής"}
                    {index === 2 && "Συγγράμματα"}
                  </p>
                </Card>

                {index === 0 && clickedIndices.includes(0) && (
  <>
   {subj && (
  <div>
    <table className="elevation fix-card" style={{ marginLeft: "125px", marginTop: "10px", width: "60%", height: "auto", borderCollapse: "collapse", background: "white" }}>
      <tbody>

        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}> Κωδικός Μαθήματος</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Class_ID}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Εξάμηνο</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Semester}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Τύπος</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Type}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}> Ειδίκευση</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Eidikeusi ==="NULL" ? "-" : subj[0].Eidikeusi}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Κατεύθυνση</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Kateythinsi}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Βαθμός Βάσης</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{5}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>ECTS</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].ECTS}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Υπολογίζεται στον βαθμό πτυχίου</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{ subj[0].CalcForGrad == 1 ? "Ναι" : "Όχι"}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Προαπαιτούμενα μαθήματα</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Prereq}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Γνωστικό Αντικείμενο</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Cognitive}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Ώρες θεωρίας</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Theory}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Ώρες εργαστηρίου</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>{subj[0].Lab}</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #ddd' }}>
          <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>  Ιστοσελίδα Μαθήματος</td>
          <td style={{ padding: '10px', textAlign: 'left' }}>
  <a href={subj[0].WebPage} target="_blank" rel="noopener noreferrer">
    {subj[0].WebPage}
  </a>
</td>
        </tr>
      </tbody>
    </table>
  </div>
)}
</>)}


                {index === 1 && clickedIndices.includes(1) && (
  <>
    {teacher && (
      <div>
        <table className="elevation fix-card" style={{ marginLeft: "125px", marginTop: "10px", width: "40%", height: "auto", borderCollapse: "collapse", background: "white" }}>
          <tbody>
    
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Ονοματεπώνυμο Καθηγητή</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{teacher[0].Name} {teacher[0].Last}</td>
            </tr>
 
            <tr>
              <td style={{ padding: '10px', textAlign: 'left', fontWeight: 'bold' }}>Email</td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{teacher[0].Email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </>
)}
<table className="elevation fix-card" style={{ marginLeft: "125px", marginTop: "10px", width: "50%", height: "auto",borderCollapse: "collapse", background: "white" }}>
  
  <tbody>
    {clickedIndices.includes(2) && index === 2 && (
      <>
        
        {book && (
         
          <>
          
            {Array.isArray(book) ? (
             
              book.map((classInfo, index) => (
                <tr key={index} style={{ display: 'flex', alignItems: 'center',borderSpacing: "0 2px", borderBottom: '1px solid #ddd', marginBottom: '2px'}}>
                
                  <MenuBookIcon sx={{ marginLeft: "20px" }} />
                  <span style={{ ...textStyle, fontWeight: "normal", whiteSpace: "nowrap", marginLeft: "10px" }} >
                    Βιβλίο {classInfo.Book_ID} {classInfo.Name} {classInfo.Author}
                  </span>
                </tr>
              ))
            ) : (
         
              <tr className="table-row">
                <td colSpan="3" className="table-cell" style={{ borderBottom: '1px solid #ddd' }}>Δεν υπάρχουν διαθέσιμα βιβλία</td>
              </tr>
            )}
          
          </>
        )}
      </>
    )}
  </tbody>
  
</table>
{clickedIndices.includes(2) && index==2 &&(
  <Button
  sx={{...cardStyles, width: 'auto', backgroundColor: '#6A5ACD', left: '120px'}}
  variant="contained"
  ref={bookRef}
  onClick={handleClick}
  endIcon={<img src={Image1} alt="Logo" style={{ marginLeft: '5px', width: '100px', height: '20px' }} />}
>
  Μετάβαση σε
</Button>)}
              </div>
              
            ))}

          </div>
          </div>
      </div>
      <Footer/>
    </div>
  );
} ;

export default SubjectInfo;
