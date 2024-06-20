document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    var author={'email':null};
    if (postId) {
        var token = localStorage.getItem("token");
        if (token != null) {

            fetch('http://127.0.0.1:8000/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(user => {
                    author = user['0'];
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });

        }
        const apiUrl = `http://127.0.0.1:8000/posts/${postId}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(postDetail => {
                if (postDetail.author.email === author.email) {
                    const updatePost = document.getElementById('updatePost')
                    updatePost.style.display = 'inline';
                    const deletePost = document.getElementById('deletePost')
                    deletePost.style.display = 'inline';

                    updatePost.href = `update-post.html?id=${postId}`;

                    console.log('clicked out');
                    if (deletePost) {
                        console.log('clicked in');
                        deletePost.onclick = _deletePost;
                    }


                }
                const postContainer = document.getElementById('post-container');

                const titleElement = document.createElement('h2');
                titleElement.textContent = postDetail.title;
                titleElement.style.color = 'blue';
                titleElement.style.marginBottom = '1em';

                const contentElement = document.createElement('p');
                contentElement.textContent = postDetail.content;
                contentElement.style.marginTop = '1em';

                const categoryElement = document.createElement('p');
                categoryElement.textContent = postDetail.category;
                categoryElement.style.fontStyle = 'italic';
                categoryElement.style.color = 'gray';

                const authorElement = document.createElement('p');
                authorElement.style.fontSize = '0.9em';
                authorElement.style.opacity = '0.7';
                authorElement.innerHTML = `Author: ${postDetail.author.name} (${postDetail.author.email})`;

                postContainer.appendChild(titleElement);
                postContainer.appendChild(categoryElement);
                postContainer.appendChild(authorElement);
                postContainer.appendChild(contentElement);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    } else {
        console.log('No post ID found in URL');
    }


    function _deletePost() {
        console.log('clicked');

        const apiUrl = `http://127.0.0.1:8000/posts/${postId}`;
        var token = localStorage.getItem("token");
        var headers = new Headers();
        console.log(token);
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("Content-Type", "application/json");

        fetch(apiUrl, {
            method: 'DELETE',
            headers: headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Post deleted successfully');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

    }
});
