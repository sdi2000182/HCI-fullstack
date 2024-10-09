import React, { useState } from 'react';
import Card from '@mui/material/Card';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

const FilterComponent2 = ({ filter, setFilter, semesters }) => {
  console.log("this",semesters)
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const updateFilter = (index, value) => {
    const newFilter = [...filter];
    newFilter[index] = value;
    setFilter(newFilter);
  };

  const filterOptions = semesters.map((semester) => ({
    label: semester.Semester,
    value: semester.Semester,
  }));

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
        sx={filterCardStyle}
        onClick={handleClick}
      >
        <FilterAltIcon sx={filterIconStyle} />
        <p sx={filterLabelStyle}>
          <span style={{ color: open || filter.some((checked) => checked) ? 'white' : 'inherit' }}>
            Φίλτρα
          </span>
        </p>
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
        
          <div>
            {filterOptions.map((option, index) => (
              <div key={option.value}>
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange(index)}
                  checked={filter[index]}
                />
                <label style={{ fontWeight: 'bold' }}>{option.label}</label>
              </div>
            ))}
          </div>
        </Box>
      </Popover>
    </div>
  );
};

export default FilterComponent2;