const API_URL = 'http://localhost:3000/usuarioCliente';
const LOGINUSUARIO_URL = "/modulos/login/Usuario.html";



const API_URL_USUARIO = 'http://localhost:3000/usuarioCliente';



async function salvaUsuario(event) {
    event.preventDefault(); 

    
    const novoUsuario = {
        nome: document.getElementById('txt_nome_completo').value,
        cpf: document.getElementById('txt_cpf').value,
        email: document.getElementById('txt_email_usuario').value,
        cep: document.getElementById('cep_usuario').value,
        logradouro: document.getElementById('txt_logradouro_usuario').value,
        bairro: document.getElementById('txt_bairro_usuario').value,
        cidade: document.getElementById('txt_cidade_usuario').value,
        estado: document.getElementById('txt_estado_usuario').value,
        senha: document.getElementById('txt_senha_usuario').value
    };

    try {
        
        const response = await fetch(API_URL_USUARIO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o usuario: ' + response.statusText);
        }

        const dadosSalvos = await response.json();
        console.log('Usuario salvo com sucesso:', dadosSalvos);

        
        alert('Usuário cadastrado com sucesso!');

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    }
}


document.getElementById('register-form').addEventListener('submit', salvaUsuario);
