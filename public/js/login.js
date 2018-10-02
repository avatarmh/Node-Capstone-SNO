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
      window.location.href = "/member-news.html"
    },
    error: (error) => {
      console.log(error);
    }
  });

})