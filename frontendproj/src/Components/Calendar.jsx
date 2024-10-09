import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';
import { DatePicker, MuiPickersUtilsProvider } from '@mui/lab';
import { ThemeProvider, createTheme } from '@mui/system';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import "./calendar.css";
import { el } from 'date-fns/locale';

const materialTheme = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#8bc34a" },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "#1b5e20",
      },
    },
  },
});

function Calendar() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const today = new Date();
  const sunnyDays = [1, 6, 10, 24, 15];

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
    const isSunny = sunnyDays.includes(day.getDate());
    const isSelected = day.getDate() === selectedDate.getDate();
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

    let dateTile;
    if (isInCurrentMonth) {
      if (isSunny) {
        dateTile = (
          <Paper sx={{ ...(isSelected ? styles.selectedDayPaper : isToday ? styles.todayPaper : styles.eventDay) }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
              <span style={{ fontSize: "12px", marginTop: "20%" }}> {day.getDate()} </span>
            </Grid>
          </Paper>
        );
      } else {
        dateTile = (
          <Paper sx={{ ...(isSelected ? styles.selectedDayPaper : isToday ? styles.todayPaper : styles.normalDayPaper) }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ bottom: "0", height: '100%' }}>
              <span style={{ marginTop: "20%" }}> {day.getDate()} </span>
            </Grid>
          </Paper>
        );
      }
    } else {
      dateTile = (
        <Paper sx={{ ...styles.notInThisMonthDayPaper }}>
          <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', color: 'lightGrey' }}>
            {day.getDate()}
          </Grid>
        </Paper>
      );
    }

    return dateTile;
  }

  return (
    <div>
      <LocalizationProvider adapterLocale={el} dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={materialTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              variant="static"
              renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

const styles = {
  notInThisMonthDayPaper: {
    width: "32px",
    height: "30px",
    backgroundColor: "#eeeeee",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
  },
  normalDayPaper: {
    width: "32px",
    height: "30px",
    backgroundColor: "orange",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
  },
  eventDay: {
    width: "32px",
    height: "30px",
    backgroundColor: "blue",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
  },
  selectedDayPaper: {
    width: "30px",
    height: "30px",
    backgroundColor: "#f9fbe7",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "lime",
    padding: "1px",
    cursor: "pointer",
  },
  todayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "lightGreen",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 0,
    padding: "1px",
    cursor: "pointer",
    color: "white",
  },
};

export default Calendar;
