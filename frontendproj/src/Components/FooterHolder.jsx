import React, { useState } from "react";
import "./footer1.css";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import YourComponent from "./searchcomp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import ScienceIcon from "@mui/icons-material/Science";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter6Icon from "@mui/icons-material/Filter6";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import DescriptionIcon from "@mui/icons-material/Description";
import WorkIcon from "@mui/icons-material/Work";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import axios from "axios";
import { useEffect, useRef } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterComponent from "./filter";
import { useNavigate } from "react-router-dom";
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

const FooterHolder = () => {
  const navigate = useNavigate();
  const [cardStates, setCardStates] = useState(Array(8).fill(false));
  const [backendResponse, setBackendResponse] = useState(Array(8).fill(null));
  const [backendResponse1, setBackendResponse1] = useState(Array(8).fill(null));
  const [subj, setsubj] = useState(null);
  const [filter, setfilter] = useState(Array(13).fill(null));
  const [proj_nam, setproj] = useState(null);
  
  const initialCases = Array(3)
    .fill(null)
    .map(() => Array(8).fill(null));
  const initialCases1 = Array(6)
    .fill(null)
    .map(() => Array(8).fill(null));
  const initialCases2 = Array(2)
    .fill(null)
    .map(() => Array(8).fill(null));
  
  const cardRefs = Array.from({ length: 9 }).map(() => React.createRef());
  const [backendResponse8, setBackendResponse8] = useState(initialCases);
  const [backendResponse6, setBackendResponse6] = useState(null);
  const [backendResponse2, setBackendResponse2] = useState(initialCases1);
  const [backendResponse3, setBackendResponse3] = useState(initialCases2);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [ypox, setypox] = useState(Array(8).fill(false));
  const [ypox1, setypox1] = useState(Array(8).fill(false));
  const [eidik, seteidik1] = useState(Array(8).fill(false));
  const [eidik1, seteidik2] = useState(Array(8).fill(false));
  const [eidik2, seteidik3] = useState(Array(8).fill(false));
  const [eidik3, seteidik4] = useState(Array(8).fill(false));
  const [eidik4, seteidik5] = useState(Array(8).fill(false));
  const [eidik5, seteidik6] = useState(Array(8).fill(false));
  const [prakt, settyprakt] = useState(Array(8).fill(false));
  const [proj, settyproj] = useState(Array(8).fill(false));
  const [ptyx, settyptyx] = useState(Array(8).fill(false));
  const [mand, setmand] = useState(Array(8).fill(false));
  const [mandB, setmandB] = useState(Array(8).fill(false));
  const [katA, setkatA] = useState(Array(8).fill(false));
  const [katB, setkatB] = useState(Array(8).fill(false));
  const [boxHeight, setBoxHeight] = useState("calc(100vh + 240px)");
  const [heightChanges, setHeightChanges] = useState(Array(8).fill(0));
  const card8Ref = useRef(null);
  
  const ypoxRef = useRef(null);
  const labRef = useRef(null);
  const eidikRef = useRef(null);
  const Kat = useRef(null);
  const ypox1Ref = useRef(null);
  const ypox2Ref = useRef(null);
  const KatB = useRef(null);
  const Proj = useRef(null);
  const Prakt = useRef(null);
  const Ptyx = useRef(null);
  const boxGreyRef = useRef(null);
  const [offset, setOffset] = useState(null);
  const YourCardComponent = ({ subj ,reference}) => (
    <Card sx={{ ...cardStylessubj, left: 100, width: 720} } ref={reference}>
      <p
        style={{
          ...textStyle1,
          whiteSpace: "nowrap",
        }}
      >
        {subj.Name}
      </p>
  
      <span
        style={{
          ...textStyle3,
        }}
      >
        Πληροφορίες
      </span>
      
    </Card>
  );
  const updateCase = (projectIndex, caseIndex, newValue) => {
    setBackendResponse8((prevResponse) => {
      const newResponse = [...prevResponse];
      newResponse[projectIndex][caseIndex] = newValue;
      return newResponse;
    });
  };

  const updateCase2 = (projectIndex, caseIndex, newValue) => {

    setBackendResponse2((prevResponse) => {
      const newResponse = [...prevResponse];
      newResponse[projectIndex][caseIndex] = newValue;
      return newResponse;
    });
  };
  const handleCardRef = (index, ref) => {
    const rect = ref.current.getBoundingClientRect();
  
   
  
    if (rect.bottom < card8Ref.current.getBoundingClientRect().bottom) {
      
      card8Ref.current = ref;
    }
  };

  const updateCase3 = (projectIndex, caseIndex, newValue) => {
    
    setBackendResponse3((prevResponse) => {
      const newResponse = [...prevResponse];
      newResponse[projectIndex][caseIndex] = newValue;
      return newResponse;
    });
  };
  const shouldShowCard = (index,str) => {
    
    if(index == 7){
      console.log(`${str} ,7777`);
    }
    if(index == 9){
      console.log(`${str} ,9999`);
    }
    if (index <= 8) {
      
      if (index <= 7) {

        if (filter[9] && index % 2 == 0) {
          return true;
        }
        if (filter[10] && index % 2 == 1) {
          return true;
        }
      }
      return filter.every((value) => !value) || filter[index];
    } else if ( index === 8 && filter[8]) {
  
      return filter[9] ? index % 2 === 1 : true;
    } else if (index === 9 && filter[9]) {
   
      return filter[8] ? index % 2 === 0 : true;
    } else {
      return false;
    }
  };

  const checkFilters = () => {
    for (let i = 0; i < 10; i++) {
      if (filter[i]) {
        return false; 
      }
    }
    return true; 
  };
  const updateCase0 = (caseIndex, newValue) => {
    setBackendResponse((prevResponse) => {
      const newResponse = [...prevResponse];
      newResponse[caseIndex] = newValue;
      return newResponse;
    });
  };
  const updateCase1 = (caseIndex, newValue) => {
    setBackendResponse1((prevResponse) => {
      const newResponse = [...prevResponse];
      newResponse[caseIndex] = newValue;
      return newResponse;
    });
  };
  const checkCard8Position = () => {
    const index = findLastVisibleCardIndex();
    if (cardRefs[index] && cardRefs[index].current && boxGreyRef.current) {
      const cardRect = cardRefs[index].current.getBoundingClientRect();
      const boxGreyRect = boxGreyRef.current.getBoundingClientRect();

     
      const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
     
      setBoxHeight(`${verticalDistance + 40}px`);
      setOffset(verticalDistance);
    }
  };


  const getPosition = (reference,refname) => {
    if (reference && reference.current && boxGreyRef.current) {
      const cardRect = reference.current.getBoundingClientRect();
      const boxGreyRect = boxGreyRef.current.getBoundingClientRect();

      
      const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
      console.log(`${refname} VD: ${verticalDistance}px`);
     
      return verticalDistance;

    }
    else{
      console.log(`${refname} is not available`);
       return 0;}
  };
  const findLastVisibleCardIndex = () => {

    for (let i = filter.length - 1; i >= 0; i--) {
      if (shouldShowCard(i,"gt")) {

        return i;
      }
    }

    return null; 
  };

  const handleCardClick = async (index) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
    checkCard8Position();
    try {
      const response = await axios.post("http://127.0.0.1:5000/get_mandatory", {
        Semester: index + 1,
      });
      setClickedIndices((prevIndices) => {
        if (prevIndices.includes(index)) {
          return prevIndices.filter((clickedIndex) => clickedIndex !== index);
        } else {
          return [...prevIndices, index];
        }
      });
      if (
        !response.data ||
        !response.data.class ||
        response.data.class.length === 0
      ) {
        updateCase0(index, null);
      } else {
        updateCase0(index, response.data.class);
        setypox((prevState) => {
          const newState = [...prevState];
          newState[index] = true;

          return newState;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response1 = await axios.post("http://127.0.0.1:5000/get_lab", {
        Semester: index + 1,
      });

      if (
        !response1.data ||
        !response1.data.class ||
        response1.data.class.length === 0
      ) {
        updateCase1(index, null);
        //   return;
      } else {

        updateCase1(index, response1.data.class);

        setypox1((prevState) => {
          const newState = [...prevState];
          newState[index] = true;
          return newState;
        });
      }
    } catch (error) {

      console.error("Error:", error);
    }
    try {
      const response3 = await axios.post("http://127.0.0.1:5000/get_kat", {
        Type: ["A", "B"],
        semester: index + 1,
      });

      if (
        !response3.data ||
        !response3.data.class ||
        response3.data.class.length === 0
      ) {
        setBackendResponse6(null);
  
        //   return;
      } else {
 
        setBackendResponse6(response3.data.class);
        const dataForSubject = response3.data.class["A"];
        if (dataForSubject && dataForSubject.length > 0) {
          setkatA((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }
        const dataForSubject1 = response3.data.class["B"];
        if (dataForSubject1 && dataForSubject1.length > 0) {
          setkatB((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        }
      }
     
    } catch (error) {

      console.error("Error:", error);
    }
    try {

      const response2 = await axios.post(
        "http://127.0.0.1:5000/get_eidikeush_class",
        {
          subjects: ["S1", "S2", "S3", "S4", "S5", "S6"],
          semester: index + 1,
        }
      );
  
      if (
        !response2.data ||
        !response2.data.classes ||
        response2.data.classes.length === 0
      ) {

        updateCase2(0, index, null);
        updateCase2(1, index, null);
        updateCase2(2, index, null);
        updateCase2(3, index, null);
        updateCase2(4, index, null);
        updateCase2(5, index, null);
      } else {


        const subjects = ["S1", "S2", "S3", "S4", "S5", "S6"];
        const flags = Array(6).fill(false);

        subjects.forEach((subject) => {
          const dataForSubject = response2.data.classes[subject];
          if (dataForSubject && dataForSubject.length > 0) {
            switch (subject) {
              case "S1":
                flags[0] = true;
         
                updateCase2(0, index, dataForSubject);
                seteidik1((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
         
                break;
              case "S2":
                flags[1] = true;
            
                updateCase2(1, index, dataForSubject);
                seteidik2((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
          
                break;
              case "S3":
                flags[2] = true;
        
                updateCase2(1, index, dataForSubject);
                seteidik3((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
                break;
              case "S4":
                flags[3] = true;
             
                updateCase2(1, index, dataForSubject);
                seteidik4((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
                break;
              case "S5":
                flags[4] = true;
           
                updateCase2(1, index, dataForSubject);
                seteidik5((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
                break;
              case "S6":
                flags[5] = true;
       
                updateCase2(1, index, dataForSubject);
                seteidik6((prevState) => {
                  const newState = [...prevState];
                  newState[index] = true;
                  return newState;
                });
                break;
              default:
                break;
            }
          }
        });
        for (let i = 1; i <= 6; i++) {
          if (flags[i - 1] === true) {
            updateCase2(i - 1, index, response2.data.classes["S" + i]);
          } else {
            updateCase2(i - 1, index, null);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response3 = await axios.post(
        "http://127.0.0.1:5000/get_prakt_ptyx_proj",
        { Type: ["Project", "Πτυχιακή", "Πρακτική"], semester: index + 1 }
      );

      if (
        !response3.data ||
        !response3.data.class ||
        response3.data.class.length === 0
      ) {

        updateCase(0, index, null);
        updateCase(1, index, null);
        updateCase(2, index, null);
      } else {

        const dataForSubject = response3.data.class["Project"];
        if (dataForSubject && dataForSubject.length > 0) {
 
          updateCase(0, index, dataForSubject);
          settyproj((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
  
        } else {
          updateCase(0, index, null);

        }
        const dataForSubject1 = response3.data.class["Πτυχιακή"];
        if (dataForSubject1 && dataForSubject1.length > 0) {

          updateCase(1, index, dataForSubject1);
          settyptyx((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        } else {
      
          updateCase(1, index, null);
        }
        const dataForSubject2 = response3.data.class["Πρακτική"];
        if (dataForSubject2 && dataForSubject2.length > 0) {
          updateCase(2, index, dataForSubject2);
          settyprakt((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        } else {
       
          updateCase(2, index, null);
 
        }
      }
    } catch (error) {
    
      console.error("Error:", error);
    }

    try {
      const response1 = await axios.post("http://127.0.0.1:5000/get_mand", {
        Kat: ["A", "B"],
        semester: index + 1,
      });
   
      if (
        !response1.data ||
        !response1.data.class ||
        response1.data.class.length === 0
      ) {
       
        updateCase3(0, index, null);
        updateCase3(1, index, null);
   
      } else {
      
        const dataForSubject = response1.data.class["A"];
    
        if (dataForSubject && dataForSubject.length > 0) {
     
          updateCase3(0, index, dataForSubject);
          setmand((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
        } else {
          updateCase3(0, index, null);
        }
        const dataForSubject1 = response1.data.class["B"];
  
        if (dataForSubject1 && dataForSubject1.length > 0) {
        
          updateCase3(1, index, dataForSubject1);
          setmandB((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });
    
        } else {
          updateCase3(1, index, null);
        }
      
      }
    } catch (error) {
  
      console.error("Error:", error);
    }
  };
  useEffect(() => {

   
    const getBottomPosition = (ref, refName) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const bottomPosition = rect.bottom;
        return bottomPosition;
      }
      console.log(`${refName} is not available`);
      return 0; 
    };
  
    checkCard8Position();


    window.addEventListener("resize", checkCard8Position);

    const positions = [
      getPosition(card8Ref,"card8"),
      getPosition(ypoxRef,"ypoxrewtika"),
      getPosition(labRef,"klab"),
      getPosition(eidikRef,"idikeysh"),
      getPosition(Kat,"kat"),
      getPosition(ypox1Ref,"katepilo"),
      getPosition(ypox2Ref,"katep 2"),
      getPosition(KatB,"kat b"),
      getPosition(Proj,"proj"),
      getPosition(Prakt,"prakt"),
      getPosition(Ptyx,"ptyx"),
      getPosition(cardRefs[8], "8"),
      getPosition(cardRefs[7], "7"),
      getPosition(cardRefs[6], "6"),
      getPosition(cardRefs[5], "5"),
      getPosition(cardRefs[4], "4"),
      getPosition(cardRefs[3], "3"),
      getPosition(cardRefs[2], "2"),
      getPosition(cardRefs[1], "1"),
      getPosition(cardRefs[0], "0"),
    ];

    if(!checkFilters()){
    const maxPosition = Math.max(...positions);
    setBoxHeight(`${maxPosition + 40}px`)}
  
    return () => {
      window.removeEventListener("resize", checkCard8Position);
    };
  }, [
    handleCardClick 
  ]);

  return (
    <div>
      <div className="footerholder"></div>
      <div className="navbarholder"></div>
      <div className="boxgrey" style={{ height: boxHeight }} ref={boxGreyRef}>
      <div style={{ flexDirection: "column", display: "flex" }}>
  <h1 style={{
    fontFamily: "Fira Sans",
    fontSize: "40px",
    color: "#6A5ACD",
    marginTop: "40px",
    left:0,
    bottom:0,
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


          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* <Routes>
        <Route path="/ok" element={<YourComponent subj={subj} />} />
      </Routes> */}
            <YourComponent setsubj={setsubj} />
            {!subj && <FilterComponent filter={filter} setFilter={setfilter} />}
          </div>
          {subj ? (
            <YourCardComponent subj={subj} />
          ) : (
            <div className="elevation fix-card">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} style={{ marginBottom: "10px", zIndex: 9 }}>
                  <Card
                    sx={{
                      marginTop: index === 0 ? 3 : 1,
                      ...cardStyles,
                      display: shouldShowCard(index,"ooookk") ? "block" : "none",
                    }}
                     
                    ref={cardRefs[index]}
                   
                    onClick={() => handleCardClick(index)}
                  >
                    {cardStates[index] ? (
                      <ArrowDropDownIcon sx={{ ...arrowStyle }} />
                    ) : (
                      <ArrowRightIcon sx={{ ...arrowStyle }} />
                    )}
                    <p style={{ ...textStyle }}>
                      {index <= 7 ? `${index + 1}ο Εξάμηνο` : "Ελεύθερα"}
                    </p>
                  </Card>
                  {clickedIndices.includes(index) && (
                    <>
                      {ypox[index] &&   shouldShowCard(index,"1") &&  (
                        <div>
                           <Card sx={{ ...cardWithRectangleStyles }} >
                            <PriorityHighIcon
                              sx={{ color: "#FFC700", marginLeft: "30px" }}
                            />
                            <p style={updatedTextStyle}>Υποχρεωτικά </p>
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse[index]) ? (
                              backendResponse[index] &&
                              backendResponse[index].map((classInfo, index) => (
                                <YourCardComponent  subj={classInfo} reference={ypoxRef}/>
                              ))
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}

                      {ypox1[index] && shouldShowCard(index,"2")  &&(
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles1 } } >
                            <ScienceIcon
                              sx={{ color: "#00F0FF", marginLeft: "30px" }}
                            />
                            <p style={updatedTextStyle}>Εργαστήρια </p>
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse1[index]) ? (
                              backendResponse1[index] &&
                              backendResponse1[index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={labRef}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {katA[index] && shouldShowCard(index,"3") && (
                        <Card sx={{ ...cardWithRectangleStyles3 }} >
                          {" "}
                          <LooksOneIcon
                            sx={{ color: "purple", marginLeft: "30px" }}
                          />{" "}
                          <p style={updatedTextStyle}>Κατεύθυνση Α </p>{" "}
                        </Card>
                      )}
                      {mand[index] && shouldShowCard(index,"4") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles4 }} >
                            {" "}
                            <PriorityHighIcon
                              sx={{ color: "blue", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>
                              Κατ'Επιλογήν Υποχρεωτικά{" "}
                            </p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse3[0][index]) ? (
                              backendResponse3[0][index] &&
                              backendResponse3[0][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={ypox1Ref} />
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik[index] && shouldShowCard(index,"5") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 } } >
                            {" "}
                            <Filter1Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 1</p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[0][index]) ? (
                              backendResponse2[0][index] &&
                              backendResponse2[0][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={eidikRef}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik1[index] && shouldShowCard(index,"6") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 } }>
                            {" "}
                            <Filter2Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 2</p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[1][index]) ? (
                              backendResponse2[1][index] &&
                              backendResponse2[1][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={eidikRef}/>
                                 
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik2[index] && shouldShowCard(index,"7") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 } } >
                            {" "}
                            <Filter3Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 3</p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[2][index]) ? (
                              backendResponse2[2][index] &&
                              backendResponse2[2][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={eidikRef}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {proj[index] && shouldShowCard(index,"8") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles6 } } >
                            {" "}
                            <AccountTreeIcon
                              sx={{ color: "fuchsia", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}> Project </p>{" "}
                          </Card>

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse8[0][index]) ? (
                              backendResponse8[0][index] &&
                              backendResponse8[0][index].length > 1 ? (
                                <YourCardComponent subj={backendResponse8[0][index][1]} reference={Proj} />
                              ) : (
                                <p></p>
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {katB[index] && shouldShowCard(index,"9") && (
                        <Card sx={{ ...cardWithRectangleStyles3 }} >
                          {" "}
                          <LooksTwoIcon
                            sx={{ color: "purple", marginLeft: "30px" }}
                          />{" "}
                          <p style={updatedTextStyle}>Κατεύθυνση Β </p>{" "}
                        </Card>
                      )}
                      {mandB[index] && shouldShowCard(index,"10") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles4 }} >
                            {" "}
                            <PriorityHighIcon
                              sx={{ color: "blue", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>
                              Κατ'Επιλογήν Υποχρεωτικά{" "}
                            </p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse3[1][index]) ? (
                              backendResponse3[1][index] &&
                              backendResponse3[1][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={ypox2Ref}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik3[index] && shouldShowCard(index,"11") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 }}>
                            {" "}
                            <Filter4Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 4 </p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[3][index]) ? (
                              backendResponse2[3][index] &&
                              backendResponse2[3][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} />
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik4[index] && shouldShowCard(index,"12") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 }} >
                            {" "}
                            <Filter5Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 5</p>{" "}
                          </Card>

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[4][index]) ? (
                              backendResponse2[4][index] &&
                              backendResponse2[4][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={eidikRef}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {eidik5[index] && shouldShowCard(index,"13") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles2 }} >
                            {" "}
                            <Filter6Icon
                              sx={{ color: "green", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}>Ειδίκευση 6</p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse2[5][index]) ? (
                              backendResponse2[5][index] &&
                              backendResponse2[5][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={eidikRef}/>
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {prakt[index] && shouldShowCard(index,"14") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles5 }}>
                            {" "}
                            <WorkIcon
                              sx={{ color: "brown", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}> Πρακτική </p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse8[2]) ? (
                              backendResponse8[2][index] &&
                              backendResponse8[2][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={Prakt}/>
                                )
                              )
                            ) : (
                              <p>No data available</p>
                            )}
                          </div>
                        </div>
                      )}
                      {ptyx[index] && shouldShowCard(index,"15") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles5 }} >
                            {" "}
                            <DescriptionIcon
                              sx={{ color: "brown", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}> Πτυχιακή </p>{" "}
                          </Card>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse8[1][index]) ? (
                              backendResponse8[1][index] &&
                              backendResponse8[1][index].map(
                                (classInfo, index) => (
                                  <YourCardComponent subj={classInfo} reference={Ptyx} />
                                )
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                      {proj[index] && shouldShowCard(index,"16") && (
                        <div>
                          <Card sx={{ ...cardWithRectangleStyles6 }}>
                            {" "}
                            <AccountTreeIcon
                              sx={{ color: "fuchsia", marginLeft: "30px" }}
                            />{" "}
                            <p style={updatedTextStyle}> Project </p>{" "}
                          </Card>

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {Array.isArray(backendResponse8[0][index]) ? (
                              backendResponse8[0][index] &&
                              backendResponse8[0][index].length > 1 ? (
                                <YourCardComponent subj={backendResponse8[0][index][0]} reference={Proj}/>
                              ) : (
                                <p></p>
                              )
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default FooterHolder;
