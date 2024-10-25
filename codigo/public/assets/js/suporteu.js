document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const messagesDiv = document.getElementById('messages');
    
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `<strong>${name} (${email}):</strong><p>${message}</p>`;
    
    messagesDiv.appendChild(newMessage);

    // Limpa o formulário
    document.getElementById('supportForm').reset();
});
