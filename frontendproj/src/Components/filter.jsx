import React, { useState } from 'react';
import Card from '@mui/material/Card';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

const FilterComponent = ({ filter, setFilter,Semesters,filterOptions  }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const updateFilter = (index, value) => {
    const newFilter = [...filter];
    newFilter[index] = value;
    setFilter(newFilter);
  };
  if(!filterOptions){
  filterOptions = [
    'Εξάμηνο 1',
    'Εξάμηνο 2',
    'Εξάμηνο 3',
    'Εξάμηνο 4',
    'Εξάμηνο 5',
    'Εξάμηνο 6',
    'Εξάμηνο 7',
    'Εξάμηνο 8',
    'Ελεύθερα',
    'Χειμερινά Εξάμηνα',
    'Εαρινά Εξάμηνα',
  ];
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false); 
  };

  const handleCheckboxChange = (index) => {
    return (event) => {
      updateFilter(index, event.target.checked);
    };
  };

  const id = open ? 'filter-popover' : undefined;
  const filterCardStyle = {
    width: '110px',
    height: '40px',
    marginTop: '20px',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: open || filter.some((checked) => checked) ? 'slateblue' : 'white',
  };
  const filterIconStyle = {
    marginLeft: '10px',
    marginRight: '5px',
    color: open || filter.some((checked) => checked) ? 'white' : 'inherit',
  };

  const filterLabelStyle = {
    color: open || filter.some((checked) => checked) ? 'white' : 'black',
    fontFamily: 'Roboto',
  };
  return (
    <div>
      <Card
        sx={{
          width: '110px',
          height: '40px',
          marginTop: '20px',
          marginLeft: '45%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: open || filter.some((checked) => checked) ? 'slateblue' : 'white',
        }}
        onClick={handleClick}
      >
        <FilterAltIcon sx={{ marginLeft: '10px', marginRight: '5px',color: open || filter.some((checked) => checked) ? 'white' : 'inherit', }} />
        <p style={{ color: open || filter.some((checked) => checked) ? 'white' : 'inherit' , fontFamily: 'Roboto' }}>Φίλτρα</p>
      </Card>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          {filterOptions.map((option, index) => (
            <div key={option}>
              <input
                type="checkbox"
                onChange={handleCheckboxChange(index)}
                checked={filter[index]}
              />
              <label style={{ fontWeight: 'bold' }}>{option}</label>
            </div>
          ))}
        </Box>
      </Popover>
    </div>
  );
};

export default FilterComponent;