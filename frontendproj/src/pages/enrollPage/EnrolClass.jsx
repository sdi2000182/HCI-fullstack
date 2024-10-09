import React, { useState, useRef, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Search from "../../Components/searchcomp";
import { Link, useNavigate } from "react-router-dom";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer.jsx";
import { useParams ,useLocation} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

const EnrolClass = () => {
  const location = useLocation();
  const { id ,classId} = useParams();
  console.log("malista ",id);
  const card8Ref = useRef(null);
  const boxGreyRef = useRef(null);
  const [subj, setSubj] = useState('');
  const [checkedItems,setCheckedItems] = useState('');
  const [semester,setSem] = useState('');
  const [fl,setFl] = useState('');
  const [fl2,setFl2] = useState('');
  const navigate = useNavigate();
  const handleCheckboxChange = (id1, category) => {
    
    setCheckedItems((prevCheckedItems) => ({
        ...prevCheckedItems,
        [`${category}-${id1}`]: !prevCheckedItems[`${category}-${id1}`],
      }));
      var check = JSON.stringify({
        ...checkedItems,
        [`${category}-${id1}`]: !checkedItems[`${category}-${id1}`],
      });
      localStorage.setItem(id, check);
      
    };


  const isClassEnrollable = (classId,bp) => {
   

    const result = bp.find((item) => item.Class_ID == classId);
    console.log("theoo",result ? result.can_enroll : false)
    return result ? result.can_enroll : false;
  };
  const isClassEnrollable1 = (classId,bp) => {

    const result = bp.find((item) => item.Class_ID == classId);
    console.log("theoo",result ? result.can_enroll : false)
    
    return result ? result.can_enroll : false;
  };
  useEffect(() => {
    
    const storedSubj1 = localStorage.getItem('subj');
    var storedSubj = JSON.parse(storedSubj1);
    const check1 = localStorage.getItem(`${id}`);
    var check = JSON.parse(check1);
    console.log("thischeck",check);
    const flag1 = localStorage.getItem('flag1');
    var flagA= JSON.parse(flag1);
    const flag2 = localStorage.getItem('flag2');
    var flagB = JSON.parse(flag2);
    
    if (storedSubj) {
      setSubj(storedSubj);
      console.log("stt",storedSubj)
    }
    setCheckedItems(check);
    setSem(localStorage.getItem('semester'));
    setFl(flagA);
    setFl2(flagB);
  }, []);

  const YourCardComponent = ({
    subj,
    reference,
    isChecked,
    onCheckboxChange,
    checkedCount,
    index,
  }) => {
    console.log("checkedcount ", checkedCount);
  
    if (index === 9) {
      console.log("subj is ", subj);
    }
  
    let num;
    if (semester > 8) {
      num = 12;
    } else {
      console.log("10 is ", semester);
      num = 6;
    }
  
    const isEnrollable = isClassEnrollable(classId,fl);
    const isEnrollable1 = isClassEnrollable1(classId,fl2);
    var name="";
    const localStorageItem = JSON.parse(localStorage.getItem("subj"));


    name = localStorageItem.Name;
    return (
      
      <Card sx={{ ...cardStylessubj, left: 100, width: 720 }}>
        {checkedCount + 1 <= num || isChecked ? (
          (isEnrollable && !isEnrollable1) ? (
            <Checkbox
              checked={isChecked}
              onChange={onCheckboxChange}
              sx={{
                color: "#6a5acd",
                "&.Mui-checked": {
                  color: "#6a5acd",
                },
              }}
            />
          ) : null
        ) : null}
  
        <p
          style={{
            ...textStyle1,
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </p>
  
        <span
          style={{
            ...textStyle3,
          }}
        >
          Πληροφορίες
        </span>
        {isEnrollable1 && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'green',
              color: 'white',
              padding: '4px 8px',
              fontSize: '14px',
            }}
          >
            Το μάθημα έχει περαστεί
          </div>
        )}
         {!isEnrollable && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: '#ff5e00',
              color: 'white',
              padding: '4px 8px',
              fontSize: '14px',
            }}
          >
            Δεν έχετε περάσει το προαπαιτούμενο μάθημα
          </div>
        )}
         {!isChecked && checkedCount >= num && isEnrollable && !isEnrollable1 &&(
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'red',
                color: 'white',
                padding: '4px 8px',
                fontSize: '14px',
              }}
            >
              Έχετε φτάσει στο όριο μαθημάτων {`${num}`}
            </div>
          )}
      </Card>
    );
  };
  

  return (
    <div>
      
      <LoggedNavbar />
      <CustomButtonGroup activePage='ΜΑΘΗΜΑΤΑ' />
      
      <div className="boxgrey" style={{height:"700px"}}>
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
            whiteSpace:"nowrap"
          }}>
            <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px",marginRight:"20px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
            Δήλωση Μαθημάτων
          </h1>
         <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "15px", width: "42vw", alignSelf: 'flex-start' }} />
       </div>
      <div className="boxgrey" style={{background: "#D9D9D9",height:"400px"}}>
        

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Search semester={semester} id={id} isEnrolled={false} flag={2} checkedItems={checkedItems}/>
        </div>

        {/* Render YourCardComponent if subj is available */}
        {subj && <YourCardComponent  
         key={`${classId}-${classId}`}
         subj={subj}
         index={9}

         isChecked={
           checkedItems[
             `${classId}-${classId}`
           ]
         }
         
         onCheckboxChange={() =>
           handleCheckboxChange(
             classId,
             `${classId}`
           )
         }
         checkedCount={
           Object.values(checkedItems).filter(
             (isChecked) => isChecked
           ).length
         }/>}
      </div>

      <div style={{ bottom: 0, marginTop: "15%", marginBottom: "0" }}>
       
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default EnrolClass;