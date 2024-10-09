import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./footer1.css";
import { useEffect, useRef } from "react";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import LoggedNavbar from "../../Components/navbarLOGGED";
import CustomButtonGroup from "../../Components/menubar";
import Footer from "../../Components/footer";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const cardStyles = {
  width: 883,
  height: 64,
  marginLeft: 5,
  marginTop: 3,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  zIndex: 9,
};

const arrowStyle = {
  width: "40.55px",
  height: "40.87px",
  position: "absolute",
  left: "30px",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: "bold",
  fontSize: "20px",
  display: "flex",
  marginLeft: "50px",
};

const descriptionCardStyles = {
  width: 820,
  marginLeft: 10,
  padding: "10px",
  zIndex: 8,
};

const semesterNames = [
  "Δήλωση Μαθημάτων",
  "Επεξεργασία Προφίλ",
  "Έκδοση Πιστοποιητικών",
  "Βαθμολογίες Μαθημάτων",
  "Ιστορικό Δηλώσεων Μαθημάτων",
  "Αλλαγή κωδικού πρόσβασης",
  "Ξέχασα τον κωδικό μου",
];

const descriptions = [
  <div>
    Σε περίπτωση που επιθυμείτε να υποβάλλετε νέα δήλωση μαθημάτων, μπορείτε να
    ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href={`/enrollement`} style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Δήλωση Μαθημάτων</span>
        </a>
        . Εφόσον η περίοδος δηλώσεων έχει ξεκινήσει, μπορείτε να αναζητήσετε και
        να επιλέξετε τα μαθήματα που επιθυμείτε να δηλώσετε και αντιστοιχούν
        στην τρέχουσα περίοδο.
      </li>
      <li>
        Πατήστε Οριστικοποίηση Δήλωσης ή Προσωρινή αποθήκευση, προκειμένου να
        αποθηκευτούν οι επιλογές σας.
      </li>
      <li>
        Αν η περίοδος δηλώσεων λήξει, και δεν έχετε ακόμα υποβάλλει οριστικά την
        δήλωσή σας, θα αποθηκευτεί η τελευταία δήλωση που βρίκεται σε κατάσταση
        προσωρινής αποθήκευσης.
      </li>
    </ol>
  </div>,
  <div>
    Σε περίπτωση που επιθυμείτε να τροποποιήσετε τα Στοιχεία Προφίλ σας,
    μπορείτε να ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/edit-profile' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Επεξεργασία Προφίλ</span>
        </a>
        . Αφού πατήσετε το κουμπί επεξεργασίας, μπορείτε να τροποποιήσετε τα
        στοιχεία που επιθυμείτε να αλλάξετε.
      </li>
      <li>
        Πατήστε Αποθήκευση Αλλαγών προκειμένου να αποθηκευτούν τα νέα σας
        στοιχεία.
      </li>
      <li>
        Αν η ανανέωση δε ολοκληρωθεί επιτυχώς, επαναλάβετε την διαδικασία αλλιώς
        επικοινωνήστε μαζί μας.
      </li>
    </ol>
  </div>,
  <div>
    Σε περίπτωση που επιθυμείτε να αιτηθείτε για ένα Πιστοποιητικό, μπορείτε να
    ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/certificates' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Πιστοποιητικά </span>
        </a>
        Επιλέξετε το είδος Πιστοποιητικού που θέλετε να αιτηθείτε και τον αριθμό
        αντιτύπων που χρειάζεστε.
      </li>
      <li>
        Στη σελίδα που θα οδηγηθείτε, υπάρχουν προσυμπληρωμένα τα στοιχεία σας.
        Ελέγξτε ότι είναι όλα σωστά, και τροποποείστε σε περίπτωση που δεν
        είναι.
      </li>
      <li>Πατήστε υποβολή προκειμένου να σταλθεί το αίτημά σας.</li>
    </ol>
    Σε περίπτωση που επιθυμείτε να παρακολουθήσετε την κατάσταση ενός
    Πιστοποιητικού, πατήστε στον σύνδεσμο που ακολουθεί{" "}
    <a href='/certificates/download' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Πιστοποιητικά </span>
        </a> και
    επιλέξτε "Τα πιστοποιητικά μου".
  </div>,
  <div>
    Προκειμένου να παρακολουθήσετε τις Βαθμολογίες σας στα μαθήματά σας,
    μπορείτε να ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/grades' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Αναλυτική Βαθμολογία </span>
        </a>
        .
      </li>
      <li>
        Επιλέξτε να βλέπετε Όλες τις προσπάθειες ή μόνο τις Επιτυχημένες/Μη
        Επιτυχημένες σε Όλα ή συγκεκριμένο Εξάμηνο, καθώς και τον μέσο όρο σας.
      </li>
    </ol>
  </div>,
  <div>
    Προκειμένου να παρακολουθήσετε τις Δηλώσεις σας προηγουμένων εξαμήνων,
    πατήστε στον σύνδεσμο που ακολουθεί{" "}
    <a href='/history' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Ιστορικό Δηλώσεων </span>
        </a>
  </div>,
  <div>
  Σε περίπτωση που επιθυμείτε να αλλάξετε τον κωδικό πρόσβασης μπορείτε να
  ακολουθήστε τα παρακάτω βήματα:
  <ol style={{ paddingLeft: "20px" }}>
    <li>
      Πατήστε στον σύνδεσμο που ακολουθεί{" "}
      <a href='/change-password' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Αλλαγή Κωδικού </span>
        </a>
      . Θα σας ζητηθεί να συμπληρώσετε τον τρέχον κωδικό πρόσβασης και στη συνέχεια μπορείτε να επιλέξετε τον καινούριο που επιθυμείτε.
    </li>
    <li>
      Διαλέξτε έναν κωδικό που δεν έχετε ξανα χρησιμοποιήσει για οποιοδήποτε
      πρόβλημα μπορείτε να επικοινωνήσετε μαζί μας.
    </li>
  </ol>
</div>,
  <div>
  Σε περίπτωση απώλειας του κωδικού πρόσβασης μπορείτε να ακολουθήστε τα
  παρακάτω βήματα:
  <ol style={{ paddingLeft: "20px" }}>
    <li>
      Πατήστε στον σύνδεσμο που ακολουθεί{" "}
      <a href='/forgot-password' style={{textDecoration:"none"}}>
      <span style={{ color: "blue", cursor: "pointer" }}>Αλλαγή Κωδικού</span>
      </a>
      . Θα σας ζητηθεί να συμπληρώσετε το username σας και ένας σύνδεσμος για
      αλλαγή password θα σταλθεί στο ακαδημαϊκό σας email.
    </li>
    <li>
      Αν δεν σας σταλθεί email: Ελέγξτε το Spam ή Trash φάκελο στο email σας.
      Αν ακόμα δεν το βρίσκετε επαναλάβετε την διαδικασία αλλιώς επικοινωνήστε
      μαζί μας.
    </li>
    <li>
      Αν δεν έχετε πρόσβαση στο ακαδημαϊκό email:{" "}
      <a href='https://eclass.uoa.gr/modules/auth/lostpass.php?localize=el' style={{textDecoration:"none"}}>
      <span style={{ color: "blue", cursor: "pointer" }}>Αλλαγή password webmail</span>
      </a>
      .
    </li>
    <li>
      Διαλέξτε έναν κωδικό που δεν έχετε ξανα χρησιμοποιήσει για οποιοδήποτε
      πρόβλημα μπορείτε να επικοινωνήσετε μαζί μας.
    </li>
  </ol>
</div>,
];

