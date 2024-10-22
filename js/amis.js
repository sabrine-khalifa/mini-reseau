// Fonction pour filtrer les amis par nom
function filterFriends() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const friendList = document.getElementById('friendList');
    const friends = friendList.getElementsByClassName('friend');

    Array.from(friends).forEach(friend => {
        const name = friend.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchInput)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
}

// Drag and Drop pour réorganiser la liste d'amis
const friendList = document.getElementById('friendList');
let draggedFriend = null;

// Début du drag
friendList.addEventListener('dragstart', (e) => {
    draggedFriend = e.target;
    e.target.style.opacity = 0.5;
});

// Fin du drag
friendList.addEventListener('dragend', (e) => {
    e.target.style.opacity = '';
    draggedFriend = null;
});

// Permet de dragover
friendList.addEventListener('dragover', (e) => {
    e.preventDefault();
});

// Drop d'un ami à un nouvel endroit
friendList.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('friend') && draggedFriend) {
        const bounding = e.target.getBoundingClientRect();
        const offset = bounding.y + bounding.height / 2;

        if (e.clientY - offset > 0) {
            e.target.after(draggedFriend);
        } else {
            e.target.before(draggedFriend);
        }
    }
});
