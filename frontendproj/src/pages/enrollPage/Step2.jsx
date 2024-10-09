import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";




const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "17px",
  display: "flex",
  marginLeft: "0px",
};

const Step2 = ({ id}) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  console.log("this is id",id)
  useEffect(() => {

    const storedValue = localStorage.getItem(`${id}`);

    const checkedItems = JSON.parse(storedValue);
    const fetchClasses = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/get_these_classes', {
          class_ids : Object.keys(checkedItems).filter(key => checkedItems[key]),
        });
        console.log(response.data);
        setSelectedClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  },[] );

  function VerticalSpacer({ height }) {
    const spacerStyle = {
      height: height || "900px", 
      display: "block",
    };}

  return (

   
    <Paper
    className="elevation fix-card"
    sx={{
      marginLeft: '40px',
      width: '80%',
      marginTop: '20px',
      overflowY: 'auto',
      height: '40%',
      borderRadius: '10px',
      scrollbarColor: 'slateblue lightgray',
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
                                
                                Δήλωση Εαρινού Εξαμήνου 2024
                              </Typography>
                            }
                          />
                        </ListItem>
    {selectedClasses.map((clas) => (
      <div key={clas.Class_ID}>
        
                        <ListItem
                            style={{
                              ...textStyle,
                              fontWeight: 'bold',
                            }}
                            key={clas.Class_ID}
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
                                  {clas.Name} {`(${clas.Semester}ο Εξάμηνο)`}
                                </Typography>
                              }
                            />
                          </ListItem>
      </div>
    ))}
    </List>
   
  </Paper>
  );
};



export default Step2;