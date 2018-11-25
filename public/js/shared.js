'use strict';

$(document).ready(function () {
    const token = localStorage.getItem("token");
    const joinSNO = $("#joinSNO");
    const news = $("#news");
    const directory = $("#directory");
    const login = $("#login");
    const logout = $("#logout");
    if (token) {
        news.removeClass("hide")
        directory.removeClass("hide")
        logout.removeClass("hide"); 
    } else {
        joinSNO.removeClass("hide");
        login.removeClass("hide");
    }
})

$(document).ready(function () {
    $(".logout").click((event) => {
      event.preventDefault()
      localStorage.removeItem("userID", "");
      localStorage.removeItem("token", "");
      window.location.href = "/index.html"
    });
  })