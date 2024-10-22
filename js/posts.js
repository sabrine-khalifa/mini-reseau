// Charger les posts
function loadPosts() {
  fetch("data/posts.json")
    .then((response) => response.json())
    .then((posts) => {
      const postsContainer = document.getElementById("posts");
      posts.forEach((post) => {
        const postDiv = createPostElement(post);
        postsContainer.appendChild(postDiv);
      });
    });
}

// Créer un élément de post
function createPostElement(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");
  postDiv.id = `post-${post.id}`; // Assigner un ID unique à chaque post

  postDiv.innerHTML = `
        <h3>${post.user}</h3>
        <img src="${post.profileImage}" alt="profile image">
        <p>${post.text}</p>
        ${
          post.image
            ? `<img src="${post.image}" alt="post image" class="post-img" style="width:100%">`
            : ""
        }
        <p>Likes: <span id="likes-${post.id}">${post.likes}</span>, 
           Dislikes: <span id="dislikes-${post.id}">${post.dislikes}</span></p>
        <button class="reaction-button" onclick="reactPost(${
          post.id
        }, 'like')">Like</button>
        <button class="reaction-button" onclick="reactPost(${
          post.id
        }, 'dislike')">Dislike</button>
        <button class="reaction-button" onclick="reactPost(${
          post.id
        }, 'love')">Love</button>
        <div id="comments-${post.id}" class="comments"></div>
        <textarea id="comment-input-${
          post.id
        }" placeholder="Ajouter un commentaire"></textarea>
        <button onclick="addComment(${post.id})">Commenter</button>
    `;

  // Event listener pour afficher l'image en plein écran
  const postImage = postDiv.querySelector(".post-img");
  if (postImage) {
    postImage.addEventListener("click", () => openImageModal(post.image));
  }

  return postDiv;
}

// Fonction pour gérer les réactions (Like / Dislike / Love)
function reactPost(postId, reaction) {
  const postDiv = document.getElementById(`post-${postId}`); // Ex: récupérer l'élément par ID
  if (postDiv) {
    // Ajouter l'animation ou l'élément si l'élément existe
    const reactionDiv = document.createElement("div");
    reactionDiv.classList.add("reaction");
    postDiv.appendChild(reactionDiv); // Seulement si l'élément est trouvé

    // Afficher les animations de particules selon la réaction
    if (reaction === "like") {
      const star = document.getElementById("blue-star").cloneNode(true);
      reactionDiv.appendChild(star);
    } else if (reaction === "love") {
      const heart = document.getElementById("love-heart").cloneNode(true);
      reactionDiv.appendChild(heart);
    }

    // Ajouter une animation de disparition après un court délai
    setTimeout(() => {
      reactionDiv.remove();
    }, 2000); // L'animation disparaît après 2 secondes
  } else {
    console.error(`Post div with ID post-${postId} not found.`);
  }
}

// Fonction pour ajouter un commentaire
function addComment(postId) {
  const commentInput = document.getElementById(`comment-input-${postId}`);
  const commentText = commentInput.value.trim();

  if (commentText) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `<p><strong>Vous :</strong> ${commentText}</p>`;
    commentsDiv.appendChild(commentDiv);

    // Réinitialiser le champ de commentaire
    commentInput.value = "";
  }
}

// Fonction pour ouvrir la modal d'image en plein écran
function openImageModal(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");

  modal.style.display = "block";
  modalImg.src = src;
}

// Fermer la modal d'image
document.querySelector(".close").addEventListener("click", () => {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
});

// Initialiser la page en chargeant les posts 
document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
});
