$(document).ready(function() {
  const url = "api/users/"
  console.log('in memberdirectory js')
  $.ajax({
      url,
      method: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
         const results = generateMembersString(data);
        $('.members').html(results);
      },
      error: (error) => {
        console.log(error);
      }
    });

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];

      if (typeof x == "string") {
        x = ("" + x).toLowerCase();
      }
      if (typeof y == "string") {
        y = ("" + y).toLowerCase();
      }

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  function generateMember(member) {
    return `
        <div class='member-info'>
      <h2>${member.firstName} ${member.lastName}</h2>
       <p>Affiliation: ${member.affiliation}</p>
       <p>Position: ${member.position}</p>
       <p>Research focus: ${member.researchFocus}</p>
      </div>`
}

    function generateMembersString(memberList) {
      // console.log(memberList)
      // sortByKey(memberList, lastName);
      const members = memberList.map(member=> generateMember(member));
      return members.join("");
    }
  
  
})