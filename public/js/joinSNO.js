// instantiate countries with external file - countries.js
dropdownCountries = window.countries.map(countryData => {
  return `<option value="${countryData.key}">${countryData.name}</option>`;
});

$("#country-dropdown").append(dropdownCountries);

// saved code for later
// $(".sno-membership").submit((event) => {
//   event.preventDefault()
//   window.location.href = "/login.html"
// })


// capture values from joinSNO.html

$(".sno-membership").submit((event) => {
  const url = "/api/users/";
  event.preventDefault()

  // capture values for sign up variables
  var username = $("input[name=email]").val();
  var password = $("input[name=password]").val();
  var firstName = $("input[name=firstname]").val();
  var middleInitial = $("input[name=middleinitial]").val();
  var lastName = $("input[name=lastname]").val();

  // reminder to use memberChoice in backend to get membership fee
  // var memberChoice = [
  //   {type: "student_member",
  //   rate: "$30.00"}
  // ]

  var membershipChoice = $("input[name=membership-choice]").val();

  var memberType = $('.member-type option:selected').val();
  if (memberType === "other") {
    memberType = $("input[name=other-member-type]").val();
    // how can I make this invalid - maybe you were right
  }

  var street1 = $("input[name=street-1]").val();
  console.log(street1);
  var street2 = $("input[name=street-2]").val();
  console.log(street2);
  var city = $("input[name=city]").val();
  console.log(city);
  var stateProvDept = $("input[name=state-prov-dept]").val();
  console.log(stateProvDept);
  var postalCode = $("input[name=postal-code]").val();
  console.log(postalCode);
  var country = $('.country option:selected').val();
  console.log(country);


  
  const userDetails = {
    username,
    password,
    firstName,
    middleInitial,
    lastName,
    membershipChoice,
    memberType,
    street1,
    street2,
    city,
    stateProvDept,
    country
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
      console.log(error);
    }
  });


  })