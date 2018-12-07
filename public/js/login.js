'use strict';
$(document).on("click","#new-password",function() {
  alert("Coming soon!");
 });

$(document).ready(function() {
  // check if demo
  var username = $("input[name=email]");
  var password = $("input[name=password]");
  var searchParams = new URLSearchParams(window.location.search)
  let demo = searchParams.get('demo')

  if (demo) {
    username.val('demo@thinkful.com')
    password.val('1234567890')
    username.attr('disabled', true)
    password.attr('disabled', true)
    
  }

  // set up ajax request
  $(".login").submit((event) => {
    event.preventDefault()
    const url = "/api/auth/login";
    var username = $("input[name=email]").val();
    var password = $("input[name=password]").val();
    const userDetails = {
      username,
      password
    };
    $.ajax({
      url,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(userDetails),
      success: (data) => {
        console.log(data)
        localStorage.setItem ("token", data.authToken)
        localStorage.setItem ("userID", data.userID)
        window.location.href = "/member-news.html"
      },
      error: (error) => {
        console.log(error);
        alert("Unauthorized");
      }
    });
  
  })

})