const StudentHelp = () => {
  const card8Ref = useRef(null);
  const [cardStates, setCardStates] = useState(Array(8).fill(false));
  const [expandedIndex, setExpandedIndex] = useState(null);
  const boxGreyRef = useRef(null);
  const [boxHeight, setBoxHeight] = useState("auto");
  const [offset, setOffset] = useState(null);

  const lastref = useRef(null);

  const checkCard8Position = () => {
    if (card8Ref.current && boxGreyRef.current) {
      const cardRect = card8Ref.current.getBoundingClientRect();
      const boxGreyRect = boxGreyRef.current.getBoundingClientRect();

      const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
      setBoxHeight(`${verticalDistance + 40}px`);
      setOffset(verticalDistance);
    }
  };

  const handleCardClick = (index) => {
    setCardStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
    checkCard8Position();
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));

    setCardStates((prevStates) =>
      prevStates.map((_, i) => (i === index ? !prevStates[index] : false))
    );
  };

  useEffect(() => {
    checkCard8Position();
    const getPosition = (reference, refname) => {
      if (reference && reference.current && boxGreyRef.current) {
        const cardRect = reference.current.getBoundingClientRect();
        const boxGreyRect = boxGreyRef.current.getBoundingClientRect();

        const verticalDistance = Math.abs(boxGreyRect.top - cardRect.bottom);
        return verticalDistance;
      } else {
        return 0;
      }
    };
    const positions = [
      getPosition(card8Ref, "card8"),
      getPosition(lastref, "book"),
    ];
    const maxPosition = Math.max(...positions);
    setBoxHeight(`${maxPosition + 30}px`);


    window.addEventListener("resize", checkCard8Position);
    return () => {
      window.removeEventListener("resize", checkCard8Position);
    };
  }, [
    expandedIndex,
  ]);

  return (
    <div>
      <LoggedNavbar/>
      <CustomButtonGroup activePage='ΒΟΗΘΕΙΑ'/>
      <div className="boxgrey" style={{ height: boxHeight, borderRadius:"25px", marginBottom:"30px"}} ref={boxGreyRef}>
      <div style={{ flexDirection: "column", display: "flex" }}>
          <h1 style={{
            fontFamily: "Fira Sans",
            fontSize: "40px",
            color: "#6A5ACD",
            marginTop: "40px",
            marginLeft: "-2%",  
            width: "18ch",
            marginBottom: "0%",
            alignSelf: 'flex-start',
            textShadow: "0px 4px 5.9px rgba(0, 0, 0, 0.25)",
          }}>
            Βοήθεια
          </h1>
          <Divider aria-hidden="true" style={{ marginTop: "0", marginLeft: "2%", marginBottom: "20px", width: "42vw" ,alignSelf: 'flex-start'}} />
        </div>
        <div className="elevation fix-card">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} style={{ marginBottom: "10px", zIndex: 9 }}>
              <Card
                sx={{
                  marginTop: index === 0 ? 3 : 1,
                  ...cardStyles,
                  cursor: "pointer",
                }}
                ref={index === 6 ? card8Ref : null}
                onClick={() => handleCardClick(index)}
              >
                {cardStates[index] || expandedIndex === index ? (
                  <ArrowDropDownIcon sx={{ ...arrowStyle }} />
                ) : (
                  <ArrowRightIcon sx={{ ...arrowStyle }} />
                )}
                <p style={{ ...textStyle }}>
                  {index <= 6 && semesterNames[index]}
                </p>
              </Card>
              {expandedIndex === index && (
                <Card
                  sx={{
                    ...descriptionCardStyles,
                    elevation: 3,
                    marginTop: "20px",
                  }}
                  ref={lastref}
                >
                  <p
                    style={{
                      marginTop: "10px",
                      whiteSpace: "pre-line",
                      textAlign: "left",
                    }}
                  >
                    {descriptions[index]}
                  </p>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default StudentHelp;
