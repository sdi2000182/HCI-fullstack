from flask import Flask, request, jsonify, make_response, send_from_directory , Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_, exists, alias
from flask_cors import CORS
import uuid
from datetime import timedelta
from werkzeug.security import generate_password_hash,check_password_hash
import jwt
import datetime
from functools import wraps
import os
import random
import xml.etree.ElementTree as ET
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import pandas as pd
import xlsxwriter
from flask import send_file
from sqlalchemy import case, func
import xmltodict
import json
import glob
import base64
from flask_jwt_extended import (jwt_required, create_access_token,
    create_refresh_token)
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import verify_jwt_in_request
from collections import defaultdict
from sqlalchemy import create_engine,Column, Date, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import TINYINT
from sqlalchemy import MetaData
from sqlalchemy import desc
import re
from populate import Message,User,Certificate,Book,Enrolled,Clas,Grade,db,session,create_book,create_class,create_user,create_grade,create_class_to_enrol
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/": {"origins": "http://83.212.75.182:3395"}})
app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:scottjimwoo@83.212.75.182:3395/mystudiesDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
from sqlalchemy import func
# db = SQLAlchemy(app)
jwt1= JWTManager(app)
db.init_app(app)
app.app_context().push()

def create_tables_if_not_exist():
    with app.app_context():
        db.create_all()

        session = db.session

        if session.query(func.count(User.User_ID)).scalar() == 0:
            create_user()
        if session.query(func.count(Clas.Class_ID)).scalar() == 0:
            create_class()
        if session.query(func.count(Book.Book_ID)).scalar() == 0:
            create_book()
        if session.query(func.count(Enrolled.Enrolled_ID)).scalar() == 0:
            create_class_to_enrol()
        if session.query(func.count(Grade.Grade_ID)).scalar() == 0:
            print("ok")
            create_grade()
            print("finished")
#TODO Login 
#TODO search θα προβλεπει τι θελει ο χρηστης?
#TODO get_kommena mathimata
#TODO diloseis
#TODO syggramata
#TODO vathmologio kathigiton search
# TODO add kateythinsi sto db
# todo change type ptyxiaki se ptyxiaki etc

def custom_sort_key(semester_str):
    print("Semester _ str is ",semester_str)
    if semester_str.startswith("Χειμερινό Εξάμηνο"):
        
        variable=2
        year = int(semester_str.split()[-1])
        print(int(str(year) + str(variable)))
        return int(str(year) + str(variable))
    elif semester_str.startswith("Εαρινό Εξάμηνο"):
        variable=1
        year = int(semester_str.split()[-1])
        print(int(str(year) + str(variable)))
        return int(str(year) + str(variable))
    else:
        return 0

@app.route('/get_enrolled', methods=['POST'])
def get_enrolled():
    data = request.json
    enrols = Enrolled.query.filter_by(Semester=data['Semester'], Student_ID=data['Student_ID']).all()

    output = []
    for enrol in enrols:
        enrol_data = {}
        enrol_data['Enrolled_ID'] = enrol.Enrolled_ID
        enrol_data['Semester'] = enrol.Semester
        enrol_data['Student_ID'] = enrol.Student_ID
        enrol_data['Class_ID'] = enrol.Class_ID
        clas = Clas.query.filter_by(Class_ID=enrol.Class_ID).first()
        enrol_data['Class_Name'] = clas.Name
        output.append(enrol_data)

    return jsonify({'enrol' : output})




def create_tables_if_not_exist():
    with app.app_context():
        db.create_all()

        session = db.session

        if session.query(func.count(User.User_ID)).scalar() == 0:
            create_user()
        if session.query(func.count(Clas.Class_ID)).scalar() == 0:
            create_class()
        if session.query(func.count(Book.Book_ID)).scalar() == 0:
            create_book()
        if session.query(func.count(Enrolled.Enrolled_ID)).scalar() == 0:
            create_class_to_enrol()
        if session.query(func.count(Grade.Grade_ID)).scalar() == 0:
            create_grade()



@app.route('/get_class_book', methods=['POST'])
def get_class_book():
    data = request.json
    books = Book.query.filter_by(Class_ID=data['Clas_ID'])

    output = []
    for book in books:
        book_data = {}
        book_data['Book_ID'] = book.Book_ID
        book_data['Name'] = book.Name
        book_data['Author'] = book.Author
        output.append(book_data)

    return jsonify({'book' : output})



@app.route("/login", methods=["POST"])
def create_token():
    username = request.json.get("username", None)
    password = request.json.get("Password", None)
    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({'message': 'Ο χρήστης δεν βρέθηκε. Ξαναπροσπαθήστε'})

    if not (password == user.Password):
        return jsonify({'message': 'Λάθος κωδικός χρήστη. Ξαναπροσπαθήστε'})

 
    user_data = {
        "User_ID": user.User_ID,
        "isTutor": user.isTutor
    }

 
    expires = timedelta(days=30)
    access_token = create_access_token(identity=user_data, expires_delta=expires)
    refresh_token = create_refresh_token(identity=user_data)
    return jsonify(access_token=access_token, refresh_token=refresh_token)

    

@app.route('/user/get_all_test', methods=['GET'])
def get_all_users_test():

    users = User.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['User_ID'] = user.User_ID
        user_data['First_Name'] = user.First_Name
        user_data['Father_Name'] = user.Father_Name
        user_data['Mother_Name'] = user.Mother_Name
        user_data['Last_Name'] = user.Last_Name
        user_data['email'] = user.email
        user_data['Birth'] = user.Birth
        user_data['Password'] = user.Password
        user_data['academic_mail'] = user.academic_mail
        user_data['isTutor'] = user.isTutor 
        user_data['Department'] = user.Department
        user_data['Register_Date'] = user.Register_Date
        user_data['Siblings'] = user.Siblings
        user_data['Taut'] = user.Taut
        user_data['AMKA'] = user.AMKA
        user_data['Address'] = user.Address
        user_data['ZIPCode'] = user.ZIPCode
        user_data['AddPhone'] = user.AddPhone
        user_data['Phone'] = user.Phone
        output.append(user_data)

    return jsonify({'users' : output})


@app.route('/user/get_one/', methods=['GET'])
@jwt_required()
def get_one_user():
        user = get_jwt_identity()
        user = User.query.filter_by(User_ID=user['User_ID']).first()

        if not user:
            return jsonify({'message': 'No user found!'})

        user_data = {
            'User_ID': user.User_ID,
            'First_Name': user.First_Name,
            'Father_Name': user.Father_Name,
            'Mother_Name': user.Mother_Name,
            'username':user.username,
            'Last_Name': user.Last_Name,
            'email': user.email,
            'Birth': user.Birth,
            'Password': user.Password,
            'academic_mail': user.academic_mail,
            'isTutor': user.isTutor,
            'Department': user.Department,
            'Register_Date': user.Register_Date,
            'Fam': user.Fam,
            'Siblings': user.Siblings,
            'Taut': user.Taut,
            'AMKA': user.AMKA,
            'Address': user.Address,
            'ZIPCode': user.ZIPCode,
            'AddPhone': user.AddPhone,
            'Phone': user.Phone,
        }

        return jsonify({'user': user_data})

