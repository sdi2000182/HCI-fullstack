from flask import Flask, request, jsonify, make_response, send_from_directory , Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_, exists, alias
from flask_cors import CORS
import uuid
from datetime import timedelta
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT
from werkzeug.security import generate_password_hash,check_password_hash
# from app import app
from sqlalchemy import create_engine,Column, Date, Float, ForeignKey, Integer, BigInteger,String, Table,asc
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text


# app = Flask(__name__)
# CORS(app)
# cors = CORS(app, resources={r"/": {"origins": "http://localhost:3306"}})
# app.config['SECRET_KEY'] = 'thisissecret'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:theo@localhost/mydb10'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
# db = SQLAlchemy(app)
db = SQLAlchemy(

)
engine = create_engine('mysql:///mystudiesDB.db', echo=True) 
Session = sessionmaker(bind=engine)
session = Session()
# app.app_context().push()


class Message(db.Model):
    __tablename__ = 'message'

    Message_ID = Column(Integer, primary_key=True)
    First_Name = Column(String(45))
    Last_Name = Column(String(45))
    Email = Column(String(45))
    Body = Column(String(500))


class User(db.Model):
    __tablename__ = 'user'

    User_ID = Column(Integer, primary_key=True, unique=True)
    First_Name = Column(String(45), nullable=False)
    Last_Name = Column(String(45), nullable=False)
    username = Column(String(45), nullable=False)
    academic_mail = Column(String(45), nullable=False)
    Department = Column(String(45), nullable=False)
    Register_Date = Column(Date, nullable=False)
    Father_Name = Column(String(45), nullable=False)
    Mother_Name = Column(String(45), nullable=False)
    Birth = Column(Date, nullable=False)
    Fam = Column(String(45), nullable=False)
    Siblings = Column(Integer, nullable=False)
    Taut = Column(String(45), nullable=False)
    AMKA = Column(Integer, nullable=False)
    Address = Column(String(45), nullable=False)
    ZIPCode = Column(Integer, nullable=False)
    AddPhone = Column(BigInteger, nullable=False)
    Phone = Column(BigInteger, nullable=False)
    email = Column(String(45), nullable=False)
    isTutor = Column(String(45), nullable=False)
    Password = Column(String(45), nullable=False)

class Certificate(db.Model):
    __tablename__ = 'certificate'

    Certificate_ID = Column(Integer, primary_key=True)
    Type = Column(String(45))
    Date = Column(Date)
    Status = Column(String(45))
    Download = Column(String(45))
    User_ID = Column(ForeignKey('user.User_ID'), nullable=False, index=True)

class Clas(db.Model):
    __tablename__ = 'clas'
    
    Class_ID = Column(String(45), primary_key=True)
    Name = Column(String(500))


    __table_args__ = (
        db.ForeignKeyConstraint(['Tutor_ID'], ['user.User_ID']),

        db.ForeignKeyConstraint(['Prereq'], ['clas.Class_ID']),
        # db.Index('fk_class_idx', 'Tutor_ID'),
        # db.Index('fk_class2_idx', 'Prereq')

        db.Index('fk_class5_idx', 'Tutor_ID','Prereq')
    )
    Tutor_ID = Column(ForeignKey('user.User_ID'), index=True, nullable=True)
    Semester = Column(Integer)
    Type = Column(String(45))
    ECTS = Column(Integer)
    PassValue = Column(Float)
    CalcForGrad = Column(TINYINT)
    CognitiveObj = Column(String(45))
    Theory = Column(Integer)
    Lab = Column(Integer)
    WebPage = Column(String(45))
    Eidikeush = Column(String(45))
    Prereq = Column(db.ForeignKey("clas.Class_ID"))
    Kateythinsi = Column(String(45))
    user = relationship('User')
    prereq_class = relationship('Clas', remote_side=[Class_ID])
    user = relationship('User')


