window.onload = function(){

    var user = JSON.parse(localStorage.getItem('login-details'));
    console.log(user)

    // if(user && user.user.role.type === 'authenticated'){
    //     window.location.href = './admin/admin-orders.html'
    // } 

    
    $(function(){

        let userEmail;
        let password;
    
        $("#username").change(function(){
            var email = $(this).val()
            userEmail = email
            console.log(userEmail)
        })
    
        $("#password").change(function(){
            var vendorPass = $(this).val()
            password = vendorPass
            console.log(password)
        })
    
        $("#login").submit(function(e){
            e.preventDefault();
            console.log("This")
    
            const bodyLogin = {
                identifier: userEmail,
                password: password
            }
            $.ajax({
                method: "POST",
                url: `http://localhost:1337/auth/local`,
                data: bodyLogin,
              }).done(function (user) {
                console.log("Data Saved: ");
                console.log(user);
    
                
                localStorage.setItem('login-details', JSON.stringify(user));
    
                if(user.user.role.name === 'Student'){
                    window.location.href = 'student-dashboard.html'
                } else if(user.user.role.name === 'Teacher'){
                    window.location.href = 'teacher-dashboard.html'
                } else if(user.user.role.name === 'Admin'){
                    window.location.href = `../admin-dashboard.html`
                }
                
                
              })
              .fail(function(xhr) {
                //Ajax request failed.
                var errorMessage = eval("(" + xhr.responseText + ")");
                $("#error").html(errorMessage.message)
                console.log('Error - ' + errorMessage.message);
          })
    
        })
    })
      
    }
