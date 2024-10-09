import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loginPage.css";
import PrimarySearchAppBar from "../../Components/navbarOG";
import Footer from "../../Components/footer";
import library from "../../Components/library.png";
import loginPageInfo from "../../Components/loginPageInfo.png";
import CustomButtonGroup from "../../Components/menubar";
import axios from 'axios';
import { Input } from '@mui/material';
import Alert from '@mui/material/Alert';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isUserLoggedIn = !!localStorage.getItem('token');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username: username,
        Password: password,
      });

      if (response.data.access_token) {
        const accessToken = response.data.access_token;
        localStorage.setItem('token', accessToken);
        window.location.reload();
      } else {
        const errorMessage = response.data.message || 'An error occurred';

        setError(errorMessage);
      }

    } catch (error) {
      console.error('Error during login:', error);

      const errorMessage = error.response?.data?.message || 'An error occurred';

      setError(errorMessage);
    }
  };


  return (
    <div className="loginPage">
      <PrimarySearchAppBar />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="container">
        <img src={library} alt="library" style={{ width: "100%", height: "30%" }} />
        <div style={{ position: 'absolute', top: '20%', left: '5%', width: '30%', textAlign: 'left', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '20px' }}>
            Καλωσήρθατε στη δικτυακή περιοχή των γραμματειών του Εθνικού και Καποδιστριακού Πανεπιστημίου Αθηνών
          </h1>
        </div>
        <div style={{position:'absolute' , top:"100px", left: '70%' , width:"39ch"}}>{error && <Alert severity="error">{error}</Alert>}</div>
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', top: '30%', left: '70%', width: '30%' }}>
          
          <input type="text" placeholder="Όνομα Χρήστη" className="usernameBox" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Κωδικός" className="passwordBox" onChange={(e) => setPassword(e.target.value)} />
          <button className="loginButton" onClick={handleLogin}>
            Σύνδεση
          </button>
          <a href="/forgot-password" className="forgotPassword">Ξεχάσατε τον κωδικό σας;</a>
        </div>
      </div>
      <div>
        <img src={loginPageInfo} alt="logo" style={{ width: "70%", height: "auto" }} />
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
