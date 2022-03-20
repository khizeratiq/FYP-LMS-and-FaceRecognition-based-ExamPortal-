$(function(){
    var user = JSON.parse(localStorage.getItem('login-details'));
    console.log(user)
    if(user){
        $('.logout').show()
        $('.login').hide()
    }
    else{
        $('.logout').hide();
        $('.login').show()
    }
    $(".logout-btn").click(function(){localStorage.removeItem('login-details');
    window.location.href="../login";

    
})

$(".dashboard-btn").click(function(){

    if(user.user.role.name === 'Student'){
        window.location.href = '../student-dashboard'
    } else if(user.user.role.name === 'Teacher'){
        window.location.href = '../teacher-dashboard'
    } else if(user.user.role.name === 'AdminOrgs'){
        window.location.href = `../admin-dashboard`
    } else{
        window.location.href=`../login`
    }
    
    

})
}) 