class Book(db.Model):
    __tablename__ = 'book'
    __table_args__ = (
        db.ForeignKeyConstraint(['Class_ID'], ['clas.Class_ID']),
        db.Index('fk_book_idx', 'Class_ID')
    )
    Book_ID = Column(Integer, primary_key=True)
    Name = Column(String(45))
    Author = Column(String(45))
    Class_ID = Column(ForeignKey('clas.Class_ID'), nullable=False, index=True)

    clas = relationship('Clas')






class Enrolled(db.Model):
    __tablename__ = 'enrolled'
    __table_args__ = (
        db.ForeignKeyConstraint(['Student_ID'], ['user.User_ID']),
        db.ForeignKeyConstraint(['Class_ID'], ['clas.Class_ID']),
        db.Index('fk_enrolled_idx', 'Student_ID', 'Class_ID')
    )
    Enrolled_ID = Column(db.String(45), primary_key=True)
    Student_ID = Column(ForeignKey('user.User_ID'), nullable=False, index=True)
    Semester = Column(String(45)) #todo set automata by date
    Class_ID = Column(ForeignKey('clas.Class_ID'), nullable=False, index=True)
    IsFinal = Column(db.Integer)
    clas = relationship('Clas')
    user = relationship('User')


class Grade(db.Model):
    __tablename__ = 'grades'
    __table_args__ = (
        db.ForeignKeyConstraint(['Student_ID'], ['user.User_ID']),
        db.ForeignKeyConstraint(['Class_ID'], ['clas.Class_ID']),
        db.ForeignKeyConstraint(['Enrolled_ID'], ['enrolled.Enrolled_ID']),
        db.Index('fk_enrolled_idx', 'Student_ID', 'Class_ID','Enrolled_ID')
    )
    Grade_ID = Column(Integer, primary_key=True, autoincrement=True)
    Student_ID = Column(ForeignKey('user.User_ID'), nullable=False, index=True)
    Class_ID = Column(ForeignKey('clas.Class_ID'), nullable=False, index=True)
    Enrolled_ID = Column(ForeignKey('enrolled.Enrolled_ID'), nullable=False, index=True)
    Grade = Column(Float)
    Semester = Column(String(45))
    Type = Column(String(45))
    IsFinal = Column(db.Integer)
    clas = relationship('Clas')
    enrolled = relationship('Enrolled')
    user = relationship('User')

def create_user():
    user = User(User_ID = 1115,First_Name = "Χρήστος",Last_Name ="Χρήστου",username ="sdi2000555",academic_mail = "sdi2000555@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "2002-12-15",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5999",AMKA =15129999,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2105556667,Phone =6955547895,email ="chrischris@gmail.com",
                isTutor = "0",Password ="12345678")
    db.session.add(user)
    user = User(User_ID = 1116,First_Name = "Στέλλα",Last_Name ="Παππά",username ="sdi2000556",academic_mail = "sdi2000556@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "2002-12-16",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5990",AMKA =15129990,
                Address = "Λαδά 46",ZIPCode =17889,AddPhone =2105567778,Phone =695561329,email ="stella@gmail.com",
                isTutor = "0",Password ="12345678")
    db.session.add(user)
    user = User(User_ID = 1117,First_Name = "Χαρά",Last_Name ="Χρήστου",username ="sdi2000558",academic_mail = "sdi2000558@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "2002-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5998",AMKA =15129998,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2105508889,Phone =6955039078,email ="hara@gmail.com",
                isTutor = "0",Password ="12345678")
    db.session.add(user)

    user = User(User_ID = 2117,First_Name = "Καθηγητής",Last_Name ="Τάδε",username ="kathigitis1",academic_mail = "kathigitis1@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "1967-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΡ59980",AMKA =1512679998,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2105501111,Phone =6955016512,email ="teacher1@gmail.com",
                isTutor = "1",Password ="12345678")
    db.session.add(user)

    user = User(User_ID = 2118,First_Name = "Καθηγητής",Last_Name ="Άλφα",username ="kathigitis2",academic_mail = "kathigitis2@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "1967-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5997",AMKA =15129999,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2115502223,Phone =6985501276,email ="teacher2@gmail.com",
                isTutor = "1",Password ="12345678")
    db.session.add(user)
    user = User(User_ID = 2119,First_Name = "Χαρά",Last_Name ="Κάππα",username ="kathigitria1",academic_mail = "kathigitria1@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "1990-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ59981",AMKA =151299981,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2105504441,Phone =6955049054,email ="hara1@gmail.com",
                isTutor = "1",Password ="12345678")
    db.session.add(user)
    user = User(User_ID = 2120,First_Name = "Καθηγήτρια",Last_Name ="Βήτα",username ="kathigitria2",academic_mail = "kathigitria2@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "1950-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5998",AMKA =15129998,
                Address = "Λαδά 45",ZIPCode =17888,AddPhone =2105503332,Phone =6955012367,email ="teacher3@gmail.com",
                isTutor = "0",Password ="12345678")
    db.session.add(user)
    user = User(User_ID = 2121,First_Name = "Καθηγήτρια",Last_Name ="Τάδε",username ="kathigitria3",academic_mail = "kathigitria3@uoa.gr",
                Department = "Πληροφορικής και Τηλεπικοινωνιών",
                Register_Date = "2020-09-09",Father_Name = "Γιώργος",Mother_Name = "Μαρία",
                Birth = "1967-12-12",Fam = "Άγαμος",Siblings  =2,Taut ="ΑΟ5998",AMKA =15129998,
                Address = "Λαδά 45",ZIPCode =17988,AddPhone =21055902229,Phone =6955908872,email ="tade@gmail.com",
                isTutor = "0",Password ="12345678")
    db.session.add(user)
    db.session.commit()
    

