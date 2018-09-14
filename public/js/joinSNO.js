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

  var membershipChoice = $("input[name=membership-choice]:checked").val();
  console.log(membershipChoice)

  var memberType = $('.member-type option:selected').val();
  if (memberType === "other") {
    memberType = $("input[name=other-member-type]").val();
    // how can I require if "other" - maybe you were right
    // if (memberType === null) {
    // ? or can I put a condition required in the html
  }
  // address inputs
  var street1 = $("input[name=street-1]").val();
  var street2 = $("input[name=street-2]").val();
  var city = $("input[name=city]").val();
  var stateProvDept = $("input[name=state-prov-dept]").val();
  var postalCode = $("input[name=postal-code]").val();
  var country = $('.country option:selected').val();

  // other contact inputs
  var phone = $("input[name=phone]").val();
  var altEmail = $("input[name=alt-email]").val();
  var fax = $("input[name=fax]").val();

  // optional gender input
  var gender = $("input[name=gender]:checked").val();
  console.log(gender)
  
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
    postalCode,
    country,
    phone,
    altEmail,
    fax,
    gender
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