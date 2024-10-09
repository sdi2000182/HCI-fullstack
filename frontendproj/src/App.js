import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import ChangePasswordPage from "./pages/changePassword/changePassword";
import StudentHomePage from "./pages/StudentHomePage";
import EditProfile from "./pages/EditProfile/EditProfile";
import LoggedNavbar from "./Components/navbarLOGGED";
import UploadGrades from "./pages/vathmologio/uploadGrades";
import ViewGrades from "./pages/vathmologio/viewGrades";
import ContactPage from "./pages/newContact.jsx";
import StudentHelp from "./pages/helpPage/StudentHelp.jsx";
import TeacherHelp from "./pages/helpPage/TeacherHelp.jsx";
import Certificate from "./pages/certificates/WriteCertificate.jsx";
import Bathmoi from "./pages/vathmologio/Bathmologio.jsx";
import CertificateMenu from "./pages/certificates/CertificateMenu.jsx";
import ClassesList from "./pages/ClassesList/ClassesList.jsx";
import SubjectInfo from "./pages/ClassesList/subjectinfo.jsx";
import Enrolled from "./pages/HistoryPage/Enrolled.jsx";
import CertificatesDownload from "./pages/certificates/CertificatesDownload.jsx";
import FullGrade from "./pages/FullGrades.jsx";
import ClassesTeacher from "./pages/ClassesListTutor/classesTeacher.jsx";
import TutorSubjectInfo from "./pages/ClassesListTutor/tutorsubj.jsx";
import TutorHomePage from "./pages/TutorHomePage.jsx";
import EditProfileTutor from "./pages/EditProfile/EditProfileTutor.jsx";
import FG from "./pages/forgotPassword/forgotPassword.jsx";
import RingChart from "./Components/RingChart.jsx";
import Page404 from "./pages/404/404.jsx";
import Class from "./pages/ClassesList/Class.jsx";
import { jwtDecode } from "jwt-decode";
import Logout from "./pages/logout.jsx";
import Stepper from "./pages/enrollPage/Stepper.jsx";
import EnrolClass from "./pages/enrollPage/EnrolClass.jsx";
import StudentInfo from "./pages/infoPages/studentInfo.jsx";
import TutorInfo from "./pages/infoPages/teacherInfo.jsx";

export default function App() {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const isTutor = decodedToken?.sub?.isTutor

  return (
    <Router>
      <div className="App">
        <Routes>
        {token && isTutor==1 ? (
            <Route path="/" element={<TutorHomePage />} />
          ) : token && isTutor==0 ? (
            <Route path="/" element={<StudentHomePage />} />
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}
          <Route path="/change-password" element={<ChangePasswordPage />} />
          {token && isTutor==1 ? (
            <Route path="/edit-profile" element={<EditProfileTutor />} />
          ) : token && isTutor==0 ? (
            <Route path="/edit-profile" element={<EditProfile />} />
          ) : (
            <Route path="/edit-profile" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/upload-grades/:classID" element={<UploadGrades />} />
          ) : token && isTutor==0 ? (
            <Route path="/upload-grades/:classID" element={<Page404/>} />
          ) : (
            <Route path="/upload-grades/:classID" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/view-grades/:classID" element={<ViewGrades/>} />
          ) : token && isTutor==0 ? (
            <Route path="/view-grades/:classID" element={<Page404/>} />
          ) : (
            <Route path="/view-grades/:classID" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/contact" element={<ContactPage/>} />
          ) : token && isTutor==0 ? (
            <Route path="/contact" element={<ContactPage/>} />
          ) : (
            <Route path="/contact" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/student-help" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/student-help" element={<StudentHelp/>} />
          ) : (
            <Route path="/student-help" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/tutor-help" element={<TeacherHelp/>} />
          ) : token && isTutor==0 ? (
            <Route path="/tutor-help" element={<Page404/>} />
          ) : (
            <Route path="/tutor-help" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/create-certificate/:type/:copies" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/create-certificate/:type/:copies" element={<Certificate/>} />
          ) : (
            <Route path="/create-certificate/:type/:copies" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/gradebook" element={<Bathmoi/>} />
          ) : token && isTutor==0 ? (
            <Route path="/gradebook" element={<Page404/>} />
          ) : (
            <Route path="/gradebook" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/certificates" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/certificates" element={<CertificateMenu/>} />
          ) : (
            <Route path="/certificates" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/courses" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/courses" element={<ClassesList/>} />
          ) : (
            <Route path="/courses" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/courses/:classID" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/courses/:classID" element={<SubjectInfo/>} />
          ) : (
            <Route path="/courses/:classID" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/history" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/history" element={<Enrolled/>} />
          ) : (
            <Route path="/history" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/certificates/download" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/certificates/download" element={<CertificatesDownload/>} />
          ) : (
            <Route path="/certificates/download" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/grades" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/grades" element={<FullGrade/>} />
          ) : (
            <Route path="/grades" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/classes" element={<ClassesTeacher/>} />
          ) : token && isTutor==0 ? (
            <Route path="/classes" element={<Page404/>} />
          ) : (
            <Route path="/classes" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/classes/:classId" element={<TutorSubjectInfo/>} />
          ) : token && isTutor==0 ? (
            <Route path="/classes/:classId" element={<Page404/>} />
          ) : (
            <Route path="/classes/:classId" element={<Page404/>} />
          )}
          {token && isTutor==1 ? (
            <Route path="/classes/:classId" element={<TutorSubjectInfo/>} />
          ) : token && isTutor==0 ? (
            <Route path="/classes/:classId" element={<Page404/>} />
          ) : (
            <Route path="/classes/:classId" element={<Page404/>} />
          )}
          <Route path="/forgot-password" element={<FG/>}/>
          {token && isTutor==1 ? (
            <Route path="/this_class/:Name/:Id" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/this_class/:Name/:Id" element={<Class/>} />
          ) : (
            <Route path="/this_class/:Name/:Id" element={<Page404/>} />
          )}
          <Route path="*" element={<Page404/>}/>
          <Route path="/logout" element={<Logout/>}/>
          {token && isTutor==1 ? (  
            <Route path="/this_class/:Name/:Id" element={<Page404/>} />
          ) : token && isTutor==0 ? (
            <Route path="/this_class/:Name/:Id" element={<Class/>} />
          ) : (
            <Route path="/this_class/:Name/:Id" element={<Page404/>} />
          )}
          <Route path={`/enrollement`} element={<> <Stepper isWinter={0}/></>} />
          <Route path={`/enrollement/:id/:classId`} element={<EnrolClass />} />
          <Route path={`/students/`} element={<StudentInfo />} />
          <Route path={`/teachers/`} element={<TutorInfo />} />
        </Routes>
      </div>
    </Router>
  );  
}
