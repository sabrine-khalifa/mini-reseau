// Sélectionner les éléments du DOM
const conversationsEl = document.querySelector('.conversations');
const detailsEl = document.querySelector('.details');

// Charger le fichier JSON
fetch('data/messages.json')
  .then(response => response.json())
  .then(data => {
    const conversations = data.conversations;
    displayConversations(conversations);
  })
  .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));

// Fonction pour afficher la liste des conversations
function displayConversations(conversations) {
  conversations.forEach(convo => {
    const lastMessage = convo.messages[convo.messages.length - 1];

    const conversationEl = document.createElement('div');
    conversationEl.className = 'conversation';
    conversationEl.innerHTML = `
      <img src="${convo.profilePic}" alt="${convo.name}" width="40" height="40">
      <div>
        <strong>${convo.name}</strong>
        <p>${lastMessage.content}</p>
        <span class="meta">${lastMessage.timestamp}</span>
      </div>
    `;
    conversationEl.addEventListener('click', () => displayConversationDetails(convo));
    conversationsEl.appendChild(conversationEl);
  });
}

// Fonction pour afficher les détails d'une conversation
function displayConversationDetails(convo) {
  detailsEl.innerHTML = '';

  convo.messages.forEach(message => {
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = `
      <p><strong>${message.sender}:</strong> ${message.content}</p>
      <span class="meta">${message.timestamp}</span>
    `;
    detailsEl.appendChild(messageEl);
  });

  // Champ pour ajouter un nouveau message
  const newMessageInput = document.createElement('input');
  newMessageInput.type = 'text';
  newMessageInput.placeholder = 'Tapez un message...';
  newMessageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendMessage(convo, newMessageInput.value);
      newMessageInput.value = '';
    }
  });

  detailsEl.appendChild(newMessageInput);
}

// Fonction pour envoyer un nouveau message
function sendMessage(convo, content) {
  const newMessage = {
    content,
    timestamp: new Date().toLocaleString(),
    sender: 'Moi'
  };

  convo.messages.push(newMessage); // Ajoute le message au JSON simulé
  displayConversationDetails(convo); // Mettre à jour l'affichage des messages

  // Mettre à jour la liste des conversations (affichage du dernier message)
  conversationsEl.innerHTML = ''; // Réinitialise la liste des conversations
  fetch('conversations.json')
    .then(response => response.json())
    .then(data => {
      displayConversations(data.conversations); // Réaffiche les conversations mises à jour
    });
}
