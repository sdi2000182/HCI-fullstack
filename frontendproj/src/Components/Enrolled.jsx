import React, { useEffect, useState } from 'react';
import './footer1.css';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Axios from 'axios';
import { Typography, Box } from '@mui/material';
import FilterComponent2 from './filter2';
import excellogo from "./excel.png";
import { saveAs } from 'file-saver';
import {Button} from '@mui/material'

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

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "17px",
  display: "flex",
  marginLeft: "0px",
};


const Enrolled = () => {
    const [semesterData, setSemesterData] = useState(null);
    const [filters, setFilters] = useState(null);
    const [checkedFilterNames, setCheckedFilterNames] = useState([]);
  
    const fetchAveragePerSemester = async () => {
      try {
        const response = await Axios.post('http://127.0.0.1:5000/all_enrolled', { Student_ID: 1115 });
        console.log('11Response:', response.data);
        if(response.data){
        if (Array.isArray(response.data) && response.data.length === 0) {
            // If response.data is an empty array
            return setSemesterData(null);}
        else{
            setSemesterData(response.data.semesters);
            setFilters(response.data.semesters.map(() => false));
            console.log("oook")}
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleFilterChange = (newFilter) => {
        setFilters(newFilter);

        const names = semesterData
          .filter((semester, index) => newFilter[index])
          .map((checkedSemester) => checkedSemester.Semester);
    
        setCheckedFilterNames(names);
        console.log("Checked Filter Names:", names);
     
      };
    useEffect(() => {
      fetchAveragePerSemester();
    }, []);
    
    const clickExportExcel = async (semesterData, filter,checkedFilterNames) => {
        try {
  
          const response = await Axios.post(`http://127.0.0.1:5000/enrolled_excel/1115`, {
                semesterFilter: checkedFilterNames
          }, {
            responseType: 'blob', 
          });
      
     
          saveAs(response.data, 'Δηλώσεις.xlsx');
      
        } catch (error) {
          console.error('Error triggering file export:', error);
        }
      };
    
    return (
      <div>
        <div className="footerholder"></div>
        <div className="navbarholder"></div>
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
              Ιστορικό δηλώσεων
            </h1>
            <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw", alignSelf: 'flex-start' }} />
          
            {semesterData!=null && (
                  <div style={{ display:"flex", firection:"row",marginLeft:"20px"}}>
            <FilterComponent2 filter={filters} setFilter={handleFilterChange} semesters={semesterData} />
           
            <Button style={{ ...buttoninBoxStyles, marginLeft: "40px", marginTop:"20px" }} onClick={() => clickExportExcel(semesterData,filters,checkedFilterNames)}>
              Εξαγωγή σε Excel <img src={excellogo} style={{ filter: 'invert(100%)', height: "24px", width: "30px", marginLeft: "10px" }} />
            </Button>
            </div>
            )}

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
              {semesterData ? (
                  <>
              {semesterData.map((semester, index) => {
                const filteredSemesterGrades = semester.all_grades.filter(
                  () =>
                    (filters.some((isChecked) => isChecked) && filters[index]) ||
                    (!filters.some((isChecked) => isChecked))
                );

                if (filteredSemesterGrades.length > 0) {
                  return (
                    <div key={semester.Semester}>
                      <ListItem sx={textStyle}>
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
                      </ListItem>


                      {filteredSemesterGrades.map((grade) => (
                        <ListItem
                          style={{
                            ...textStyle,
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
                                  marginLeft: '10px',
                                }}
                              >
                                {` ${grade.Class_ID} ${grade.Name} (${grade.Sem}ο Εξάμηνο)`}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </div>
                  );
                }

                return null;
              })}
              </>
              ):(
                <ListItem>
                  <p> Δεν υπάρχουν διαθέσιμες δηλώσεις </p>
                </ListItem>
              )
              
          }
            </List>
            </Paper>
          </div>
        </div>
      </div>
    );
  };
  
  export default Enrolled;
  