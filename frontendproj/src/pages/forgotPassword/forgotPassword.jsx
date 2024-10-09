import React, { Fragment, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrimarySearchAppBar from "../../Components/navbarOG";
import Footer from "../../Components/footer";
import "./forgotPassword.css";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { VerticalShadesClosedTwoTone } from '@mui/icons-material';

const centerLabelStyle1 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-3px 10px 0",
};

const centerLabelStyle2 = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-10px 20px 0",
};

const inputTextStyle1 = {
    margin: "10px 15px 0",
};

const FP = () => {
    const navigate = useNavigate();
    const [showSecondBox, setShowSecondBox] = useState(false); // State to manage visibility of second white box
    const [showAlternateBox, setShowAlternateBox] = useState(false); // State to manage visibility of alternate box
    const [secureCode, setSecureCode] = useState(''); // State to store secure code input
    const [newPassword1, setNewPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Code, setCode] = useState('');
    const [confirmPassword1, setConfirmPassword] = useState('');
    const [alert1,setalert1] = useState(false);
    const [alert2,setalert2] = useState(false);
    const [alert3,setalert3] = useState(false);
    const [alert4,setalert4] = useState(false);
    const [alert5,setalert5] = useState(false);
    const [flag,setFlag] = useState(false);
    const [countdown, setCountdown] = useState(-1);
    const [ok,setOk] = useState(5)
    const [showSBox, setShowSBox] = useState(false);
    const [showFirstBox, setShowFirstBox] = useState(true);
    // Make sure to import Axios if you haven't already

    useEffect(() => {
        const timer = setTimeout(() => {
          if (countdown > 0) {
            setCountdown(countdown - 1);
          } else if(countdown==0){
            navigate('/');
          }
        }, 1000);
    
        return () => clearTimeout(timer);
      }, [countdown]);

    const handleContinueClick = async (emailData) => {
        
        // Email validation regex
        
    
        // if (!emailRegex.test(emailData) || !emailData.includes('@') || !emailData.endsWith('uoa.gr')) {
        //     setalert5(true);
        //     return; // Don't proceed if email data is invalid
        // }
   
        try {
            let response = await axios.post('http://127.0.0.1:5000/find_email',{
                emailData: emailData,
            });
            setFlag(false);
            if (response.data.flag) {
                setFlag(response.data.flag);
                
                if (response.data.flag==1) {
                    setEmail(emailData)
                    setShowFirstBox(false)
                    setShowSecondBox(true);
                    
                }
                else{
                    setShowSecondBox(false);
                }
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
            // Handle error if necessary
        }
    };
    const handleContinue2Click = () => {
        var flag = false;
        setalert3(false);
        setalert4(false);
        if(Code.length!=6){  
            setalert3(true);
            setShowSecondBox(true);
            return;
        }
        if(Code!=123456){ 
            setalert4(true);
            setShowSecondBox(true);
            return;
        }
        else {
                setShowSecondBox(false);
                setShowFirstBox(false);
                setShowAlternateBox(true);
        }
    };
    const handleChangeClick = async () => {
        setalert1(false);
        setOk(5);
        if (newPassword1.length < 8 || confirmPassword1.length < 8) {
            setalert1(true);
            return;
        }
        if (newPassword1 !== confirmPassword1) {
            setalert2(true);
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:5000/find_password', {
                emailData: Email, 
                password: newPassword1
            });
    
            if (response.data.ok === 1) {
                setShowAlternateBox(false);
                setShowSBox(true);
                setOk(1);
                setCountdown(5);
            } else {
                setOk(0);
            }
        } catch (error) {
            console.error('Error while making POST request:', error);
        }
    };
    return (
        <div className="container2">
            <PrimarySearchAppBar />
            <div className="grey-box2">
           
                {showSecondBox ? (
                    <div className="white-box2">
                        <h2 style={{ marginLeft: '5%', textAlign: 'left' }}>Εισάγετε τον κωδικό ασφαλείας</h2>
                        <Divider />
                        <p style={{ marginLeft: '5%', textAlign: 'left' }}>Συμπληρώστε τον 6ψήφιο κωδικό που στάλθηκε στο email σας.</p>
                        {alert3 && <Alert severity="error"> Ο κωδικός είναι 6 ψηφία</Alert>}
                        {!alert3 && alert4 && <Alert severity="error"> Ο κωδικός είναι λάθος</Alert>}
                        <TextField
                            id="secure-code"
                            label={<div style={{centerLabelStyle1,width:'10ch',marginTop:'0%',marginLeft:'2%'}}>Κωδικός</div>}
                            variant="standard"
                            value={secureCode}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (/^\d{0,6}$/.test(input)) { // Limit to 6 digits
                                    setSecureCode(input);
                                }
                                setCode(input)
                            }}
                            className="group-67 elevation1 rectangle-71"
                            style={{ width: '70%', marginLeft: '-20%', marginTop: '2%' }} 
                            InputProps={{
                                disableUnderline: true,
                                style: { ...inputTextStyle1},
                            }}
                            inputProps={{
                                maxLength: 6, 
                                inputMode: 'numeric', 
                            }}
                        />
                        <div style={{ marginTop:'5%',display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button variant="contained" style={{ backgroundColor: '#F2F2F2', color: 'black', marginRight: '1rem' }} onClick={() => navigate('/')}>
                                ΑΚΥΡΩΣΗ
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: '#6a5acd',marginRight:'2%' }} onClick={handleContinue2Click}>
                                ΣΥΝΕΧΕΙΑ
                            </Button>
                        </div>
                    </div>
                ) : showAlternateBox ? (
                    <div className="white-box3">
                        <React.Fragment>
                        <h2 style={{ marginLeft: '5%', textAlign: 'left' }}>Αλλαγή κωδικού</h2>
                        <Divider />
                        <div>

    {!alert1 && <div style={{ height: 40 }} />}

    {alert1 && <Alert severity="error">Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες</Alert>}
    {!alert1 &&  !alert2 && ok==0 && <Alert severity="error"> Δεν μπορείτε να αλλάξετε τον κωδικό σας στον τρέχοντα κωδικό</Alert>}
    {!alert2 &&  <div style={{ height: 40 }} />}

    {alert2 && <Alert severity="error"> Οι κωδικοί σας διαφέρουν</Alert>}
</div>

                        <Box sx={{ display: "flex", width: "100%" }}>
                        <TextField
    type="password"
    name="new_password1"
    label={<div style={centerLabelStyle1}>Νέος κωδικός</div>}
    variant="standard"
    className="group-67 elevation rectangle-7"
    style={{
        width: '70%',
        marginLeft: '7%',
        marginTop: alert1 || alert2 ? '1%' : '-7%' 
    }}
    value={newPassword1}
    onChange={(e) => setNewPassword(e.target.value)}
    InputProps={{
        disableUnderline: true,
        style: { ...inputTextStyle1 },
    }}
/>

                        </Box>
                        <Box sx={{ display: "flex", width: "100%" }}>
                            <TextField
                                
                                type="password"
                                name="confirm_password"
                                label={<div style={centerLabelStyle1}>Επιβεβαίωση νέου κωδικού</div>}
                                variant="standard"
                                className="group-67 elevation rectangle-7"
                                style={{ width: '70%', marginLeft: '7%' ,marginTop:'2%' }}
                                value={confirmPassword1}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { ...inputTextStyle1 },
                                }}
                            />
                        </Box>
                        <Button variant="contained" style={{ backgroundColor: '#F2F2F2', color: 'black', marginLeft: '40%', marginTop: '8%', marginBottom: '1%', right: '0' }} onClick={() => navigate('/')}>
                            ΑΚΥΡΩΣΗ
                        </Button>
                        <Button variant="contained"  style={{ backgroundColor:"#6a5acd",marginLeft: '3%',marginRight: '1%', marginTop: '7%', marginBottom: '1%' }} onClick={() => handleChangeClick(Email)}>
                            ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ
                        </Button>
                        </React.Fragment>
                    </div>
                ) : showFirstBox ? (
                    <div className="white-box4" >
                        <div>
                            <h2 style={{ marginLeft: '5%', textAlign: 'left' }}>Βρείτε τον λογαριασμό σας</h2>
                            <Divider />
                            <p style={{ marginLeft: '5%', textAlign: 'left' }}>Συμπληρώστε το ακαδημαϊκό email στο οποίο θα στείλουμε έναν κωδικό ασφαλέιας.</p>
                        </div>
                        {flag==300 && <Alert severity="error">Παρακαλώ καταχωρήστε το ακαδημαϊκό σας email</Alert>}
                        {flag==500 && <Alert severity="error">Το email που καταχωρήσατε δεν βρέθηκε</Alert>}
                        <Box sx={{ display: "flex", width: "100%" }}>
                            <TextField
                               
                                label={<div style={centerLabelStyle1}>Email</div>}
                                variant="standard"
                                className="group-67 elevation rectangle-7"
                                style={{ width: '70%', marginLeft: '10%' ,marginTop:'2%' }}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    style: { ...inputTextStyle1 },
                                    
                                }}
                            />
                        </Box>
                        <Button variant="contained" style={{ backgroundColor: '#F2F2F2', color: 'black', marginLeft: '50%', marginTop: '7%', marginBottom: '1%', right: '0' }} onClick={() => navigate('/')}>
                            ΑΚΥΡΩΣΗ
                        </Button>
                        <Button variant="contained"  style={{ backgroundColor:"#6a5acd",marginLeft: '3%', marginTop: '7%', marginBottom: '1%' }} onClick={() => handleContinueClick(Email)}
>
                            ΣΥΝΕΧΕΙΑ
                        </Button>
                    </div>
                ) :
                (
                    <div className="white-box2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Alert severity="success">
        Ο κωδικός άλλαξε επιτυχώς. Ανακατεύθυνση σε αρχική σελίδα σε 
        <Typography variant="inherit">{countdown}</Typography>
    </Alert>
</div>

                )}
            </div>
            <Footer />
        </div>
    );
};

export default FP;