import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./404.css";
import img404 from "./uoa.png";
import { jwtDecode } from 'jwt-decode';
import LoggedNavbar from '../../Components/navbarLOGGED';
import SimplifiedNavbar from '../../Components/navbarOG';

const Page404 = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <div>
        {token ? <LoggedNavbar /> : <SimplifiedNavbar />}
        <div className="page404-container">
            
            <div className="right-section" style={{marginTop:'1%', marginRight:"-400px"}}>
                <img src={img404} alt="404 Error" className="error-image" />
            </div>
            <div className="left-section">
                <Typography variant="h2" style={{ fontFamily: 'Fira Sans', textAlign: 'left' }}>
                    Κάτι πήγε λάθος...
                </Typography>
                <Typography variant="h4" style={{ fontFamily: 'Roboto', textAlign: 'left' }}>
                    Η σελίδα που ψάξατε δεν βρέθηκε. Μπορείτε να επιστρέψετε στην αρχική σελίδα.
                </Typography>
                <div style={{ textAlign: 'left', marginTop: '1rem' }}>
                    <Button variant="contained" style={{ backgroundColor: 'slateblue', color: 'white' }} onClick={() => navigate('/')}>
                        ΑΡΧΙΚΗ
                    </Button>
                </div>
            </div>
            
        </div>
        </div>
    );
}

export default Page404;