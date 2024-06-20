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
    var logoutButton = document.getElementById('logoutButton');

        function logout() {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        }

        if (logoutButton) {
            logoutButton.onclick = logout;
        }

    fetchPosts();
  });

  function fetchPosts() {
    fetch("http://127.0.0.1:8000/posts/")
      .then((response) => response.json())
      .then((data) => {
        const postContainer = document.getElementById("post-container");
        if (!postContainer) {
          console.error('Element with ID "post-container" not found.');
          return;
        }
        if (data.length === 0) {
          postContainer.innerHTML =
            '<div class="alert alert-warning" style="margin-top:10px;" role="alert">No posts yet!</div>';
          console.log("No posts found.");
          return;
        }

        data.forEach((post) => {
          const postCard = document.createElement("div");
          postCard.classList.add("post-card");

          postCard.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = `post-detail.html?id=${post.id}`;
          });

          const postTitle = document.createElement("div");
          postTitle.classList.add("card-header");
          postTitle.textContent = post.title;
          postCard.appendChild(postTitle);

          const postBody = document.createElement("div");
          postBody.classList.add("card-body");
          postBody.innerHTML = post.content.slice(0, 100) + "...";
          postCard.appendChild(postBody);

          const postAuthor = document.createElement("small");
          postAuthor.classList.add("text-muted");
          postAuthor.textContent = `By ${post.author.name}`;
          postCard.appendChild(postAuthor);

          postContainer.appendChild(postCard);
        });
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }