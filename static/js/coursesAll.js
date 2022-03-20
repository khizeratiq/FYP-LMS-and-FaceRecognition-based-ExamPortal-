var full_url = document.URL; // Get current url
var url_array = full_url.split('/') // Split the string into an array with / as separator
var last_segment = url_array[url_array.length-1];  // Get the last part of the array (-1)
var getUser = JSON.parse( localStorage.getItem('login-details'));
var id = last_segment.split('?')[last_segment.split('?').length-1]; 

$.ajax({
    method: "GET",
    headers: {
                Authorization:
                  `Bearer ${getUser.jwt}`,
              },
    url: `http://localhost:1337/courses/`
    
  }).done(function (msg) {

    console.log(msg);

    msg.map((el) =>{
        $(`#coursesAll`).append(
            `
            <div class="col-sm-6 col-md-4">
        <div class="course margin_top wow fadeIn" data-wow-delay="400ms">
          <div class="image bottom25">
            <img src="./assets/imgs/coursethumbnail1.jpg" alt="Course" class="border_radius">
          </div>
          <h3 class="bottom10"><a href="course_detail.html">${el.courseName}</a></h3>
          <p class="bottom20">${el.courseDetail.substring(0,120)}</p>
          <a class="btn_common yellow border_radius" href="course_detail.html?${el.id}" target="_blank">view details</a>
        </div>
      </div>
            `
        )

    })

  })