dropdownCountries = window.countries.map(countryData => {
  return `<option value="${countryData.key}">${countryData.name}</option>`;
});

$("#country-dropdown").append(dropdownCountries);

<input type="button" onclick="location.href='/login.html';" value="Go to Login" />
