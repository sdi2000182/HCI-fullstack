import React, { useEffect, useState } from 'react';
import '../Components/footer1.css';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Axios from 'axios';
import FilterComponent2 from '../Components/filter2';
import {Typography} from '@mui/material';
import {Box} from '@mui/material';
import {Button} from '@mui/material'
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import excellogo from "../Components/excel_logo_icon_208937.png"
import { saveAs } from 'file-saver';
import LoggedNavbar from '../Components/navbarLOGGED';
import Footer from '../Components/footer.jsx';
import CustomButtonGroup from '../Components/menubar.jsx';
import {Link, useNavigate} from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Breadcrumbs} from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "17px",
  display: "flex",
  marginLeft: "0px",
};




const buttoninBoxStyles = {
    position: 'relative',
    background: '#6A5ACD',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: '#FFFFFF',
    cursor: 'pointer', 
    textTransform:"none",
    height:"40px",
    width:"200px",
}




  
const FullGrade = () => {
    const navigate = useNavigate();
    const [semesterData, setSemesterData] = useState([]);
    const [gradeFilter, setGradeFilter] = useState('all');
    const [filter, setfilter] = useState(semesterData.map(() => false));

    const [checkedFilterNames, setCheckedFilterNames] = useState([]);
    
    const filteredGrades = semesterData.map((semester) => {
       
        const filteredSemesterGrades = semester.all_grades.filter(
          (grade) =>
            (gradeFilter === 'passed' && grade.Grade >= 5) ||
            (gradeFilter === 'failed' && grade.Grade < 5) ||
            gradeFilter === 'all'
        );
        
        
        
        if (filter.some((isChecked, index) => isChecked && semesterData[index].Semester === semester.Semester)) {
          return {
            ...semester,
            all_grades: filteredSemesterGrades,
          };
        }return semester;
    });
    const hasFilteredGrades = filteredGrades.some((semester) => {
        const filteredSemesterGrades = semester.all_grades.filter(
          (grade) =>
            (gradeFilter === 'passed' && grade.Grade >= 5) ||
            (gradeFilter === 'failed' && grade.Grade < 5) ||
            gradeFilter === 'all'
        );
        return filteredSemesterGrades.length > 0;
    });
      
    const handleFilterChange = (newFilter) => {
        setfilter(newFilter);

        const names = semesterData
          .filter((semester, index) => newFilter[index])
          .map((checkedSemester) => checkedSemester.Semester);
    
        setCheckedFilterNames(names);
  
     
      };

      const clickExportExcel = async (semesterData, filter,checkedFilterNames,gradeFilter) => {
        try {
  
          const response = await Axios.post(`http://127.0.0.1:5000/get_all_grades_excel`, {
                semesterFilter: checkedFilterNames, Student_ID: jwtDecode(localStorage.getItem('token')).sub.User_ID
                ,gradeFilter: gradeFilter
          }, {
            responseType: 'blob', 
          });
      
         
          saveAs(response.data, 'Αναλυτική Βαθμολογία.xlsx');
      
        } catch (error) {
          console.error('Error triggering file export:', error);
        }
      };
    const fetchAveragePerSemester = async () => {
      try {
        const response = await Axios.post('http://127.0.0.1:5000/average_per_semester', { Student_ID: jwtDecode(localStorage.getItem('token')).sub.User_ID });
  
       
        setSemesterData(response.data.semesters);
      } catch (error) {
        console.error('Error:', error);

      }
    };

    const hasFailedGrades = checkedFilterNames.length === 0 || checkedFilterNames.some((semesterName) => {

        const semester = semesterData.find((semester) => semester.Semester === semesterName);
        if (semester) {
            const filteredSemesterGrades = semester.all_grades.filter(
                (grade) =>
                    (gradeFilter === 'failed' && grade.Grade < 5)
            );
            return filteredSemesterGrades.length > 0;
        }
        return false;
    });
    
    const hasPassedGrades = checkedFilterNames.length === 0 || checkedFilterNames.some((semesterName) => {
        const semester = semesterData.find((semester) => semester.Semester === semesterName);
        if (semester) {
            const filteredSemesterGrades = semester.all_grades.filter(
                (grade) =>
                    (gradeFilter === 'passed' && grade.Grade >= 5)
            );

            return filteredSemesterGrades.length > 0;
        }
        return false;
    });
  
    useEffect(() => {

      fetchAveragePerSemester();
    }, []);
  
    return (
      <div>
        <LoggedNavbar />
        <CustomButtonGroup activePage='ΑΡΧΙΚΗ'/>
        <div style={{ display: "flex", flexDirection: "row", margin: "1%", alignContent:"center" }}>
          <ArrowBackIcon sx={{ fontSize: "30px", marginTop: "5px", '&:hover': { color: '#4A0080', }, 'cursor':"pointer" }} onClick={() => navigate(-1)}/>
          <Breadcrumbs style={{ margin: "10px", marginLeft: "1%" }}>
            <Link color="inherit" to="/student-home">
              Αρχική
            </Link>
            <span style={{ color: "#6A5ACD" }}>Αναλυτική Βαθμολογία</span>
          </Breadcrumbs>
        </div>
        <div className="boxgrey" style={{ height: 'your_box_height' }} ref={React.createRef()}>
          <div style={{ flexDirection: "column", display: "flex" }}>
            <h1 style={{
              fontFamily: "Fira Sans",
              fontSize: "40px",
              color: "#6A5ACD",
              marginTop: "40px",
              left: 0,
              bottom: 0,
              marginLeft: "2%",
              width: "20ch",
              marginBottom: "0%",
              alignSelf: 'flex-start',
              textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
            }}>
              Αναλυτική Βαθμολογία
            </h1>
            <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw", alignSelf: 'flex-start' }} />
            <div style={{marginBottom:"50px"}}>
            <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
            <div className="toggle-group" style={{marginLeft: "2%",}}>
          <div className="toggle-container">
 
  <div
    className={`toggle-state ${gradeFilter === 'all' ? 'active' : 'white'}`}
    onClick={() => setGradeFilter('all')}
  >
    Όλα
  </div>
  <div
    className={`toggle-state ${gradeFilter === 'passed' ? 'active active-green': 'white'}`}
    onClick={() => setGradeFilter('passed')}
  >
    Περασμένα
  </div>
  <div
    className={`toggle-state ${gradeFilter === 'failed' ? 'active active-red'  : 'white'}`}
    onClick={() => setGradeFilter('failed')}
  >
    Μη Περασμένα
  </div>
</div>
          </div>
          <FilterComponent2 filter={filter} setFilter={handleFilterChange} semesters={semesterData} />
          {(!(hasPassedGrades || gradeFilter !== 'passed') || !(hasFailedGrades || gradeFilter !== 'failed')) || (
            (semesterData.length > 0) && (
              <Button style={{ ...buttoninBoxStyles, marginLeft: "40px", marginTop: "20px" }} onClick={() => clickExportExcel(semesterData, filter, checkedFilterNames, gradeFilter)}>
                Εξαγωγή σε Excel <img src={excellogo} style={{ filter: 'invert(100%)', height: "24px", width: "30px", marginLeft: "10px" }} />
              </Button>
            )
          )}


          </div>
            <Paper className="elevation fix-card"
              sx={{
                marginLeft: "40px",
                width: "80%",
                marginTop: "20px",
                overflowY: "auto",
                height: "400px", 
                borderRadius: "10px",
                scrollbarColor: "slateblue lightgray", 
    '&::-webkit-scrollbar': {
      width: '12px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'slateblue',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'lightgray', 
      borderRadius: '10px',
    },
              }}
            >
            <List>
    {hasFilteredGrades  > 0 ? (
        <>
      {filteredGrades.map((semester) => {
        const filteredSemesterGrades = semester.all_grades.filter(
          (grade) =>
            (gradeFilter === 'passed' && grade.Grade >= 5) ||
            (gradeFilter === 'failed' && grade.Grade < 5) ||
            gradeFilter === 'all'
        );


        const anyFilterSelected = filter.some((isChecked) => isChecked);
        const isFailedFilterSelected = gradeFilter === 'failed';
        
        if ((!anyFilterSelected || (anyFilterSelected && filter.some((isChecked, index) => isChecked && semesterData[index].Semester === semester.Semester))) && filteredSemesterGrades.length > 0) {
          return (
            <div key={semester.Semester}>
              <ListItem sx={textStyle}>
              {filteredGrades.length > 0 ? (
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        ...textStyle,
                        fontWeight: 'bold',
                        backgroundColor: 'slateblue',
                        lineHeight: '2',
                        

                        boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.05)',
                        padding: '8px',
                        borderRadius: '10px',
                        color: 'white',
                      }}
                    >
                      {`Εξάμηνο: ${semester.Semester}`}
                    </Typography>
                  }
                />
              ) :(<p> Δεν υπάρχουν διαθέσιμα στοιχεία</p>)}
              </ListItem>

              <ListItem sx={textStyle}>
                <ListItemText
              
                  primary={
                    <div>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {`Μέσος Όρος περασμένων μαθημάτων: ${
                        semester.average_passed_grade !== 0 ? semester.average_passed_grade : '-'
                      }`}
                    </Typography>
                    <Box sx={{ borderBottom: '1px solid #ccc' }} />
                     </div>
                  }
                />
              </ListItem>

              {filteredSemesterGrades.map((grade) => (
                <ListItem
                  style={{
                    ...textStyle,
                    color: grade.Grade >= 5 ? '339F00 green' : 'DE5151 red',
                    fontWeight: 'bold',
                  }}
                  key={grade.Class_ID}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          ...textStyle,
                          fontWeight: 'bold',
                          color: grade.Grade >= 5 ? 'green' : 'red',
                          marginLeft: '10px',
                        }}
                      >
                        {` ${grade.Class_ID} ${grade.Name} (${grade.Sem}ο Εξάμηνο) : ${grade.Grade}`}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </div>
          );
        }
        
      })
     
      }
          </>
      )
    :
    (
        <p> Δεν υπάρχουν διαθέσιμα στοιχεία </p>
    )

}{(!hasFailedGrades && gradeFilter === 'failed' &&(

          <ListItem sx={textStyle}>
            <ListItemText
              primary={

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'slateblue',
                    lineHeight: '2',
                    boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.05)',
                    padding: '8px',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                >
                  
                    Δεν υπάρχουν διαθέσιμες βαθμολογίες με βαθμό μικρότερο από 5 με αυτά τα κριτήρια
                </Typography>
              }
            />
          </ListItem>
))}
{(!hasPassedGrades && gradeFilter === 'passed' &&(

<ListItem sx={textStyle}>
  <ListItemText
    primary={

      <Typography
        variant="body1"
        sx={{
          fontWeight: 'bold',
          backgroundColor: 'slateblue',
          lineHeight: '2',
          boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.05)',
          padding: '8px',
          borderRadius: '10px',
          color: 'white',
        }}
      >
        
          Δεν υπάρχουν διαθέσιμες βαθμολογίες με βαθμό μεγαλύτερο από 5 με αυτά τα κριτήρια
      </Typography>
    }
  />
</ListItem>
))}
    </List>
            </Paper>
          </div>
         
        </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default FullGrade;
  