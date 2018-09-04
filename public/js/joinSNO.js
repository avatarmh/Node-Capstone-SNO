dropdownCountries = window.countries.map(countryData => {
  return `<option value="${countryData.key}">${countryData.name}</option>`;
});

$("#country-dropdown").append(dropdownCountries);

// $(".sno-membership").submit((event) => {
//   event.preventDefault()
//   window.location.href = "/login.html"
// })



$(".sno-membership").submit((event) => {
  const url = "/api/users/";
  event.preventDefault()
  var username = $("input[name=email]").val();
  var password = $("input[name=password]").val();
  var firstName = $("input[name=firstname]").val();
  var lastName = $("input[name=lastname]").val();
  
  const userDetails = {
    username,
    password,
    firstName,
    lastName
  };
  console.log(JSON.stringify(userDetails));
  $.ajax({
    url,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(userDetails),
    success: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error)
    }
  });

  })