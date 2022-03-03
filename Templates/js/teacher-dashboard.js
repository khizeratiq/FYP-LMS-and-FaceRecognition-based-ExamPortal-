// function getData(){
//     $.get("http://localhost:1337/api/students",(data,status)=>{
//         console.log(data);
//     });
// }
var getUser = JSON.parse( localStorage.getItem('login-details'));
document.getElementById("teacher-name").innerHTML=getUser.user.username;
document.getElementById("teacher-user").innerHTML=getUser.user.email;
console.log(getUser);
$.ajax({
          method: "GET",
          headers: {
                      Authorization:
                        `Bearer ${getUser.jwt}`,
                    },
          url: `http://localhost:1337/users/${getUser.user.id}`
          
        }).done(function (msg) {
          var students , teacher;
          students = msg
          console.log(msg);
     
            $.ajax({
              method: "GET",
              url: `http://localhost:1337/courses?course_teacher.teacherName=${msg.username}`
              
            }).done((data) => {console.log("courses" ,data)
              
            data.map((el) => {
              $(`#teacher-dashboard-table`).append(
                
                `
                <tr>
                <td>${el.id}</td>
                <td>${el.courseName}</td>
                <td>${el.courseDetail.substring(0,40)}</td>
                  

                <td>
                <a href="../course_detail.html?${el.id}" target="_blank">   <button class="admin-dashboard-button-2ndsec">
                View Course Details
                  </button> </a> 
  
                </td>
            </tr>
            `)
            })
              }
              )
           
         
                    
        })


        