$(".logout").click((event) => {
  event.preventDefault()
  localStorage.removeItem("userID","");
  localStorage.removeItem("token","");
  window.location.href = "/index.html"
  });

  
