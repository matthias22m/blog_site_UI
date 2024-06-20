document.addEventListener("DOMContentLoaded", function () {
    var token = localStorage.getItem("token");
    if (token!=null) {
        document.getElementById("login-link").style.display = "none";
        document.getElementById("signup-link").style.display = "none";
        document.getElementById("logout-link").style.display = "inline";
        document.getElementById("profile-link").style.display = "inline";
        document.getElementById("create-post-link").style.display = "inline";
    } else {
        document.getElementById("login-link").style.display = "inline";
        document.getElementById("signup-link").style.display = "inline";
        document.getElementById("logout-link").style.display = "none";
        document.getElementById("profile-link").style.display = "none";
        document.getElementById("create-post-link").style.display = "none";
    }
    var logoutButton = document.getElementById('logout-link');

        function logout() {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }

        if (logoutButton) {
            logoutButton.onclick = logout;
            }

  });