def create_class():
    clas = Clas(Class_ID = "Κ03",Name = "Γραμμική Άλγεβρα",Tutor_ID =2117,Semester = 1,
                Type = "Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Μαθηματικά",Theory = 4,Lab  =0,WebPage ="eclass/linear",Eidikeush="NULL")
    
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ09",Name = "Διακριτά Μαθηματικά",Tutor_ID =2118,Semester = 1,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Μαθηματικά",Theory = 4,Lab  =0,WebPage ="eclass/discrete",Eidikeush="NULL")
   
    db.session.add(clas)
    clas = Clas(Class_ID = "ΓΠ07",Name = "Εισαγωγή στην Πληροφορική και στις Τηλεπικοινωνίες",Tutor_ID =2118,Semester = 1,
                Type = "Γενικής Παιδείας",
                ECTS = 2,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Πληροφορική",Theory = 4,Lab  =0,WebPage ="eclass/informatics",Eidikeush="NULL")
    
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ04",Name = "Εισαγωγή στον Προγραμματισμό",Tutor_ID =2119,Semester = 1,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Προγραμματισμός",Theory = 4,Lab  =0,WebPage ="eclass/ip",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "K02ε",Name = "Εργαστήριο Λογικής Σχεδίασης",Tutor_ID =2117,Semester = 1,
                Type = "Αυτοτελές Προαιρετικό Εργαστήριο",
                ECTS = 2,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "VHDL",Theory = 0,Lab  =4,WebPage ="eclass/vhdl",Eidikeush="NULL")
    db.session.add(clas)
    #todo change tutor_id to not null
    #todo semester%2 == 0 ->earino or sth

    clas = Clas(Class_ID = "Κ01",Name = "Ανάλυση I",Tutor_ID =2121,Semester = 2,
                Type = "Υποχρεωτικό",
                ECTS = 8,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Μαθηματικά",Theory = 4,Lab  =0,WebPage ="eclass/calculus",Eidikeush="NULL")

    db.session.add(clas)
    clas = Clas(Class_ID = "Κ14",Name = "Αρχιτεκτονική Υπολογιστών",Tutor_ID =2120,Semester = 2,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Αρχιτεκτονική Υπολογιστών",Theory = 4,Lab  =2,WebPage ="eclass/comparchit",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ08",Name = "Δομές Δεδομένων και Τεχνικές Προγραμματισμού",Tutor_ID =2119,Semester = 2,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Προγραμματισμός",Theory = 4,Lab  =2,WebPage ="eclass/datastruct",Eidikeush="NULL")
    
    db.session.add(clas)


    clas = Clas(Class_ID = "Κ06",Name = "Ανάλυση II",Tutor_ID =2118,Semester = 3,
                Type = "Υποχρεωτικό",
                ECTS = 8,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Μαθηματικά",Theory = 4,Lab  =0,WebPage ="eclass/calculus",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ10",Name = "Αντικειμενοστραφής",Tutor_ID =2117,Semester = 3,
                Type = "Υποχρεωτικό",
                ECTS = 8,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Προγραμματισμός",Theory = 4,Lab  =2,WebPage ="eclass/oop",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ11ε",Name = "Εργαστήριο Κυκλωμάτων και Συστημάτων",Tutor_ID =2118,Semester = 3,
                Type = "Αυτοτελές Προαιρετικό Εργαστήριο",
                ECTS = 2,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Κυκλώματα",Theory = 0,Lab  =4,WebPage ="eclass/systems",Eidikeush="NULL")

    db.session.add(clas)
    
    clas = Clas(Class_ID = "Κ16",Name = "Δίκτυα Επικοινωνιών I",Tutor_ID =2119,Semester = 4,
                Type = "Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Δίκτυα",Theory = 4,Lab  =2,WebPage ="eclass/net",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ16ε",Name = "Εργαστήριο Δικτύων Επικοινωνιών I",Tutor_ID =2120,Semester = 4,
                Type = "Αυτοτελές Προαιρετικό Εργαστήριο",
                ECTS = 2,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Δίκτυα",Theory = 0,Lab  =4,WebPage ="eclass/netlab",Eidikeush="NULL")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ17",Name = "Σχεδίαση και Χρήση Βάσεων Δεδομένων",Tutor_ID =2121,Semester = 4,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Βάσεις Δεδομένων",Theory = 4,Lab  =0,WebPage ="eclass/algo",Eidikeush="NULL")
    db.session.add(clas)

    clas = Clas(Class_ID = "Κ15",Name = "Αριθμητική Ανάλυση",Tutor_ID =2119,Semester = 5,
                Type = "Κατ'Επιλογήν Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Μαθηματικά",Theory = 4,Lab  =2,WebPage ="eclass/aranal",Eidikeush = "S1",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "ΘΠ01",Name = "Αρχές Γλωσσών Προγραμματισμού",Tutor_ID =2118,Semester = 5,
                Type = "Βασικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Θεωρητική Πληροφορική",Theory = 4,Lab  =0,WebPage ="eclass/arxes",Eidikeush = "S1",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ22",Name = "Λειτουργικά Συστήματα",Tutor_ID =2119,Semester = 5,
                Type = "Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Λειτουργικά Συστήματα",Theory = 4,Lab  =0,WebPage ="eclass/os",Eidikeush = "NULL",Prereq="Κ08")
 
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ32",Name = "Ψηφιακή Επεξεργασία Σήματος",Tutor_ID =2117,Semester = 5,
                Type = "Κατ' Επιλογήν Υποχρεωτικό",
                ECTS = 7,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Σήματα",Theory = 4,Lab  =0,WebPage ="eclass/ds",Eidikeush="S6",Prereq="Κ08",Kateythinsi = "B")
    db.session.add(clas)
    #todo split s2,s3 
    clas = Clas(Class_ID = "K18",Name = "Υλοποίηση Συστημάτων Βάσεων Δεδομένων",Tutor_ID =2118,Semester = 5,
                Type = "Κατ' Επιλογήν Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Βάσεις Δεδομένων",Theory = 4,Lab  =0,WebPage ="eclass/ysvd",Eidikeush="S2",Prereq="Κ08",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ33",Name = "Δίκτυα Επικοινωνιών ΙΙ",Tutor_ID =2119,Semester = 5,
                Type = "Κατ' Επιλογήν Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Δίκτυα",Theory = 4,Lab  =0,WebPage ="eclass/net2",Eidikeush="S5",Prereq="Κ16",Kateythinsi = "B")
    db.session.add(clas)
    
    clas = Clas(Class_ID = "Κ30",Name = "Αρχιτεκτονική Υπολογιστών ΙΙ",Tutor_ID =2120,Semester = 5,
                Type = "Κατ' Επιλογήν Υποχρεωτικό",
                ECTS = 6,PassValue = 5,CalcForGrad= 1,
                CognitiveObj = "Αρχιτεκτονική Υπολογιστών",Theory = 4,Lab  =2,WebPage ="eclass/comparchit2",Eidikeush="S4",Prereq="Κ14",Kateythinsi = "B")
    db.session.add(clas)


    clas = Clas(Class_ID = "Κ25",Name = "Θεωρία Υπολογισμού",Tutor_ID =2118,Semester = 6,
    Type = "Υποχρεωτικό",
    ECTS = 6,PassValue = 5,CalcForGrad= 1,
    CognitiveObj = "Θεωρητική Πληροφορική",Theory = 4,Lab = 0,WebPage ="eclass/comput_theory",Eidikeush="S1",Kateythinsi = "B")
    db.session.add(clas)
    clas = Clas(Class_ID = "ΥΣ05",Name = "Λογικός Προγραμματισμός",Tutor_ID =2119,Semester = 6,
        Type = "Κατ' Επιλογήν Υποχρεωτικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Υπολογιστικά Συστήματα και Υπολογισμοί",Theory = 4,Lab = 0,WebPage ="eclass/logic",Eidikeush="S2",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "ΥΣ14",Name = "Τεχνολογίες Εφαρμογών Διαδικτύου",Tutor_ID =2120,Semester = 6,
    Type = "Βασικό",
    ECTS = 6,PassValue = 5,CalcForGrad= 1,
    CognitiveObj = "Υπολογιστικά Συστήματα και Υπολογισμοί",Theory = 4,Lab = 2,WebPage ="eclass/net2",Eidikeush="S3",Kateythinsi = "A")
    db.session.add(clas)

    clas = Clas(Class_ID = "Κ38",Name = "Μεταγλωττιστές",Tutor_ID =2120,Semester = 6,
    Type = "Κατ' Επιλογήν Υποχρεωτικό",
    ECTS = 6,PassValue = 5,CalcForGrad= 1,
    CognitiveObj = "Υπολογιστικά Συστήματα και Υπολογισμοί",Theory = 4,Lab = 1,WebPage ="eclass/compilers",Eidikeush="S4",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "ΥΣ18",Name = "Ασύρματα Δίκτυα Αισθητήρων",Tutor_ID =2117,Semester = 6,
    Type = "Βασικό",
    ECTS = 6,PassValue = 5,CalcForGrad= 1,
    CognitiveObj = "Δίκτυα",Theory = 3,Lab = 1,WebPage ="eclass/net3",Eidikeush="S5",Prereq="Κ22",Kateythinsi = "B")
    db.session.add(clas)
    clas = Clas(Class_ID = "ΥΣ17",Name = "Εφαρμοσμένα Μαθηματικά",Tutor_ID =2117,Semester = 6,
        Type = "Βασικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 3,Lab = 1,WebPage ="eclass/maths",Eidikeush="S6",Kateythinsi = "B")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ37",Name = "Προηγμένα Θέματα Αλγορίθμων",Tutor_ID =2117,Semester = 7,
        Type = "Βασικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 3,Lab = 1,WebPage ="eclass/theory2",Eidikeush="S1",Kateythinsi = "B")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ29",Name = "Επικοινωνία Ανθρώπου Μηχανής",Tutor_ID =2121,Semester = 7,
        Type = "Βασικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 4,Lab = 0,WebPage ="eclass/eam",Eidikeush="S2",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ36",Name = "Ανάπτυξη Λογισμικού για Συστήματα Δικτύων και Τηλεπικοινωνιών",Tutor_ID =2119,Semester = 7,
        Type = "Project",
        ECTS = 8,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Δίκτυα",Theory = 8,Lab = 0,WebPage ="eclass/net_and_tell",Eidikeush="S6",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ39",Name = "Ανάπτυξη Λογισμικού για Αλγοριθμικά Προβλήματα",Tutor_ID =2121,Semester = 7,
        Type = "Project",
        ECTS = 8,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 8,Lab = 0,WebPage ="eclass/algorithms",Eidikeush="S1",Kateythinsi = "A")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ40",Name = "Προστασία και Ασφάλεια",Tutor_ID =2120,Semester = 8,
        Type = "Βασικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 6,Lab = 0,WebPage ="eclass/safety",Eidikeush="S3")
    db.session.add(clas)
    clas = Clas(Class_ID = "Κ35",Name = "Μουσική Πληροφορική",Tutor_ID =2120,Semester = 8,
        Type = "Βασικό",
        ECTS = 6,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Θεωρητική Πληροφορική",Theory = 2,Lab = 2,WebPage ="eclass/music",Eidikeush="S6",Kateythinsi = "B")
    db.session.add(clas)
    clas = Clas(Class_ID = "P1",Name = "Πρακτική Ι",Semester = 8,
        Type = "Πρακτική",
        ECTS = 8,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Πρακτική",Theory = 0,Lab = 0,WebPage ="eclass/praxis",Eidikeush="S0")
    db.session.add(clas)
    clas = Clas(Class_ID = "P11",Name = "Πρακτική ΙΙ",Semester = 8,
        Type = "Πρακτική",
        ECTS = 16,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Πρακτική",Theory = 0,Lab = 0,WebPage ="eclass/praxis",Eidikeush="S0")
    db.session.add(clas)
    clas = Clas(Class_ID = "P2",Name = "Πτυχιακή Ι",Semester = 8,
        Type = "Πτυχιακή",
        ECTS = 8,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Πτυχιακή",Theory = 0,Lab = 0,WebPage ="eclass/ptixiaki",Eidikeush="S0")
    db.session.add(clas)
    clas = Clas(Class_ID = "P22",Name = "Πτυχιακή ΙΙ",Semester = 8,
        Type = "Πτυχιακή",
        ECTS = 16,PassValue = 5,CalcForGrad= 1,
        CognitiveObj = "Πτυχιακή",Theory = 0,Lab = 0,WebPage ="eclass/ptixiaki",Eidikeush="S0")
    db.session.add(clas)
    db.session.commit()



def create_book():
    book = Book(Book_ID = "1", Name = "Βιβλίο 1", Author = "Συγγραφέας",Class_ID = "Κ08")
    db.session.add(book)
    book = Book(Book_ID = "2", Name = "Βιβλίο 2", Author = "Συγγραφέας",Class_ID = "Κ08")
    db.session.add(book)
    book = Book(Book_ID = "3", Name = "Βιβλίο 3", Author = "Συγγραφέας Δύο",Class_ID = "Κ10")
    db.session.add(book)
    book = Book(Book_ID = "4", Name = "Βιβλίο 4", Author = "Συγγραφέας Δύο",Class_ID = "Κ03")
    db.session.add(book)
    db.session.commit()




def create_class_to_enrol():
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2023",Class_ID = "Κ03",IsFinal =0)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1116,
                     Semester="Χειμερινό Εξάμηνο 2023",Class_ID = "Κ03",IsFinal =0)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1117,
                     Semester="Χειμερινό Εξάμηνο 2023",Class_ID = "Κ03",IsFinal =0)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2023",Class_ID = "Κ09",IsFinal =0)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2023",Class_ID = "Κ15",IsFinal =0)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Εαρινό Εξάμηνο 2023",Class_ID = "Κ17",IsFinal =1)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Εαρινό Εξάμηνο 2023",Class_ID = "Κ16ε",IsFinal =1)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Εαρινό Εξάμηνο 2023",Class_ID = "Κ16",IsFinal =1)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2022",Class_ID = "Κ03",IsFinal =1)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2022",Class_ID = "Κ09",IsFinal =1)
    db.session.add(enrol)
    enrol = Enrolled(Enrolled_ID =str(uuid.uuid4()),Student_ID = 1115,
                     Semester="Χειμερινό Εξάμηνο 2022",Class_ID = "Κ15",IsFinal =1)
    db.session.add(enrol)
    db.session.commit()

def get_enrolled_id(student_id, class_id,semester):
    # enrols = Enrolled.query.filter_by(Student_ID = student_id,Class_ID= class_id).first()
    enrols = Enrolled.query.filter_by(Student_ID = student_id , Class_ID= class_id, Semester = semester).first()
    
    # if enrols:
    #     return enrols.Enrolled_ID
    # else: 
    #     return None
    return enrols.Enrolled_ID

def create_grade(): #an o vathmos yparxei kai einai megalyteros isos tou 5 na mhn dilosi
    id1 = get_enrolled_id(1115,"Κ03","Χειμερινό Εξάμηνο 2023")
    grade = Grade( Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ03",Grade = 5, Semester="Χειμερινό Εξάμηνο 2023",Type="Τελικός" ,IsFinal =0)
    db.session.add(grade)
    print("grade")
    id1 = get_enrolled_id(1115,"Κ09","Χειμερινό Εξάμηνο 2023")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ09",Grade = 5, Semester="Χειμερινό Εξάμηνο 2023",Type="Τελικός",IsFinal =0)
    db.session.add(grade)
    id1 = get_enrolled_id(1115,"Κ15","Χειμερινό Εξάμηνο 2023")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ15",Grade = 5, Semester="Χειμερινό Εξάμηνο 2023",Type="Τελικός",IsFinal =0 )
    db.session.add(grade)
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ15",Grade = 5, Semester="Χειμερινό Εξάμηνο 2023",Type="Εργασία 1" ,IsFinal =1)
    db.session.add(grade)
    id1 = get_enrolled_id(1115,"Κ16","Εαρινό Εξάμηνο 2023")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ16",Grade = 5, Semester="Εαρινό Εξάμηνο 2023",Type="Τελικός" ,IsFinal =1)
    db.session.add(grade)
    grade = Grade(Enrolled_ID = id1,Student_ID = 1115, Class_ID = "Κ16",Grade = 5, Semester="Εαρινό Εξάμηνο 2023",Type="Εργασία 1",IsFinal =1 )
    db.session.add(grade)
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ16",Grade = 5, Semester="Εαρινό Εξάμηνο 2023",Type="Εργασία 2",IsFinal =1 )
    db.session.add(grade)
    id1 = get_enrolled_id(1115,"Κ03","Χειμερινό Εξάμηνο 2022")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ03",Grade = 4, Semester="Χειμερινό Εξάμηνο 2022",Type="Τελικός" ,IsFinal =1)
    db.session.add(grade)
    id1 = get_enrolled_id(1115,"Κ09","Χειμερινό Εξάμηνο 2022")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ09",Grade = 3, Semester="Χειμερινό Εξάμηνο 2022",Type="Τελικός" ,IsFinal =1)
    db.session.add(grade)
    id1 = get_enrolled_id(1115,"Κ15","Χειμερινό Εξάμηνο 2022")
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ15",Grade = 2, Semester="Χειμερινό Εξάμηνο 2022",Type="Τελικός" ,IsFinal =1)
    db.session.add(grade)
    grade = Grade(Enrolled_ID = id1, Student_ID = 1115, Class_ID = "Κ15",Grade = 5, Semester="Χειμερινό Εξάμηνο 2022",Type="Εργασία 1" ,IsFinal =1 )
    db.session.add(grade)
    print("created")
    db.session.commit()