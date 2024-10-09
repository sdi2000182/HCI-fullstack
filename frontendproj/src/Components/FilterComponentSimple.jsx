import React, { useState } from 'react';
import Card from '@mui/material/Card';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

const FilterComponentSimple = ({ isWinter, filter, setfilter ,not ,checkedCount}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const winterFilterOptions = ['Εξάμηνο 1', 'Εξάμηνο 3', 'Εξάμηνο 5', 'Εξάμηνο 7'];
  const summerFilterOptions = ['Εξάμηνο 2', 'Εξάμηνο 4', 'Εξάμηνο 6', 'Εξάμηνο 8'];

  const filterOptions = isWinter ? winterFilterOptions : summerFilterOptions;
  if (not>0) {
    // Add the option "κομμενα μαθηματα" to both sets of filter options
    winterFilterOptions.push('Κομμενα μαθηματα');
    summerFilterOptions.push('Κομμενα μαθηματα');
  }
  
  const updateFilter = (index, value) => {
    const newFilter = [...filter];
    newFilter[index] = value;
    setfilter(newFilter);
  };

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

  return (
    <div>
      <Card
        sx={{
          width: '110px',
          height: '40px',
          marginTop: '20px',
          marginLeft: '15%',
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

export default FilterComponentSimple;