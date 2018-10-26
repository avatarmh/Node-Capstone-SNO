$(document).ready(function () {
    const token = localStorage.getItem("token");
    const joinSNO = $("#joinSNO");
    const login = $("#login");
    const logout = $("#logout");
    if (token) {
        logout.removeClass("hide") 
    } else {
        joinSNO.removeClass("hide")
        login.removeClass("hide")
    }
})