import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Avatar, Menu, MenuItem, Typography, IconButton, Tooltip } from "@mui/material";
import LanguageDropdown from "./languagedropdown.jsx";
import mystudieslogo from "./mystudieslogo.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import Divider from "@mui/material/Divider";
import ListItemIcon from '@mui/material/ListItemIcon';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate,Link } from 'react-router-dom';  
import SchoolIcon from '@mui/icons-material/School';

function LoggedNavbar() {
  const [userData, setUserData] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); 

  const isTutor = jwtDecode(localStorage.getItem('token')).sub.isTutor;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);

      axios.get('http://127.0.0.1:5000/user/get_one/', {  
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUserData(response.data.user);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePasswordClick = () =>{
    setAnchorEl(null);
    navigate('/change-password');
  }

  const handleAnalClick = () =>{
    setAnchorEl(null);
    navigate('/grades');
  }

  const handleCertClick = () =>{
    setAnchorEl(null);
    navigate('/certificates/download');
  }

  
  const handleEditClick = () =>{
    setAnchorEl(null);
    navigate('/edit-profile');
  }

  const handleLogoutClick = () => {
    navigate("/logout");
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "#282828", height: "70px" }}
    >
      <Toolbar sx={{ minHeight: "60px" }}>
        <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link to="/">
          <img
            src={mystudieslogo}
            alt="Logo"
            style={{
              maxWidth: "150px",
            }}
          />
          </Link>
        </div>
        <div></div>
        <div>
          <LanguageDropdown style={{ padding: "10px" }} />
        </div>
        <div>
            <IconButton
              onClick={handleAvatarClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={anchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl)}
            >
              <Avatar sx={{ backgroundColor:"#6A5ACD",width: 32, height: 32, cursor: 'pointer' }}>
                {userData && userData.First_Name && userData.First_Name.charAt(0)}
              </Avatar>
            </IconButton>
            
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

             {isTutor==0 && (
              <MenuItem onClick={handleAnalClick}>
              <SchoolIcon sx={{marginRight:"5%",color:"grey"}}/> Αναλυτική Βαθμολογία
              </MenuItem>
            )  
            }
            
            {isTutor==0 && (
              <MenuItem onClick={handleCertClick}>
              <ArticleIcon sx={{marginRight:"5%",color:"grey"}}/> Τα πιστοποιητικά μου
              </MenuItem>
            )  
            }

            
            {isTutor==0 && (
              <Divider />
            )  
            }
            
            <MenuItem onClick={handleEditClick}>
              <Avatar  sx={{marginRight:"6%", height:"20px", width:"20px"}}/> Επεξεργασία Στοιχείων
            </MenuItem>
            <MenuItem onClick={handlePasswordClick}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Αλλαγή κωδικού πρόσβασης
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Αποσύνδεση
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      
    </AppBar>
  );
}

export default LoggedNavbar;