@app.route('/user/get_one_user_withid/', methods=['POST'])
def get_one_user_withid():
    data = request.json  
    user = User.query.filter_by(User_ID=data['User_ID']).first()

    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {
        'User_ID': user.User_ID,
        'First_Name': user.First_Name,
        'Father_Name': user.Father_Name,
        'Mother_Name': user.Mother_Name,
        'username':user.username,
        'Last_Name': user.Last_Name,
        'email': user.email,
        'Birth': user.Birth,
        'Password': user.Password,
        'academic_mail': user.academic_mail,
        'isTutor': user.isTutor,
        'Department': user.Department,
        'Register_Date': user.Register_Date,
        'Fam': user.Fam,
        'Siblings': user.Siblings,
        'Taut': user.Taut,
        'AMKA': user.AMKA,
        'Address': user.Address,
        'ZIPCode': user.ZIPCode,
        'AddPhone': user.AddPhone,
        'Phone': user.Phone,
    }

    return jsonify({'user': user_data})

@app.route('/update', methods=['POST'])
@jwt_required()
def update_profile():
    user = get_jwt_identity()
    data = request.json
    current_user = User.query.filter_by(User_ID = user['User_ID']).first()

    update_user = request.get_json()
    print(update_user['email'])

    existing_email_user = User.query.filter_by(email=data["email"]).first()

    existing_email_user = User.query.filter(
        User.email == update_user['email'],
        User.User_ID != user['User_ID']
    ).first()

    if existing_email_user:
        return jsonify({'message': 'Email already exists'}), 200


    existing_telephone_user = User.query.filter(
        User.AddPhone == update_user['AddPhone'],
        User.User_ID != user['User_ID']
    ).first()

    if existing_telephone_user:
        return jsonify({'message': 'Telephone number already exists'}), 200
    

    existing_phone_user = User.query.filter(
        User.Phone == update_user['Phone'],
        User.User_ID != user['User_ID']
    ).first()

    if existing_phone_user:
        return jsonify({'message': 'Telephone number already exists'}), 200

    for field in ["email", "AddPhone" , "Phone"]:
        new_value = request.json.get(field)
        if new_value and new_value != getattr(current_user, field):
            setattr(current_user, field, new_value)

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200

@app.route('/update/password', methods=['POST'])
@jwt_required()
def update_password():
    user = get_jwt_identity()
    current_user = User.query.filter_by(User_ID = user['User_ID']).first()

    update_user = request.get_json()

    new_password = update_user["new_password"]
    current_password = update_user["current_password"]
    if current_password:
        if not (current_user.Password == current_password):
            return jsonify({"message": "Λάθος Κωδικός πρόσβασης"}), 200
        else:
            if not new_password:
                return jsonify({"message": "Διαλέξτε νεο κωδικό"}), 200
            else:
                
                current_user.Password = new_password
                db.session.commit()
                return jsonify({"message": "Ο κωδικός άλλαξε με επιτυχία"}), 200
    else:
        return jsonify({"message": "Παρακαλώ είσάγετε τον κωδικό σας"}), 200

email_regex = re.compile(r'^[^\s@]+@[^\s@]+.[^\s@]+$')
@app.route('/find_email', methods=['POST'])
def find_email():
    print("okh")
    data = request.json
    print(data)
    email_data = data['emailData']
    print(email_data)
    if not email_data:

        return jsonify({'flag': 300}) 

    
    if not email_regex.match(email_data):
        return jsonify({'flag': 300})  


    user = User.query.filter_by(academic_mail=email_data).first()

    if not user:
        return jsonify({'flag': 500}), 200  
    else:
        return jsonify({'flag': 1}), 200 

@app.route('/find_password', methods=['POST'])
def find_password():
    print("okh")
    data = request.json
    print(data)
    email_data = data['emailData']
    password = data['password']
    print(email_data)
    if not email_data:

        return jsonify([])  

    user = User.query.filter_by(academic_mail=email_data,Password=password).first()

    if not user:
        user = User.query.filter_by(academic_mail=email_data).first()
        user.Password = password
        db.session.commit()
        return jsonify({'ok': 1}), 200
    else:
        return jsonify({'ok': 0}), 200 

@app.route('/get_enrolled_students', methods=['POST'])
def get_enrolled_students():
    data = request.json
    enrols = Enrolled.query.filter_by(Class_ID=data['Class_ID'],Semester=data['Semester']).all()
    output = []

    for enrol in enrols:
        grade = Grade.query.filter_by(Student_ID= enrol.Student_ID,Type="Τελικός",Semester=data['Semester']).first()
        user = User.query.filter_by(User_ID= enrol.Student_ID).first()
        clas_data = {}
        clas_data['FirstName'] = user.First_Name
        clas_data['Last Name'] = user.Last_Name
        clas_data['Username'] = user.username
        clas_data['ID'] = user.User_ID
        if grade:
            clas_data['Grade'] = grade.Grade
        else: 
            clas_data['Grade'] = "-"
        output.append(clas_data)

    if not output:
        return jsonify([])
    return jsonify({'tutor': output})

@app.route('/upload_grades/<class_id>/<isFinal>', methods=['POST'])
def upload_grades(class_id,isFinal):
    print(class_id)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not file.filename.endswith('.xls') and not file.filename.endswith('.xlsx'):
        return jsonify({'error': 'Invalid file format. Please upload an Excel file'}), 400
    df = pd.read_excel(file)

    for row in df.iterrows():
        student_id = row[1]['Student_ID']
        enrol = Enrolled.query.filter_by(Class_ID=class_id, Student_ID=student_id,Semester='Χειμερινό Εξάμηνο 2023').first()
        
        if enrol:
            existing_grade = Grade.query.filter_by(Enrolled_ID=enrol.Enrolled_ID).first()

            if existing_grade:
                db.session.delete(existing_grade)

        if enrol:
            grade = Grade(
                Enrolled_ID=enrol.Enrolled_ID,
                Student_ID=student_id,
                Class_ID=class_id,
                Semester='Χειμερινό Εξάμηνο 2023', 
                Grade=row[1]['Grade'],
                Type="Τελικός",
                IsFinal=isFinal
            )
            db.session.add(grade)
        else:
            return jsonify({'error': f'Student with ID {student_id} is not enrolled in the class'}), 400
    db.session.commit()

    return jsonify({'message': 'Grades uploaded successfully'}), 201

@app.route('/upload_grades_regular/<class_id>/<isFinal>', methods=['POST'])
def upload_grades_regular(class_id,isFinal):
    data = request.json

    if 'tutor' not in data:
        
        return jsonify({'error': 'No grades data provided'}), 400

    grades_data = data['tutor']

    for entry in grades_data:
        student_id = entry.get('ID')
        grade_value = entry.get('Grade')

        if not student_id or not grade_value:
            return jsonify({'error': 'Invalid data format. Each entry must have Student_ID and Grade'}), 400

        enrol = Enrolled.query.filter_by(Class_ID=class_id, Student_ID=student_id, Semester='Χειμερινό Εξάμηνο 2023').first()

        if enrol:
            existing_grade = Grade.query.filter_by(Enrolled_ID=enrol.Enrolled_ID).first()

            if existing_grade:
                db.session.delete(existing_grade)

            grade = Grade(
                Enrolled_ID=enrol.Enrolled_ID,
                Student_ID=student_id,
                Class_ID=class_id,
                Semester='Χειμερινό Εξάμηνο 2023',  
                Grade=grade_value,
                Type="Τελικός",
                IsFinal=isFinal
            )
            db.session.add(grade)
        else:
            return jsonify({'error': f'Student with ID {student_id} is not enrolled in the class'}), 400
    db.session.commit()

    return jsonify({'message': 'Grades uploaded successfully'}), 201

