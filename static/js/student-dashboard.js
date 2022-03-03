// function getData(){
//     $.get("http://localhost:1337/api/students",(data,status)=>{
//         console.log(data);
//     });
// }
var getUser = JSON.parse( localStorage.getItem('login-details'));
document.getElementById("student-name").innerHTML=getUser.user.username;
document.getElementById("student-user").innerHTML=getUser.user.email;
// document.getElementById("courses-enrolled").innerHTML=getUser.courses.length;

console.log(getUser);
$.ajax({
          method: "GET",
          headers: {
                      Authorization:
                        `Bearer ${getUser.jwt}`,
                    },
          url: `http://localhost:1337/users/${getUser.user.id}`
          
        }).done(function (msg) {
          var students ;
          students = msg
          console.log(msg.courses);
          
          $.ajax({    
            method: "GET",
            url: `http://localhost:1337/students?students_role.id=${getUser.user.id}`,
            dataType:"Json"
             
          }).done(function (Student) {
            console.log("Data Saved: ");
            console.log(Student);
            var student_courses = Student[0].courses
            console.log("Courses of Students ",student_courses);

            student_courses.map((el) => {
              $(`#student-table-details`).append(
                
                `
                <tr>
                <td>${el.id}</td>
                <td>${el.courseName}</td>
               <td> ${el.courseDetail.substring(0,40)} </td>
               
                <td>
                <a href="../course_detail.html?${el.id}" target="_blank">   <button class="admin-dashboard-button-2ndsec">
                  View Course Details
                    </button> </a> 
  
                </td>
            </tr>
            `)
            })   

          })
          .fail(function(xhr) {
            //Ajax request failed.
            var errorMessage = eval("(" + xhr.responseText + ")");
            $("#error-signup").html(errorMessage.message)
            console.log('Error - ' + errorMessage.message);
            setTimeout(() => {
                window.alert("Invalid user creation"); 
            })
            
      })


            
          
          // $(`#student-user`).innerHtml(`${user.username}`)
                    
        })


        