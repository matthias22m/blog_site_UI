document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var emailInput = document.getElementById("email");
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        emailValidationError.style.display = "block";
        return;
      }
      emailValidationError.style.display = "none";

      var formData = new FormData(loginForm);

      var jsonData = {};
      formData.forEach(function (value, key) {
        jsonData[key] = value;
      });
      console.log(jsonData);

      fetch("http://127.0.0.1:8000/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== null) {
            localStorage.setItem("token", data.access);
            window.location.href = "index.html";
          } else {
            console.error("Authentication failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });