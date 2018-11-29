'use strict';

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/index.html"
} 

$(document).ready(function() {
  const url = "api/users/"
  $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      },    
      success: (data) => {
        const results = generateMembersString(data);
        $('.members').html(results);
      },
      error: (error) => {
        console.log(error);
      }
    });


  function generateMember(member) {
    return `
        <div class='member-info'>
      <h2>${member.firstName} ${member.lastName}</h2>
       <p class='tight'>Affiliation: ${member.affiliation}</p>
       <p class='tight'>Position: ${member.position}</p>
       <p class='tight'>Research focus: ${member.researchFocus}</p>
       <p></p>
      </div>`
}

    function generateMembersString(memberList) {
      // console.log(memberList)
      // sortByKey(memberList, lastName);
      const members = memberList.map(member=> generateMember(member));
      return members.join("");
    }
  
  
})