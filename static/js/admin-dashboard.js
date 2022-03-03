var getUser = JSON.parse(localStorage.getItem('login-details'));
document.getElementById("admin-name").innerHTML = getUser.user.username;
document.getElementById("admin-user").innerHTML = getUser.user.email;

$.ajax({
  method: "GET",
  headers: {
    Authorization:
      `Bearer ${getUser.jwt}`,
  },
  url: `http://localhost:1337/users/${getUser.user.id}`

}).done(function (msg) {

  //Teachers
  console.log("user logged in", msg);

  $.ajax({
    method: "GET",
    url: `http://localhost:1337/teachers`,
    dataType: "Json"

  }).done(function (teachers) {
    console.log("Data Saved for teachers: ");
    console.log(teachers);


    teachers.map((el) => {
      $(`#teacher-table`).append(

        `
          <tr>
          <td>${el.id}</td>
          <td>${el.teacherName}</td>
          <td>${el.teacherEmail}</td>
          <td>${el.teacher_role.registrationNumber}</td>
          <td>${el.teacher_role.gender}</td>
      
      </tr>
      `)
    })

  })





  //  For Students
  $.ajax({
    method: "GET",
    url: `http://localhost:1337/students`,
    dataType: "Json"

  }).done(function (Student) {
    console.log("Data Saved: ");
    console.log(Student);


    Student.map((el) => {
      $(`#student-table`).append(

        `
            <tr>
            <td>${el.id}</td>
            <td>${el.studentName}</td>
            <td>${el.students_role.email}</td>
            <td>${el.students_role.registrationNumber}</td>
            <td>${el.students_role.gender}</td>
    
        </tr>
        `)
    })

  })

})

// For Courses 
$.ajax({
  method: "GET",
  url: `http://localhost:1337/courses`,
  dataType: "Json"

}).done(function (Courses) {
  console.log("Data Saved For Courses: ");
  console.log(Courses);


  Courses.map((el) => {
    $(`#course-table`).append(

      `
      <tr>
      <td>${el.id}</td>
      <td>${el.courseName}</td>
      <td>${el.courseDetail.substring(0, 40)}</td>
     <td> <button class="admin-dashboard-button-adduser" data-id="${el.id}" data-students='${JSON.stringify(el.students)}' > Add Student </button> </td>

  </tr>
  `)
  })

  $(".admin-dashboard-button-adduser").click(function () {
    $('#student-select').children().remove()
    $('.ms-options > ul > li').each(function () {
    $(this).removeClass('selected')
    $('.ms-options > ul > li > label > input').prop("checked", false)
     
    });
    $('#ms-list-1 > button > span').empty()
  
    $("#myModal").modal('show');
    $("#student-select").attr('data-courseid', $(this).attr('data-id'))
    var studentbulao= JSON.parse($(this).attr('data-students'))
    console.log(studentbulao,"student bulaaye")
    // For students
    $.ajax({
      method: "GET",
      url: `http://localhost:1337/students`,
      dataType: "Json"

    }).done(function (Student) {
      console.log("Data Saved For Student: ");
      console.log(Student);

     
      for(var i=Student.length-1; i>=0; i--){
        for( var j=0; j<studentbulao.length; j++){
          if(Student[i] && (Student[i].id === studentbulao[j].id)){
            Student.splice(i, 1);
          }
      }
      }
      console.log(Student,"filtered array");
      Student.map((el) => {

        $("#student-select").append(
          ` <option value="${el.id}">${el.studentName}</option>`
        )


      })

      var ids = Student.map((el) => el.id)

      $('select[multiple]').each(function () {
        $('option', this).filter((_, e) => ids.includes(+e.value)).prop('selected', false);

        $(this).multiselect({
          texts: {
            placeholder: $(this).attr("title")
          }
        });
         
       
      });
      let d =  []
      $("#save-changes-for-modal").click(function () {
        // $('select[multiple]').each(function(){
        //   var a=$(this).filter(":selected").val()
        //   console.log(a, "selected Values")
        //   d.push($(this).filter(":selected").val())
        // })
        var options =$('select[multiple]').val()
       var courseId= $('select[multiple]').attr('data-courseid')
      
       $.ajax({
        method: "PUT",
        url: `http://localhost:1337/courses/${courseId}`,
        data: {
          students :options
        },
      }).done(function (user) {
        console.log(user, "Students posted : ");
        
        
        
      })
      .fail(function(xhr) {
        //Ajax request failed.
        var errorMessage = eval("(" + xhr.responseText + ")");
        $("#error").html(errorMessage.message)
        console.log('Error - ' + errorMessage.message);
  })
    
       console.log(options, "selected Values")
       console.log(courseId, "selected Values")
     })
 

    }).fail(function (xhr) {
      //Ajax request failed.
      var errorMessage = eval("(" + xhr.responseText + ")");
      $("#error-signup").html(errorMessage.message)
      console.log('Error - ' + errorMessage.message);
      setTimeout(() => {
        window.alert("Invalid user creation");
      })

    })

  });

}).fail(function (xhr) {
  //Ajax request failed.
  var errorMessage = eval("(" + xhr.responseText + ")");
  $("#error-signup").html(errorMessage.message)
  console.log('Error - ' + errorMessage.message);
  setTimeout(() => {
    window.alert("Invalid user creation");
  })

})


$(document).ready(function () {

});


    // $(`#student-user`).innerHtml(`${user.username}`)

