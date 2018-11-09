// instantiate countries with external file - countries.js
dropdownCountries = window.countries.map(countryData => {
  return `<option value="${countryData.key}">${countryData.name}</option>`;
});

$("#country-dropdown").append(dropdownCountries);


// capture input values from joinSNO.html

// enable "other-member-type" and "other-research-focus"
// when "other" option is selected from dropdown menus &
// require input into other-member-type and other-research-focus

$('.member-type-menu').change(function() {
  if ($(this).find('option:selected').val() === "other") {
    $('input[name=other-member-type]').prop('disabled', false);
    $('input[name=other-member-type]').prop('required',true);
  } else {
    $('input[name=other-member-type]').val("");
    $('input[name=other-member-type]').prop('disabled', true);
    $('input[name=other-member-type]').prop('required',false);
  }
})

$('.research-focus-menu').change(function() {
  console.log('logging')
  if ($(this).find('option:selected').val() === "other") {
    $('input[name=other-research-focus]').prop('disabled', false);
    $('input[name=other-research-focus]').prop('required',true);
  } else {
    $('input[name=other-research-focus]').val("")
    $('input[name=other-research-focus]').prop('disabled', true);
    $('input[name=other-research-focus]').prop('required',false);
  }
})

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

  const membershipChoice = $("input[name=membership-choice]:checked").val();
  let memberType = $('.member-type-menu option:selected').val();
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

  // affiliation, position, department/BU, focus, otherFoci, interests
  var affiliation = $("input[name=affiliation]").val();
  var position = $("input[name=position]").val();
  var deptUnit = $("input[name=dept-unit]").val();
  // var memberType = $('.member-type option:selected').val();
  var researchFocus = $('.research-focus-menu option:selected').val();
  if (researchFocus === "other") {
    researchFocus = $("input[name=other-research-focus]").val();
  }


  specificSNOInterest = [];
  const checkBoxes = $('.SNO-interest input[type="checkbox"]');
  const checked = $('.SNO-interest input[type="checkbox"]:checked');
  checked.each(function () {
    specificSNOInterest.push($(this).val());
  });
  const otherSNOInterest = $("input[name=other-sno-interest]").val();
  if (otherSNOInterest) {
    specificSNOInterest.push(otherSNOInterest);
  }
  
  if (!specificSNOInterest.length) {
    $("#sno-interest-error").text('Please select at least one of these options');
    return false;
  }
  
  
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
    gender,
    affiliation,
    position,
    deptUnit,
    researchFocus,
    specificSNOInterest
  };
  $.ajax({
    url,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify(userDetails),
    success: (data) => {
      window.location.href = "/login.html"
    },
    error: (error) => {
      console.log(error);
      alert(error.responseJSON.message)
    }
  });


  })