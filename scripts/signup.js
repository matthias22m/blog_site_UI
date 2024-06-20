document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); 

      var passwordInput = document.querySelector('input[name="password"]');
      var passwordRepeatInput = document.querySelector(
        'input[name="password-repeat"]'
      );

      var emailInput = document.getElementById("email");
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!emailRegex.test(emailInput.value)) {
        emailValidationError.style.display = "block";
        return;
      }
      emailValidationError.style.display = "none";
      if (passwordInput.value !== passwordRepeatInput.value) {
        passwordMismatchMessage.style.display = "block";
        passwordMismatchMessage.textContent = "Passwords do not match.";
        return;
      }

      passwordMismatchMessage.style.display = "none";
      var formData = new FormData(loginForm);

      var jsonData = {};
      formData.forEach(function (value, key) {
        if(key!='password-repeat'){
            jsonData[key] = value;
        }
      });
      console.log(jsonData);
      fetch("http://127.0.0.1:8000/auth/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data!==null) {
            window.location.href = "login.html";
            alert('Account created successfully!');
          } else {
            console.error("Authentication failed");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });