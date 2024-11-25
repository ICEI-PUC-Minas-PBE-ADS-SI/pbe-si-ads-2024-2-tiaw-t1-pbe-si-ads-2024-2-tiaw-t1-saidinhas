const API_URL_SUPORTE = 'http://localhost:3000/suporte';


document.getElementById('supportForm').addEventListener('submit', async function (e) {
    e.preventDefault(); 

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

   
    const suporteData = {
        name: name,
        email: email,
        message: message
    };

    
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `<strong>${name} (${email}):</strong><p>${message}</p>`;
    messagesDiv.appendChild(newMessage);

   
    try {
        const response = await fetch(API_URL_SUPORTE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(suporteData)
        });

        if (response.ok) {
            console.log('Mensagem enviada com sucesso!');
        } else {
            console.error('Erro ao enviar a mensagem:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
    }

   
    document.getElementById('supportForm').reset();
});
