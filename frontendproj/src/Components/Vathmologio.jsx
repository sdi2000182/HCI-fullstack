import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { elGR, DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const primary = {
  main: '#6A5ACD',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const theme = createTheme({
  palette: {
    primary: primary,
  },
}, elGR);

const CustomizedDataGrid = forwardRef(({ classID, reloadComponent }, ref) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState([]);
  const [modifiedRows, setModifiedRows] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false); 

  useEffect(() => {
    axios.post('http://127.0.0.1:5000/get_enrolled_students', {
      Class_ID: classID,
      Semester: 'Χειμερινό Εξάμηνο 2023',
    })
      .then(response => {
        const rowsWithId = response.data.tutor.map(row => ({
          ...row,
          id: row.ID,
          firstName: row.FirstName,
          lastName: row['Last Name'],
          username: row['Username'],
          grade: row['Grade'],
        }));
        setRows(rowsWithId);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [classID, reloadComponent]);


  const handleUploadClick = (additionalValue) => {
    const dataToSave = {
      tutor: modifiedRows.map(row => ({
        ID: row.ID,
        Grade: row.Grade, 
      })),
    };
  

    axios.post(`http://127.0.0.1:5000/upload_grades_regular/${classID}/${additionalValue}`, dataToSave)
      .then(response => {
        setModifiedRows([]);
        setUnsavedChanges(false);
      })
      .catch(error => {
        console.error('Error saving grades:', error.response.data.error);
      });
  };

  useImperativeHandle(ref, () => ({
    handleUploadClick,
    unsavedChanges,
  }));

  
  const handleProcessRowUpdate = (params) => {
    const { id, grade, Grade } = params;

    if (Grade !== grade) {
      setUnsavedChanges(true);
    }

    setModifiedRows((prevModifiedRows) => [
      ...prevModifiedRows.filter((row) => row.ID !== id), // Remove existing entry for the same ID
      { ID: id, Grade: grade }, // Add the new entry
    ]);
    
  };

  
  const columns = [
    { field: 'id', headerName: 'Αριθμός Μητρώου', flex: 1 },
    { field: 'firstName', headerName: 'Όνομα', flex: 1 },
    { field: 'lastName', headerName: 'Επώνυμο', flex: 1 },
    {
        field: 'grade',
        headerName: 'Βαθμός',
        flex: 1,
        editable: true,
        type: 'number',
        align: 'left',
        headerAlign: 'left',
        valueParser: (value) => {
            const parsedValue = parseInt(value);
            if (isNaN(parsedValue)) return 0;
            return Math.min(Math.max(parsedValue, 0), 10);
        },
        valueFormatter: (params) => {
            return params.value
        },
    },
];
  
  return (
    <div style={{ height: 400, width: '660px', background: '#FFFFFF' }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={rows}
          columns={columns}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
          isCellEditable={(params) => params.row.Grade}  // Assuming there's an 'editable' field in your row data
          processRowUpdate={handleProcessRowUpdate}
        />
      </ThemeProvider>
    </div>
  );
});

export default CustomizedDataGrid;