@app.route('/passed_not_specific/<Student_ID>', methods=['POST'])
def passed_not_specific(Student_ID):
    print("ok")
    is_winter = request.json.get('isWinter',0)  # Assuming default is 0 if not provided

    grades = Grade.query.filter_by(Student_ID=Student_ID).all()

    passed_grades_count = sum(1 for grade in grades if grade.Grade >= 5)
    not_passed_grades_count = len(grades) - passed_grades_count

    # Query for enrolled classes without corresponding grades
    enrolled_classes = Enrolled.query.filter_by(Student_ID=Student_ID).all()

    enrolled_classes_without_grades_count = sum(1 for enrolled_class in enrolled_classes
                                                if not any(grade.Class_ID == enrolled_class.Class_ID for grade in grades))

    # Query for classes with grade < 5 based on isWinter value
    classes_with_low_grade = [
        {
            'Class_ID': grade.Class_ID,
            'Name': Clas.query.filter_by(Class_ID=grade.Class_ID).first().Name,
            'Grade': grade.Grade
        }
        for grade in grades
        if all(grade.Grade < 5 for grade in Grade.query.filter_by(Student_ID=Student_ID, Class_ID=grade.Class_ID))
        and (Clas.query.filter_by(Class_ID=grade.Class_ID).first().Semester % 2 == is_winter)
    ]

    user = User.query.filter_by(User_ID=Student_ID).first()
    semester = get_current_semester_number(user.Register_Date)

    result = {
        'passed_grades_count': passed_grades_count,
        'not_passed_grades_count': not_passed_grades_count,
        'enrolled_classes_without_grades_count': enrolled_classes_without_grades_count,
        'semester': semester,
        'classes_with_low_grade': classes_with_low_grade
    }

    return jsonify(result)


@app.route('/update_subject/<classId>', methods=['POST'])
def update_subject(classId):
    data = request.json

    print(data)
    clas = Clas.query.filter_by(Class_ID=classId).first()
    theory = data['Theory']
    print(theory)
    lab = data['Lab']
    print(lab)
    web_page = data['WebPage']  
    print(web_page)

    if theory is not None:
        clas.Theory = theory

    if lab is not None:
        clas.Lab = lab

    if web_page is not None:
        clas.WebPage = web_page

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200



@app.route('/get_tutor', methods=['POST'])
def get_tutor():
    data = request.json
    print(data['Clas_ID'])
    classes = Clas.query.filter_by(Class_ID=data['Clas_ID']).first()
    print(classes.Tutor_ID)
    tutor = User.query.filter_by(User_ID = classes.Tutor_ID).first()
    output = []

    clas_data = {}
    clas_data['Name'] = tutor.First_Name
    clas_data['Last'] = tutor.Last_Name
    clas_data['Email'] = tutor.email
    output.append(clas_data)

    if not output:
        print("swstaa")
        return jsonify([])
    print(output)
    return jsonify({'tutor': output})

@app.route('/get_these_classes', methods=['POST'])
def get_these_classes():
    data = request.get_json()
    print(data)
    
    class_ids = data.get('class_ids', [])

    
    class_ids_without_dash = [class_id.split('-')[0] for class_id in class_ids]
    print(class_ids_without_dash)

    
    selected_classes = Clas.query.filter(Clas.Class_ID.in_(class_ids_without_dash)).all()


    selected_classes_list = [
        {
            'Class_ID': clas.Class_ID,
            'Name': clas.Name,
            'Tutor_ID': clas.Tutor_ID,
            'Semester': clas.Semester,
            'Type': clas.Type,
            'ECTS': clas.ECTS,
            'PassValue': clas.PassValue,
            'CalcForGrad': clas.CalcForGrad,
            'CognitiveObj': clas.CognitiveObj,
            'Theory': clas.Theory,
            'Lab': clas.Lab,
            'WebPage': clas.WebPage,
            'Eidikeush': clas.Eidikeush,
            'Prereq': clas.Prereq,
            'Kateythinsi': clas.Kateythinsi
        }
        for clas in selected_classes
    ]

    return jsonify(selected_classes_list)

#tested gyrnaei mathimata kathigiti swsta
@app.route('/get_tutor_classes1', methods=['POST'])
def get_tutor_classes1():
    data = request.json
    classes = Clas.query.filter_by(Tutor_ID=data['Tutor_ID'])

    output = []
    for clas in classes:
        clas_data = {}
        clas_data['Class_ID'] = clas.Class_ID
        clas_data['Name'] = clas.Name
        clas_data['Tutor_ID'] = clas.Tutor_ID
        clas_data['Semester'] =clas.Semester
        clas_data['Type'] =clas.Type
        clas_data['ECTS'] =clas.ECTS
        clas_data['PassValue'] =clas.PassValue
        clas_data['CalcForGrad'] =clas.CalcForGrad
        clas_data['CognitiveObj'] =clas.CognitiveObj
        clas_data['Theory'] =clas.Theory
        clas_data['Lab'] =clas.Lab
        clas_data['WebPage'] =clas.WebPage
        clas_data['Eidikeush'] =clas.Eidikeush
        clas_data['Prereq'] =clas.Prereq
        output.append(clas_data)

    return jsonify({'class' : output})

@app.route('/get_grades/<class_id>', methods=['POST'])
def get_grades(class_id):
    data = request.json
    print(data['Current_Semester'])
    clas = Grade.query.filter_by(Class_ID = class_id,Semester =data['Current_Semester'],Type="Τελικός").all()
    output = []
    for clas in clas:
        student = User.query.filter_by(User_ID = clas.Student_ID).first()
        clas_data = {}
        clas_data['ID'] = clas.Student_ID
        clas_data['Name'] = student.First_Name
        clas_data['Surname'] = student.Last_Name
        clas_data['Register_Date'] = student.Register_Date
        clas_data['Grade'] = clas.Grade
        output.append(clas_data)
    print(output)
    if not output:
       
        return jsonify([])

    return jsonify({'grade': output})


def get_current_semester_number(register_date):
    registration_date = datetime(register_date.year, register_date.month, register_date.day)
    year_diff = datetime.now().year - registration_date.year
    month_diff = datetime.now().month - registration_date.month
    total_months = year_diff * 12 + month_diff

    if (
        (registration_date.month >= 3 and registration_date.month <= 8) or
        (registration_date.month == 2 and registration_date.day >= 20)
    ):
 
        semester_number = total_months // 6 + 2  
    else:
        semester_number = total_months // 6 + 1  

    return semester_number

@app.route('/get_grades_excel/<class_id>', methods=['POST'])
def get_grades_excel(class_id):
    data = request.json
    current_semester = data['Current_Semester']
    clas = Grade.query.filter_by(Class_ID=class_id, Semester=current_semester, Type="Τελικός").all()
    output = []
    for clas_item in clas:
        student = User.query.filter_by(User_ID=clas_item.Student_ID).first()
        if student:
            clas_data = {
                'ΑΜ': clas_item.Student_ID,
                'Όνομα': student.First_Name,
                'Επώνυμο': student.Last_Name,
                'Εξάμηνο Φοίτησης': get_current_semester_number(student.Register_Date),   
                'Βαθμός': clas_item.Grade
            }
            output.append(clas_data)

    if not output:
        return jsonify([])

    df = pd.DataFrame(output)
    excel_buffer = pd.ExcelWriter('grades_output.xlsx', engine='xlsxwriter')
    df.to_excel(excel_buffer, sheet_name='Sheet1', index=False)
    excel_buffer.close()
    return send_file('grades_output.xlsx', as_attachment=True)

@app.route('/get_all_grades_excel', methods=['POST'])
def get_all_grades_excel():
    data = request.json
    student_id = data['Student_ID']
    semester_filters = data['semesterFilter']
    all_grades = Grade.query.filter(
        Grade.Student_ID == student_id,
        Grade.Type == "Τελικός"
    ).all()
    print(semester_filters)
    if semester_filters:
        print("hey")
        all_grades = [grade for grade in all_grades if grade.Semester in semester_filters]
    sorted_grades = sorted(all_grades, key=lambda x: custom_sort_key(x.Semester), reverse=True)
    sorted_grade_ids = [grade.Grade_ID for grade in sorted_grades]

    
    case_statement = case({grade_id: index for index, grade_id in enumerate(sorted_grade_ids)})


    all_grades = (
        Grade.query.
        filter(Grade.Grade_ID.in_(sorted_grade_ids), Grade.Student_ID == student_id, Grade.Type == "Τελικός").
        order_by(case_statement).
        all()
    )

 
    semester_class_grades = defaultdict(lambda: defaultdict(list))

    for grade in all_grades:
        clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
        grade_data = {
            'Κωδικός Μαθήματος': grade.Class_ID,
            'Βαθμός': grade.Grade,
            'Όνομα': clas.Name if clas else None
        }
        semester_class_grades[grade.Semester][grade.Class_ID].append(grade_data)

    excel_data = {'Εξάμηνο': [], 'Κωδικός Μαθήματος': [], 'Βαθμός': [], 'Όνομα': []}

    for semester, class_grades in semester_class_grades.items():
        for class_id, grades in class_grades.items():
            for grade_data in grades:
                excel_data['Εξάμηνο'].append(semester)
                excel_data['Κωδικός Μαθήματος'].append(grade_data['Κωδικός Μαθήματος'])
                excel_data['Βαθμός'].append(grade_data['Βαθμός'])
                excel_data['Όνομα'].append(grade_data['Όνομα'])


    df = pd.DataFrame(excel_data)

    excel_buffer = pd.ExcelWriter('grades_output.xlsx', engine='xlsxwriter')
    df.to_excel(excel_buffer, sheet_name='Sheet1', index=False)
    excel_buffer.close()

    return send_file('grades_output.xlsx', as_attachment=True)


@app.route('/all_enrolled', methods=['POST'])
def all_enrolled():
    data = request.json
    student_id = data.get('Student_ID')

    if not student_id:
        return jsonify({'error': 'Student ID is required'}), 400

    all_grades = Enrolled.query.filter(
    Enrolled.Student_ID == student_id,
    ).all()
    if not all_grades:
        return jsonify([])
    sorted_grades = sorted(all_grades, key=lambda x: custom_sort_key(x.Semester), reverse=True)


    sorted_grade_ids = [enrolled.Enrolled_ID for enrolled in sorted_grades]
    for sort in sorted_grade_ids:
        print("this is",sort)
    case_statement = case({grade_id: index for index, grade_id in enumerate(sorted_grade_ids)})


    all_grades = (
    Enrolled.query.
    filter(Enrolled.Enrolled_ID.in_(sorted_grade_ids), Enrolled.Student_ID == student_id).
    order_by(func.field(Enrolled.Enrolled_ID, *sorted_grade_ids)).  
    all()
)

    print(all_grades)

    if all_grades:
       
        semester_grades = defaultdict(list)

        for grade in all_grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Semester': grade.Semester,
                "Sem": clas.Semester,
                'Name': clas.Name if clas else None
            }

            semester_grades[grade.Semester].append(grade_data)

       
        semester_data = []

        for semester, grades in semester_grades.items():

            
            semester_info = {
                'Semester': semester,
                'num_classes': len(grades),
                'all_grades': grades,
            }

            semester_data.append(semester_info)

       
        total_ects = sum(clas.ECTS for clas in (Clas.query.filter_by(Class_ID=grade.Class_ID).first() for grade in all_grades) if clas)

        result = {
           
            'total_ects': total_ects,
            'semesters': semester_data,
        }

        return jsonify(result)
    else:
        return jsonify({'error': 'No grades found for the student'}), 404

@app.route('/enrolled_excel/<Student_ID>', methods=['POST'])
def enrolled_excel(Student_ID):
    data = request.json
    student_id = Student_ID
    semester_filters = data['semesterFilter']
    all_enrolled = Enrolled.query.filter(
        Enrolled.Student_ID == student_id,
    ).all()
    if not all_enrolled:
        return jsonify([])
    if semester_filters:
        all_enrolled = [enrolled for enrolled in all_enrolled if enrolled.Semester in semester_filters]

    sorted_enrolled = sorted(all_enrolled, key=lambda x: custom_sort_key(x.Semester), reverse=True)
    sorted_enrolled_ids = [enrolled.Enrolled_ID for enrolled in sorted_enrolled]


    case_statement = case({enrolled_id: index for index, enrolled_id in enumerate(sorted_enrolled_ids)})
    all_enrolled = (
        Enrolled.query.
        filter(Enrolled.Enrolled_ID.in_(sorted_enrolled_ids), Enrolled.Student_ID == student_id).
        order_by(case_statement).
        all()
    )

    semester_class_enrolled = defaultdict(lambda: defaultdict(list))

    for enrolled in all_enrolled:
        clas = Clas.query.filter_by(Class_ID=enrolled.Class_ID).first()
        enrolled_data = {
            'Κωδικός Μαθήματος': enrolled.Class_ID,
            'Εξεταστική Περίοδος': enrolled.Semester,
            "Εξάμηνο": clas.Semester if clas else None,
            'Μάθημα': clas.Name if clas else None
        }
        semester_class_enrolled[enrolled.Semester][enrolled.Class_ID].append(enrolled_data)

   
    excel_data = {'Εξεταστική Περίοδος': [], 'Κωδικός Μαθήματος': [], 'Εξάμηνο': [], 'Μάθημα': []}

    for semester, class_enrolled in semester_class_enrolled.items():
        for class_id, enrolled_list in class_enrolled.items():
            for enrolled_data in enrolled_list:
                excel_data['Εξεταστική Περίοδος'].append(enrolled_data['Εξεταστική Περίοδος'])
                excel_data['Κωδικός Μαθήματος'].append(enrolled_data['Κωδικός Μαθήματος'])
                excel_data['Εξάμηνο'].append(enrolled_data['Εξάμηνο'])
                excel_data['Μάθημα'].append(enrolled_data['Μάθημα'])

    df = pd.DataFrame(excel_data)

    excel_buffer = pd.ExcelWriter('enrolled_output.xlsx', engine='xlsxwriter')
    df.to_excel(excel_buffer, sheet_name='Sheet1', index=False)
    excel_buffer.close()

 
    return send_file('enrolled_output.xlsx', as_attachment=True)





@app.route('/passed_not/<Student_ID>', methods=['POST'])
def passed_not(Student_ID):
    print("ok")
    
 
    all_grades = Grade.query.filter_by(Student_ID=Student_ID, Type="Τελικός").all()

  
    passed_grades = [grade for grade in all_grades if grade.Grade >= 5]
    not_passed_grades = [grade for grade in all_grades if grade.Grade < 5]


    classes_with_passing_grades = [grade.Class_ID for grade in passed_grades]
    classes = [grade.Class_ID for grade in all_grades]

    not_passed_grades = [grade for grade in not_passed_grades if grade.Class_ID not in classes_with_passing_grades]

   
    not_passed_grades_count = len(not_passed_grades)

    passed_grades_count = len(passed_grades)
    enrolled_classes = Enrolled.query.filter_by(Student_ID=Student_ID).all()


    enrolled_classes_without_grades_count = sum(1 for enrolled_class in enrolled_classes
                                                if enrolled_class.Class_ID not in classes)

    classes_with_low_grade = [
        {
            'Class_ID': grade.Class_ID,
            'Name': Clas.query.filter_by(Class_ID=grade.Class_ID).first().Name,
            'Grade': grade.Grade
        }
        for grade in not_passed_grades
    ]

    user = User.query.filter_by(User_ID=Student_ID).first()
    semester = get_current_semester_number(user.Register_Date)

    result = {
        'passed_grades_count': passed_grades_count,
        'not_passed_grades_count': not_passed_grades_count,
        'enrolled_classes_without_grades_count': enrolled_classes_without_grades_count,
        'semester': semester,
        'classes_with_low_grade': classes_with_low_grade
    }

    return jsonify(result)


