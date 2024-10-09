import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../../Components/footer1.css";
import { useEffect, useRef } from "react";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import LoggedNavbar from "../../Components/navbarLOGGED";
import TutorMenu from "../../Components/menututor";
import Footer from "../../Components/footer";


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
  "Bαθμολογία",
  "Επεξεργασία Προφίλ",
  "Αλλαγή Βαθμών",
  "Επεξεργασία Πληροφοριών Μαθήματος",
  "Ιστορικό βαθμολογιών",
  "Αλλαγή κωδικού πρόσβασης",
  "Ξέχασα τον κωδικό μου",
];

const descriptions = [
  <div>
    Σε περίπτωση που επιθυμείτε να προσθέσετε νέο Βαθμολόγιο, μπορείτε να
    ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/gradebook' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Βαθμολόγιο </span>
        </a>
        και επιλέξτε το μάθημα που σας ενδιαφέρει.
      </li>
      <li>
        Πατήστε την καρτέλα ανάλογη με το είδος Βαθμολογίου που επιθυμειτε να
        υποβάλλετε (Εξέτασης, Προόδου ή Εργασιών) και πατήστε το κουμπάκι plus.
      </li>
      <li>
        Αναζητήστε τον κάθε φοιτητή και συμπληρώστε την βαθμολογία του στο
        κουτάκι που του αντιστοιχεί ή εναλλακτικά ανεβάστε ένα excel με όλες τις
        βαθμολογίες των φοιτητών.
      </li>
      <li>
        Πατήστε Προσωρινή Αποθήκευση αν θέλετε μελλοντικά να επεξεργαστείτε εκ
        νέου το Βαθμολόγιο ή Υποβολή Βαθμολογίου αν έχετε ολοκληρώσει τη
        συμπλήρωση.
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
        <span style={{ color: "blue", cursor: "pointer" }}>
          Επεξεργασία Προφίλ
        </span>
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
    Σε περίπτωση που επιθυμείτε να τροποποιήσετε κάποιο μη αποθηκευμένο
    Βαθμολόγιο, μπορείτε να ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/gradebook' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Βαθμολόγιο </span>
        </a>
        και επιλέξτε το μάθημα που σας ενδιαφέρει.
      </li>
      <li>
        Πατήστε την καρτέλα ανάλογη με το είδος Βαθμολογίου που επιθυμείτε να
        υποβάλλετε (Εξέτασης, Προόδου ή Εργασιών) και πατήστε το κουμπί
        Επεξεργασίας.
      </li>
      <li>
        Αναζητήστε τον κάθε φοιτητή και συμπληρώστε την βαθμολογία του στο
        κουτάκι που του αντιστοιχεί ή εναλλακτικά ανεβάστε ένα excel με όλες τις
        βαθμολογίες των φοιτητών.
      </li>
      <li>
        Πατήστε Προσωρινή Αποθήκευση αν θέλετε μελλοντικά να επεξεργαστείτε εκ
        νέου το Βαθμολόγιο ή Υποβολή Βαθμολογίου αν έχετε ολοκληρώσει τη
        συμπλήρωση.
      </li>
    </ol>
    Αν έχετε ήδη υποβάλλει το Βαθμολόγιο, δεν μπορείτε να το επεξεργαστείτε αλλά
    μόνο να το παρακολουθήσετε.
  </div>,
  <div>
    Σε περίπτωση που επιθυμείτε να τροποποιήσετε τα Στοιχεία ενός Μαθήματός σας,
    μπορείτε να ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/classes' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Μαθήματα</span>.
        </a>
        Επιλέξτε το μάθημα που επιθυμείτε να επεξεργαστείτε, στην νέα καρτέλα
        πατήστε το κουμπί Επεργασίας και τροποποιήστε τα στοιχεία που
        επιθυμείτε.
      </li>
      <li>
        Πατήστε Αποθήκευση Αλλαγών προκειμένου να αποθηκευτούν τα νέα στοιχεία.
      </li>
      <li>
        Αν η ανανέωση δε ολοκληρωθεί επιτυχώς, επαναλάβετε την διαδικασία αλλιώς
        επικοινωνήστε μαζί μας.
      </li>
    </ol>
  </div>,
  <div>
    Σε περίπτωση που επιθυμείτε να παρακολουθήσετε παλιά Βαθμολόγια, μπορείτε να
    ακολουθήστε τα παρακάτω βήματα:
    <ol style={{ paddingLeft: "20px" }}>
      <li>
        Πατήστε στον σύνδεσμο που ακολουθεί{" "}
        <a href='/gradebook' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Βαθμολόγιο </span>
        </a>
        και επιλέξτε το μάθημα που σας ενδιαφέρει.
      </li>
      <li>Πατήστε την πρώτη καρτέλα "Παρακολούθηση Βαθμολογίων"</li>
      <li>
        Για διευκόλυνσή σας χρησιμοποιήστε τα φίλτρα προκειμένου να αναζητήσετε
        βαθμούς συγκεκριμένου εξαμήνου, συγκεκριμένου φοιτητή κλπ.
      </li>
    </ol>
  </div>,
  <div>
      Σε περίπτωση που επιθυμείτε να αλλάξετε τον κωδικό πρόσβασης μπορείτε να
      ακολουθήστε τα παρακάτω βήματα:
      <ol style={{ paddingLeft: "20px" }}>
        <li>
          Πατήστε στον σύνδεσμο που ακολουθεί{" "}
          <a href='/change-password' style={{textDecoration:"none"}}>
        <span style={{ color: "blue", cursor: "pointer" }}>Αλλαγή Κωδικού</span>
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


const TeacherHelp = () => {
  const card8Ref = useRef(null);
  const [cardStates, setCardStates] = useState(Array(8).fill(false));
  const [expandedIndex, setExpandedIndex] = useState(null);
  const boxGreyRef = useRef(null);
  const [boxHeight, setBoxHeight] = useState("calc(730px)");
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
      <LoggedNavbar />
      <TutorMenu activePage='ΒΟΗΘΕΙΑ'/>
      <div className="boxgrey" style={{ height: boxHeight }} ref={boxGreyRef}>
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

export default TeacherHelp;
