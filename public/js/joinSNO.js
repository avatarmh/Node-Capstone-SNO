dropdownCountries = window.countries.map(countryData => {
  return `<option value="${countryData.key}">${countryData.name}</option>`;
});

$("#country-dropdown").append(dropdownCountries);

$(".sno-membership").submit((event) => {
  event.preventDefault()
  window.location.href = "/login.html"
})