@app.route('/get_grades_excel_stud/<Student_ID>', methods=['POST'])
def get_grades_excel_stud(Student_ID):
    data = request.json
    student_id = Student_ID
    semester_filters = data['semesterFilter']
    gradeFilter = data['gradeFilter']
 
    if gradeFilter == "all":
        all_grades = Grade.query.filter(
            Grade.Student_ID == student_id,
            Grade.Type == "Τελικός"
        ).all()
    if gradeFilter == "passed":
        all_grades = Grade.query.filter(
            Grade.Student_ID == student_id,
            Grade.Type == "Τελικός",
            Grade.Grade >= 5
        ).all()

    if gradeFilter == "failed":
        all_grades = Grade.query.filter(
            Grade.Student_ID == student_id,
            Grade.Type == "Τελικός",
            Grade.Grade < 5
        ).all()
    print(semester_filters)
    if semester_filters:
        print("hey")
        all_grades = [grade for grade in all_grades if grade.Semester in semester_filters]
    sorted_grades = sorted(all_grades, key=lambda x: custom_sort_key(x.Semester), reverse=True)
    sorted_grade_ids = [grade.Grade_ID for grade in sorted_grades]

  
    case_statement = case({grade_id: index for index, grade_id in enumerate(sorted_grade_ids)})

    all_grades = (
        Grade.query.
        filter(Grade.Grade_ID.in_(sorted_grade_ids), Grade.Student_ID == student_id, Grade.Type == "Τελικός").
        order_by(case_statement).
        all()
    )

    
    semester_class_grades = defaultdict(lambda: defaultdict(list))

    for grade in all_grades:
        clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
        grade_data = {
            'Κωδικός Μαθήματος': grade.Class_ID,
            'Βαθμός': grade.Grade,
            'Όνομα': clas.Name if clas else None
        }
        semester_class_grades[grade.Semester][grade.Class_ID].append(grade_data)

    
    excel_data = {'Εξάμηνο': [], 'Κωδικός Μαθήματος': [], 'Βαθμός': [], 'Όνομα': []}

    for semester, class_grades in semester_class_grades.items():
        for class_id, grades in class_grades.items():
            for grade_data in grades:
                excel_data['Εξάμηνο'].append(semester)
                excel_data['Κωδικός Μαθήματος'].append(grade_data['Κωδικός Μαθήματος'])
                excel_data['Βαθμός'].append(grade_data['Βαθμός'])
                excel_data['Όνομα'].append(grade_data['Όνομα'])


    df = pd.DataFrame(excel_data)

 
    excel_buffer = pd.ExcelWriter('grades_output.xlsx', engine='xlsxwriter')
    df.to_excel(excel_buffer, sheet_name='Sheet1', index=False)
    excel_buffer.close()

   
    return send_file('grades_output.xlsx', as_attachment=True)

@app.route('/get_all_grades/<Student_ID>' , methods=['POST'])
def get_all_grades_stud(Student_ID):
    student_id = Student_ID
    grades = Grade.query.filter_by(Student_ID=student_id, Type="Τελικός").filter(Grade.Grade >= 5).order_by(desc(Grade.Grade_ID)).all()

    if grades:
        output = []
        for grade in grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': clas.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None  
            }

            output.append(grade_data)

        return jsonify({'grades': output})
    else:
        return jsonify({'grades': []})


#tested gyrnaei piso ena mathima correct
@app.route('/get_one_class', methods=['POST'])
def get_one_class():
    data = request.json
    print(data)

    clas = Clas.query.filter_by(Class_ID=data['Class_ID']).first()

    def handle_null(value):
        return value if value is not None else '-'

    
    prereq_name = Clas.query.filter_by(Class_ID=clas.Prereq).first()

    output = []
    clas_data = {}
    clas_data['Class_ID'] = clas.Class_ID
    clas_data['Name'] = handle_null(clas.Name)
    clas_data['Tutor_ID'] = handle_null(clas.Tutor_ID)
    clas_data['Semester'] = handle_null(clas.Semester)
    clas_data['Eidikeusi'] = handle_null(clas.Eidikeush)
    clas_data['Type'] = handle_null(clas.Type)
    clas_data['ECTS'] = handle_null(clas.ECTS)
    clas_data['PassValue'] = handle_null(clas.PassValue)
    clas_data['CalcForGrad'] = handle_null(clas.CalcForGrad)
    clas_data['Cognitive'] = handle_null(clas.CognitiveObj)
    clas_data['Lab'] = handle_null(clas.Lab)
    clas_data['Theory'] = handle_null(clas.Theory)
    clas_data['Kateythinsi'] = handle_null(clas.Kateythinsi)
    clas_data['WebPage'] = handle_null(clas.WebPage)
    if prereq_name:
        clas_data['Prereq'] = prereq_name.Class_ID
    else:
        clas_data['Prereq'] = '-'
    
    output.append(clas_data)

    if not output:
        return jsonify([])

    print(output)
    return jsonify({'class': output})


@app.route('/get_one_class_name', methods=['POST'])
def get_one_class_name():
    data = request.json
    print(data)

    clas = Clas.query.filter_by(Class_ID=data['Class_ID']).first()


    def handle_null(value):
        return value if value is not None else '-'

    prereq_name = Clas.query.filter_by(Class_ID=clas.Prereq).first()

    output = []
    clas_data = {}
    clas_data['Name'] = handle_null(clas.Name)
    output.append(clas_data)

    if not output:
        return jsonify([])

    print(output)
    return jsonify({'class': output})    

@app.route('/get_semester_for_class', methods=['POST'])
def get_semester():
    data = request.json
    class_id = data['Clas_ID'] 
    if class_id is None:
        return jsonify({'error': 'Class ID not provided'}), 400 

    classes = Clas.query.filter_by(Class_ID=class_id).distinct(Clas.Semester).all()

    output = [{'Semester': clas.Semester} for clas in classes]

    if not output:
        return jsonify({'error': 'No data found for the provided Class ID'}), 404  # Not Found status code

    return jsonify({'clas': output})



@app.route('/get_students_enrolled_class/',methods= ['POST'])
def get_students_enrolled_class():
    data = request.json
    enroled = Enrolled.query.filter_by(Class_ID=data['Class_ID']).first()
    if enroled:
        output = []
        enroled_data = {}
        enroled_data['User_ID'] = enroled.User_ID
        enroled_data['First_Name'] = enroled.First_Name
        enroled_data['Last_Name'] = enroled.Last_Name
        output.append(enroled_data)
        return jsonify({'enroled_data' : output})
    
@app.route('/get_students_grade',methods= ['POST'])
def get_students_grade():
    data = request.json
    enroled = Enrolled.query.filter_by(Class_ID=data['Class_ID']).first()
    if enroled:
        output = []
        enroled_data = {}
        enroled_data['User_ID'] = enroled.User_ID
        enroled_data['First_Name'] = enroled.First_Name
        enroled_data['Last_Name'] = enroled.Last_Name
        output.append(enroled_data)
        return jsonify({'enroled_data' : output})
    

