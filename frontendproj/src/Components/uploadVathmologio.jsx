import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';


const primary = {
  main: '#6A5ACD',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
};

const buttoninBoxStyles = {
  position: 'relative',
  background: '#6A5ACD',
  borderRadius: '5px',
  display: 'flex',
  color: '#FFFFFF',
  cursor: 'pointer',
  boxShadow: "0px 10px 14px rgba(0, 0, 0, 0.2)",
  height: "auto",
  width: "50px",
  marginTop: "2%",
  fontSize: "30px",
  alignItems: "center",
};

const UploadComponent = forwardRef(({ ...props }, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false); 

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
      setUnsavedChanges(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (file) => {
    // Handle file change logic here
    setSelectedFile(file);
    setUnsavedChanges(true);
  };
  const handleUploadClick = async (additionalValue) => {
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post(`http://127.0.0.1:5000/upload_grades/${props.classID}/${additionalValue}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });


      setUploadedFile(selectedFile);
      setUnsavedChanges(false);
      
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    handleUploadClick,
    unsavedChanges,
  }));

  

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        gap: '17px',
        width: '447px',
        height: '375px',
        background: isDragging ? '#EFEFEF' : '#FFFFFF',
        borderRadius: '4px',
        border: isDragging ? '2px dashed #6A5ACD' : 'none',
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        style={{
          width: '415px',
          height: '22px',
          fontFamily: 'Manrope',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '22px',
          color: '#191D23',
          flexGrow: '1',
        }}
      >
        Ανέβασμα Βαθμολογίου σε μορφή Excel
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          gap: '8px',
          width: '398px',
          height: '304px',
          background: '#FFFFFF',
          border: '1px dashed #D0D5DD',
          borderRadius: '4px',
          flexGrow: '1',
        }}
      >
        <CloudUploadIcon />
        Σύρετε ή κάντε κλικ για να ανεβάσετε το αρχείο
        <label
          style={buttoninBoxStyles}
        >
          &nbsp;&nbsp;+
          <input
            ref={fileInputRef}
            type="file"
            accept=".xls, .xlsx"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </label>
        {selectedFile && (
          <div>
            Επιλεγμένο αρχείο: {selectedFile.name}
          </div>
        )}
        {uploadedFile && (
          <div>
            Έχετε ανεβάσει το αρχείο: {uploadedFile.name}
          </div>
        )}
      </div>
      <div style={{}}></div>
    </div>
  );
});

export default UploadComponent;
