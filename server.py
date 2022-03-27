from asyncore import read
from flask import Flask, render_template
import subprocess
from subprocess import *
import os,sys,signal
import atexit
import hello
app = Flask(__name__)

@app.route('/')
def index():  #index ki jaga pehly ajax tha
  return render_template('index.html')

@app.route('/student-dashboard')
def studentDashboard():  
  return render_template('student-dashboard.html')

@app.route('/teacher-dashboard')
def teacherDashboard():  
  return render_template('teacher-dashboard.html')

@app.route('/admin-dashboard')
def adminDashboard():  
  return render_template('admin-dashboard.html')  

@app.route('/newdashboard')
def newdashboard():  
  return render_template('newdashboard.html')  

@app.route('/attempt-exam')
def attemptExam():  
  return render_template('attempt-exam.html')

@app.route('/organization-registration')
def organizationRegistration():  
  return render_template('organization-registration.html')

# @app.route('/register-student')
# def registerStudent():  
#   return render_template('register-student.html')

@app.route('/newregisterstudent')
def newregisterstudent():  
  return render_template('newregisterstudent.html')

# @app.route('/register-teacher')
# def registerTeacher():  
#   return render_template('register-teacher.html')

@app.route('/newregisterteacher')
def newregisterteacher():  
  return render_template('newregisterteacher.html')

@app.route('/courses')
def courses():  
  return render_template('courses.html')

@app.route('/course_detail')
def course_detail():  
  return render_template('course_detail.html')

@app.route('/login')
def login():  
  return render_template('login.html')

@app.route('/signup')
def signup():  
  return render_template('signup.html')

@app.route('/SomeFunction')
def SomeFunction():
    print('In SomeFunction')
    os.system('python C:\\Users\\khize\\Desktop\\CognED\\FYP\\FlaskApp\\AttendanceProject.py')
    
    return "Nothing"

@app.route('/ExitFunction')
def ExitFunction():
    print('In ExitFunction')
    pid = os.getpid()
    print(pid)
    os.kill(pid,1)
    # if pid :
    #   os.kill(pid, signal.SIGSTOP)
    #   info = os.waitpid(pid, os.WSTOPPED)
    #   stopSignal = os.WSTOPSIG(info[1])
    #   os.kill(pid, signal.SIGCONT)
    # else :
    #   print(pid)
    return "nothing"

if __name__ == '__main__':
  app.run(debug=True,port=5001)