@app.route('/get_3grades', methods=['POST'])
def get_3grades():
    data = request.json
   
    grades = Grade.query.filter_by(Student_ID=data['STUDENT_ID'], Type="Τελικός", Semester='Χειμερινό Εξάμηνο 2023').order_by(desc(Grade.Grade_ID)).limit(3).all()

    if grades:
        output = []
        for grade in grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
            
            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': grade.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None  
            }

            output.append(grade_data)

        return jsonify({'grades': output})
    else:
        return jsonify({'grades': []})

    

@app.route('/get_all_grades', methods=['POST'])
def get_all_grades():
    data = request.json
    
    grades = Grade.query.filter_by(Student_ID=data['STUDENT_ID'], Type="Τελικός").order_by(desc(Grade.Grade_ID)).all()

    if grades:
        output = []
        for grade in grades:
        
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()

            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': grade.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None 
            }

            output.append(grade_data)

        return jsonify({'grades': output})
    else:
        return jsonify({'grades': []})
    


@app.route('/create_certificate/<User_ID>/<copies>', methods=['POST'])
def create_certificate(User_ID, copies):
    data = request.json
    certificate_type = data['Type']
    status = "Διαθέσιμο"
    current_date_time = datetime.now()
    date = current_date_time.strftime('%Y-%m-%d %H:%M:%S')

    for _ in range(int(copies)):
        certificate = Certificate(Type=certificate_type, Date=date, Download="Yes", User_ID=User_ID, Status=status)
        db.session.add(certificate)

    db.session.commit()
    return jsonify({'message': f'Τα {copies} πιστοποιητικά δημιουργήθηκαν'})


@app.route('/get_certificates', methods=['POST'])
def get_certificates():
    data = request.json
    certificates = Certificate.query.filter_by(User_ID=data['User_ID']).all()

    if certificates:
        certificate_list = [
            {
                'Type': certificate.Type,
                'Date': certificate.Date.strftime('%Y-%m-%d %H:%M:%S'),
                'Download': certificate.Download,
                'Status': certificate.Status
            }
            for certificate in certificates
        ]
        return jsonify({'certificates': certificate_list})
    else:
        return jsonify({'message': 'Δεν υπάρχουν πιστοποιητικά για τον χρήστη με ID ' + str(data['User_ID'])}), 404



@app.route('/per_semester', methods=['POST'])
def per_semester():
    data = request.json
    student_id = data.get('Student_ID')

    if not student_id:
        return jsonify({'error': 'Student ID is required'}), 400

    all_grades = Grade.query.filter(
    Grade.Student_ID == student_id,
    Grade.Type == "Τελικός"
    ).all()

    sorted_grades = sorted(all_grades, key=lambda x: custom_sort_key(x.Semester), reverse=True)


    sorted_grade_ids = [grade.Grade_ID for grade in sorted_grades]
    for sort in sorted_grade_ids:
        print("this is",sort)
    case_statement = case({grade_id: index for index, grade_id in enumerate(sorted_grade_ids)})


    all_grades = (
    Grade.query.
    filter(Grade.Grade_ID.in_(sorted_grade_ids), Grade.Student_ID == student_id, Grade.Type == "Τελικός").
    order_by(func.field(Grade.Grade_ID, *sorted_grade_ids)).  
    all()
)

    print(all_grades)

    
    if all_grades:
       
        semester_grades = defaultdict(list)

        for grade in all_grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': grade.Semester,
                "Sem": clas.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None
            }

            semester_grades[grade.Semester].append(grade_data)

        
        semester_data = []

        for semester, grades in semester_grades.items():
            semester_info = {
                'Semester': semester,
                'num_classes': len(grades),
                'all_grades': grades,
            }

            semester_data.append(semester_info)

        result = {
            'semesters': semester_data,
        }

        return jsonify(result)
    else:
        return jsonify({'error': 'No grades found for the student'}), 404


@app.route('/average_per_semester', methods=['POST'])
def get_average(student_id=0):
    data = request.json
    if data and  student_id == 0:
        student_id = data['Student_ID']
    if not student_id:
        return jsonify({'error': 'Student ID is required'}), 400

    all_grades = Grade.query.filter(
    Grade.Student_ID == student_id,
    Grade.Type == "Τελικός"
    ).all()

    sorted_grades = sorted(all_grades, key=lambda x: custom_sort_key(x.Semester), reverse=True)


    sorted_grade_ids = [grade.Grade_ID for grade in sorted_grades]
    for sort in sorted_grade_ids:
        print("this is",sort)
  
    case_statement = case({grade_id: index for index, grade_id in enumerate(sorted_grade_ids)})

    all_grades = (
    Grade.query.
    filter(Grade.Grade_ID.in_(sorted_grade_ids), Grade.Student_ID == student_id, Grade.Type == "Τελικός").
    order_by(func.field(Grade.Grade_ID, *sorted_grade_ids)).  
    all()
)

    print(all_grades)

    if all_grades:
        semester_grades = defaultdict(list)

        for grade in all_grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()
            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': grade.Semester,
                "Sem": clas.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None
            }

            semester_grades[grade.Semester].append(grade_data)


        semester_data = []

        for semester, grades in semester_grades.items():
            num_passed_classes = len([g for g in grades if g['Grade'] >= 5])
            average_grade = sum(g['Grade'] for g in grades if g['Grade'] >= 5) / num_passed_classes if num_passed_classes > 0 else 0

            semester_info = {
                'Semester': semester,
                'num_classes': len(grades),
                'average_passed_grade': average_grade,
                'all_grades': grades,
            }

            semester_data.append(semester_info)

        total_ects = sum(clas.ECTS for clas in (Clas.query.filter_by(Class_ID=grade.Class_ID).first() for grade in all_grades) if clas)


        result = {
            'total_ects': total_ects,
            'semesters': semester_data,
        }

        return jsonify(result)
    else:
        result = {
            'total_ects': 0,
            'semesters': []
        }
        return jsonify(result)

@app.route('/progress', methods=['POST'])
def get_student_progress():
    data = request.json
    student_id = data['Student_ID']

    if not student_id:
        return jsonify({'error': 'Student ID is required'}), 400

    passed_grades = Grade.query.filter(
        Grade.Student_ID == student_id,
        Grade.Type == "Τελικός",
        Grade.Grade >= 5
    ).order_by(desc(Grade.Grade_ID)).all()

 
    if passed_grades:
        processed_grades = []
        for grade in passed_grades:
            clas = Clas.query.filter_by(Class_ID=grade.Class_ID).first()

            grade_data = {
                'Student_ID': grade.Student_ID,
                'Class_ID': grade.Class_ID,
                'Enrolled_ID': grade.Enrolled_ID,
                'Grade': grade.Grade,
                'Semester': grade.Semester,
                'Type': grade.Type,
                'Name': clas.Name if clas else None  
            }

            processed_grades.append(grade_data)

        
        num_passed_classes = len(set(grade.Class_ID for grade in passed_grades))
        total_grades = sum(grade.Grade for grade in passed_grades)
        average_grade = total_grades / len(passed_grades) if len(passed_grades) > 0 else 0

        total_ects = sum(clas.ECTS for clas in (Clas.query.filter_by(Class_ID=grade.Class_ID).first() for grade in passed_grades) if clas)

        
        result = {
            'num_passed_classes': num_passed_classes,
            'average_grade': average_grade,
            'total_ects': total_ects
        }

        return jsonify(result)
    else:
        result = {
            'num_passed_classes': 0,
            'average_grade': 0,
            'total_ects': 0
        }
        return jsonify(result)







@app.route('/search', methods=['POST'])
def search():
    data = request.json
    print(data)
    clas = Clas.query.filter_by(Name=data['searchTerm']).first()
    print(clas)
    output = []
    clas_data = {}
    clas_data['Class_ID'] = clas.Class_ID
    clas_data['Name'] = clas.Name
    clas_data['Tutor_ID'] = clas.Tutor_ID
    clas_data['Semester'] =clas.Semester
    clas_data['Type'] =clas.Type
    clas_data['ECTS'] =clas.ECTS
    clas_data['PassValue'] =clas.PassValue
    clas_data['CalcForGrad'] =clas.CalcForGrad
    clas_data['CognitiveObj'] =clas.CognitiveObj
    clas_data['Lab'] =clas.Lab
    clas_data['WebPage'] =clas.WebPage
    clas_data['Eidikeush'] =clas.Eidikeush
    clas_data['Prereq'] =clas.Prereq
    output.append(clas_data)
    print(clas_data)
    return jsonify({'class': output})




@app.route('/get_mandatory',methods=['POST'])
def get_mandatory():
    data= request.json
    classes = Clas.query.filter((Clas.Type == "Υποχρεωτικό") | (Clas.Type == "Γενικής Παιδείας"),Clas.Semester==data['Semester']).all()

    output = []
    for clas in classes:
        clas_data = {}
        clas_data['Class_ID'] = clas.Class_ID
        clas_data['Name'] = clas.Name
        clas_data['Tutor_ID'] = clas.Tutor_ID
        clas_data['Semester'] =clas.Semester
        clas_data['Type'] =clas.Type
        clas_data['ECTS'] =clas.ECTS
        clas_data['PassValue'] =clas.PassValue
        clas_data['CalcForGrad'] =clas.CalcForGrad
        clas_data['CognitiveObj'] =clas.CognitiveObj
        clas_data['Lab'] =clas.Lab
        clas_data['WebPage'] =clas.WebPage
        clas_data['Eidikeush'] =clas.Eidikeush
        clas_data['Prereq'] =clas.Prereq
        output.append(clas_data)
        
    
    if not output:
        return jsonify([])
    
    return jsonify({'class': output})


@app.route('/get_lab',methods=['POST'])
def get_lab():
    data= request.json
    print("yyyy")
    classes = Clas.query.filter((Clas.Type == "Αυτοτελές Προαιρετικό Εργαστήριο"),Clas.Semester==data['Semester']).all()
    output = []
    for clas in classes:
        clas_data = {}
        clas_data['Class_ID'] = clas.Class_ID
        clas_data['Name'] = clas.Name
        clas_data['Tutor_ID'] = clas.Tutor_ID
        clas_data['Semester'] =clas.Semester
        clas_data['Type'] =clas.Type
        clas_data['ECTS'] =clas.ECTS
        clas_data['PassValue'] =clas.PassValue
        clas_data['CalcForGrad'] =clas.CalcForGrad
        clas_data['CognitiveObj'] =clas.CognitiveObj
        clas_data['Lab'] =clas.Lab
        clas_data['WebPage'] =clas.WebPage
        clas_data['Eidikeush'] =clas.Eidikeush
        clas_data['Prereq'] =clas.Prereq
        output.append(clas_data)
        
    if not output:
        print("swstaa")
        return jsonify([])
    
    return jsonify({'class': output})


@app.route('/get_eidikeush_class', methods=['POST'])
def get_eidikeush_class():
    data = request.json
    subjects = data.get('subjects', [])  
    print("tiii",subjects)
    output = {}
    for subject in subjects:
        classes = Clas.query.filter(
            (Clas.Type == "Βασικό") &
            (Clas.Eidikeush == subject) &
            (Clas.Semester == data.get('semester'))
        ).all()

        subject_data = []
        for clas in classes:
            clas_data = {
                'Class_ID': clas.Class_ID,
                'Name': clas.Name,
                'Tutor_ID': clas.Tutor_ID,
                'Semester': clas.Semester,
                'Type': clas.Type,
                'ECTS': clas.ECTS,
                'PassValue': clas.PassValue,
                'CalcForGrad': clas.CalcForGrad,
                'CognitiveObj': clas.CognitiveObj,
                'Lab': clas.Lab,
                'WebPage': clas.WebPage,
                'Eidikeush': clas.Eidikeush,
                'Prereq': clas.Prereq
            }
            subject_data.append(clas_data)

        output[subject] = subject_data
        
    if not output:
        return jsonify({})
    return jsonify({'classes': output})





@app.route('/get_prakt_ptyx_proj',methods=['POST'])
def get_prakt_proj():
    data = request.json
    types = data.get('Type', [])
    result = {}
    print(types)
    for type in types:
        classes = Clas.query.filter((Clas.Type == type) & (Clas.Semester == data.get('semester'))).all()
        output = []
        for clas in classes:
            clas_data = {
                'Class_ID': clas.Class_ID,
                'Name': clas.Name,
                'Tutor_ID': clas.Tutor_ID,
                'Semester': clas.Semester,
                'Type': clas.Type,
                'ECTS': clas.ECTS,
                'PassValue': clas.PassValue,
                'CalcForGrad': clas.CalcForGrad,
                'CognitiveObj': clas.CognitiveObj,
                'Lab': clas.Lab,
                'WebPage': clas.WebPage,
                'Eidikeush': clas.Eidikeush,
                'Prereq': clas.Prereq
            }
            output.append(clas_data)
        
        result[type] = output
    print(result)
    if not result:
        print("swstaa")
    
        return jsonify([])

    return jsonify({'class': result})

@app.route('/get_kat',methods=['POST'])
def get_kat():
    data = request.json
    types = data.get('Type', [])
    result = {}
    print(types)
    for type in types:
        classes = Clas.query.filter((Clas.Kateythinsi == type) & (Clas.Semester == data.get('semester'))).all()
        output = []
        for clas in classes:
            clas_data = {
                'Class_ID': clas.Class_ID,
                'Name': clas.Name,
                'Tutor_ID': clas.Tutor_ID,
                'Semester': clas.Semester,
                'Type': clas.Type,
                'ECTS': clas.ECTS,
                'PassValue': clas.PassValue,
                'CalcForGrad': clas.CalcForGrad,
                'CognitiveObj': clas.CognitiveObj,
                'Lab': clas.Lab,
                'WebPage': clas.WebPage,
                'Eidikeush': clas.Eidikeush,
                'Prereq': clas.Prereq
            }
            output.append(clas_data)
        
        result[type] = output
    print(result)
    if not result:
        print("swstaa")
       
        return jsonify([])

    return jsonify({'class': result})


@app.route('/get_mand',methods=['POST'])
def get_mand():
    data = request.json
    print(data)
    types = data.get('Kat', [])
    result = {}
    print(types)
    for type in types:
        classes1 = Clas.query.filter((Clas.Type == "Κατ' Επιλογήν Υποχρεωτικό")&(Clas.Kateythinsi == type)& (Clas.Semester == data.get('semester'))).all()
        print("this",classes1)
        classes = Clas.query.filter((Clas.Type == "Κατ' Επιλογήν Υποχρεωτικό") &(Clas.Kateythinsi == type) & (Clas.Semester == data.get('semester'))).all()
        output = []
        for clas in classes:
            clas_data = {
                'Class_ID': clas.Class_ID,
                'Name': clas.Name,
                'Tutor_ID': clas.Tutor_ID,
                'Semester': clas.Semester,
                'Type': clas.Type,
                'ECTS': clas.ECTS,
                'PassValue': clas.PassValue,
                'CalcForGrad': clas.CalcForGrad,
                'CognitiveObj': clas.CognitiveObj,
                'Lab': clas.Lab,
                'WebPage': clas.WebPage,
                'Eidikeush': clas.Eidikeush,
                'Prereq': clas.Prereq
            }
            output.append(clas_data)
        
        result[type] = output
    print(result)
    if not result:
        print("swstaa")
      
        return jsonify([])
    print("auto",result)
    return jsonify({'class': result})


    
@app.route('/get_all_classes', methods=['POST'])
def get_all_classes():
    classes = Clas.query.all()

    output = []
    for clas in classes:
        clas_data = {}
        clas_data['Class_ID'] = clas.Class_ID
        clas_data['Name'] = clas.Name
        clas_data['Tutor_ID'] = clas.Tutor_ID
        clas_data['Semester'] =clas.Semester
        clas_data['Type'] =clas.Type
        clas_data['ECTS'] =clas.ECTS
        clas_data['PassValue'] =clas.PassValue
        clas_data['CalcForGrad'] =clas.CalcForGrad
        clas_data['CognitiveObj'] =clas.CognitiveObj
        clas_data['Lab'] =clas.Lab
        clas_data['WebPage'] =clas.WebPage
        clas_data['Eidikeush'] =clas.Eidikeush
        clas_data['Prereq'] =clas.Prereq
        output.append(clas_data)

    return jsonify({'class' : output})

@app.route('/check_final_grades/<class_id>', methods=['POST'])
def check_final_grades(class_id):
    data = request.json
    semester = data['Semester']
    class_grades = Grade.query.filter_by(Class_ID=class_id, Semester=semester).all()
    if class_grades:
        all_final = all(grade.IsFinal == 1 for grade in class_grades)
    else:
        all_final = False

    
    enrolled_alias = alias(Enrolled)
    enrolled_without_grades = Enrolled.query.filter(
        Enrolled.Class_ID == class_id,
        Enrolled.Semester == semester,
        ~exists().where(and_(
            Grade.Class_ID == class_id,
            Grade.Semester == semester,
            Grade.Student_ID == Enrolled.Student_ID
        ))
    ).all()

   
    grades_remain = len(enrolled_without_grades) > 0


    all_checks = all_final and not grades_remain

    response_data = {"all_final": all_final, "all_checks": all_checks, "grades_remain": grades_remain}
    return jsonify(response_data)


@app.route('/make_temp_enrol/<Student_ID>', methods=['POST'])
def make_temp_enrol(Student_ID):
    data = request.get_json()
    
    class_ids = data.get('class_ids', [])
    Semester = data.get('Semester')
    class_ids_without_dash = [class_id.split('-')[0] for class_id in class_ids]

    existing_enrollments = Enrolled.query.filter_by(Student_ID=Student_ID, Semester=Semester).all()
    for enrollment in existing_enrollments:
        db.session.delete(enrollment)

    selected_classes = Clas.query.filter(Clas.Class_ID.in_(class_ids_without_dash)).all()
    enrolled_classes = []
    for class_obj in selected_classes:
        enrolled_class = Enrolled(Enrolled_ID=str(uuid.uuid4()), Student_ID=Student_ID, Semester=Semester, Class_ID=class_obj.Class_ID, IsFinal=0)
        enrolled_classes.append(enrolled_class)
        db.session.add(enrolled_class)

    db.session.commit()

    return jsonify({'enrolled_classes': [c.Enrolled_ID for c in enrolled_classes]}), 200



@app.route('/is_final/<Student_ID>', methods=['POST'])
def is_final(Student_ID):
    data = request.get_json()
    Semester = data.get('Semester')
    isFinal = Enrolled.query.filter_by(Student_ID=Student_ID, Semester=Semester,IsFinal=1).all()
    if isFinal:
        return jsonify({'isFinal': True})
    else: 
        return jsonify({'isFinal': False})

@app.route('/make_final_enrol/<Student_ID>', methods=['POST'])
def make_final_enrol(Student_ID):
    data = request.get_json()
    
    class_ids = data.get('class_ids', [])
    Semester = data.get('Semester')
    class_ids_without_dash = [class_id.split('-')[0] for class_id in class_ids]

    existing_enrollments = Enrolled.query.filter_by(Student_ID=Student_ID, Semester=Semester).all()
    for enrollment in existing_enrollments:
        db.session.delete(enrollment)

    selected_classes = Clas.query.filter(Clas.Class_ID.in_(class_ids_without_dash)).all()
    enrolled_classes = []
    for class_obj in selected_classes:
        enrolled_class = Enrolled(Enrolled_ID=str(uuid.uuid4()), Student_ID=Student_ID, Semester=Semester, Class_ID=class_obj.Class_ID, IsFinal=1)
        enrolled_classes.append(enrolled_class)
        db.session.add(enrolled_class)

    db.session.commit()

    return jsonify({'enrolled_classes': [c.Enrolled_ID for c in enrolled_classes]}), 200


@app.route('/has_final/', methods=['POST'])
def has_final():
    data = request.json
    semester = data.get('Semester')
    user_id = data.get('User')

    if not semester or not user_id:
        return jsonify({'error': 'Semester and User ID are required.'}), 400

    enrol = Enrolled.query.filter_by(Semester=semester, Student_ID=user_id, IsFinal=1).first()

    if enrol:
        return jsonify({'has_final': True}), 200
    else:
        return jsonify({'has_final': False}), 200
    

@app.route('/has_temp/', methods=['POST'])
def has_temp():
    data = request.json
    semester = data.get('Semester')
    user_id = data.get('User')

    if not semester or not user_id:
        return jsonify({'error': 'Semester and User ID are required.'}), 400

    enrol = Enrolled.query.filter_by(Semester=semester, Student_ID=user_id, IsFinal=0).first()

    if enrol:
        return jsonify({'has_temp': True}), 200
    else:
        return jsonify({'has_temp': False}), 200

@app.route('/can_enroll/<Student_ID>', methods=['POST'])
def can_enroll(Student_ID):

    user = User.query.filter_by(User_ID=Student_ID).first()

    if user:
        all_classes = Clas.query.all()
        results = []

        for class_instance in all_classes:
            prerequisite_class_id = class_instance.Prereq

            if not prerequisite_class_id:
        
                results.append({"Class_ID": class_instance.Class_ID, "can_enroll": True, "message": "No prerequisite for this class."})
            else:
     
                user_has_grade = Grade.query.filter_by(Student_ID=Student_ID, Class_ID=prerequisite_class_id, Type="Τελικός").first()

                if user_has_grade:
                    results.append({"Class_ID": class_instance.Class_ID, "can_enroll": True})
                else:
                    results.append({"Class_ID": class_instance.Class_ID, "can_enroll": False, "message": "User does not have a grade in the prerequisite class."})

        return jsonify(results)

    else:
        return jsonify({"error": "User not found."}), 404

@app.route('/has_passed/<Student_ID>', methods=['POST'])
def has_passed(Student_ID):
    user = User.query.filter_by(User_ID=Student_ID).first()

    if user:
        all_classes = Clas.query.all()
        results = []

        for class_instance in all_classes:
            grades = Grade.query.filter_by(Student_ID=Student_ID, Class_ID=class_instance.Class_ID, Type="Τελικός").all()

            can_enroll = any(grade.Grade >= 5 for grade in grades)

            result_entry = {
                "Class_ID": class_instance.Class_ID,
                "can_enroll": can_enroll
            }

            results.append(result_entry)

        return jsonify(results)

    else:
        return jsonify({"error": "User not found."}), 404


if __name__ == '__main__':
    create_tables_if_not_exist()
    app.run(debug=True)