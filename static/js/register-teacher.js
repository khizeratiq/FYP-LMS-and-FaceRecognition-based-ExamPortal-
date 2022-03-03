window.onload = function(){

    var user = JSON.parse(localStorage.getItem('login-details'));
    console.log(user)

    // if(user && user.user.role.type === 'authenticated'){
    //     window.location.href = './admin/admin-orders.html'
    // } 

    
     
    $(function(){

        // let username;
        // let email;
        // let registration;
        // let gender;
        // let password;
        // let confirmpassword;
        
        $("#register-teacher").submit(function(e){
            e.preventDefault();
            console.log("This")
            
            var userName = $("#teacher-name").val();
            // var Registration = $("#teacher-regNo").val();
            var Email = $("#teacher-email").val();
  
            var radio = $("input[name=gender]:checked").val();
            var passWord = $("#teacher-password").val();
            var confirmPassword = $("#teacher-confirmpassword").val()  ;

            
           
            if(passWord != confirmPassword){
                console.log(passWord)
                console.log(confirmPassword)
                alert("password doesnt match")
                return false;
            }
            // if (userName == "") {
            //     alert("Name must be filled out");
            //     return false;
            //   }
            function getNumber() {
              var minNumber = 1; // The minimum number you want
              var maxNumber = 3000; // The maximum number you want
              var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // Generates random number
              
              return randomnumber; // Returns false just to tidy everything up
          }
            const data1 = {
                email: Email,
             
                username: userName,
                password:passWord,
                confirmpassword:confirmPassword,
                registrationNumber:getNumber(),
                blocked:false,
                gender: radio,
                role:"Teacher",
            confirmed: true
            }

                
           
       
        
            console.log(data1)
    
            $.ajax({    
                method: "POST",
                url: `http://localhost:1337/auth/local/register`,
                dataType:"Json",
                data: data1,
              }).done(function (user) {
                console.log("Data Saved: ");
                console.log(user);
                // window.location.href="./login.html"; 
                // setTimeout(() => {
                //     window.location.href="../index.html"; 
                // }, 2000);
                
                localStorage.setItem('login-details', JSON.stringify(user));
              
                $.ajax({    
                    method: "POST",
                    url: `http://localhost:1337/teachers`,
                    dataType:"Json",
                    data: {teacherName:user.user.username,teacher_role:user.user.id,teacherEmail:user.user.email},
                  }).done(function (Teacher) {
                    console.log("Data Saved: ");
                    console.log(Teacher);
                    window.location.href="../admin-dashboard.html";
                    
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
      
          })
      })
  }
// ROLES

// {
//     "roles": [
//         {
//             "id": 5,
//             "name": "Admin",
//             "description": "Admin can see teacher and students",
//             "type": "admin",
//             "created_by": null,
//             "updated_by": null,
//             "nb_users": 0
//         },
//         {
//             "id": 1,
//             "name": "Authenticated",
//             "description": "Default role given to authenticated user.",
//             "type": "authenticated",
//             "created_by": null,
//             "updated_by": null,
//             "nb_users": 0
//         },
//         {
//             "id": 2,
//             "name": "Public",
//             "description": "Default role given to unauthenticated user.",
//             "type": "public",
//             "created_by": null,
//             "updated_by": null,
//             "nb_users": 0
//         },
//         {
//             "id": 3,
//             "name": "Student",
//             "description": "Student can see their courses",
//             "type": "student",
//             "created_by": null,
//             "updated_by": null,
//             "nb_users": 2
//         },
//         {
//             "id": 4,
//             "name": "Teacher",
//             "description": "Teacher can see students and courses",
//             "type": "teacher",
//             "created_by": null,
//             "updated_by": null,
//             "nb_users": 1
//         }
//     ]
// }