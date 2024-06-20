document.addEventListener("DOMContentLoaded", function () {
  var categorySelect = document.getElementById("category");

  fetch("http://127.0.0.1:8000/categories")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        var option = document.createElement("option");
        option.value = item.name;
        option.text = item.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  var postForm = document.getElementById("postForm");

  postForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(postForm);
    var token = localStorage.getItem("token");
    var headers = new Headers();
    console.log(token);
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    var jsonData = {};
    for (let [key, value] of formData.entries()) {
      jsonData[key] = value;
    }

    fetch("http://127.0.0.1:8000/posts/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          window.location.href = "index.html";

          alert("Post created successfully!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});