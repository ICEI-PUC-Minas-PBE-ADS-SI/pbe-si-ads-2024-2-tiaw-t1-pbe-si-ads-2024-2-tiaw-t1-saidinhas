const API_URL_USUARIOS = 'http://localhost:3000/usuarioCliente';


async function salvarUsuario(event) {
    event.preventDefault();

    const novoUsuario = {
        nome: document.getElementById('txt_nome_completo').value,
        data: document.getElementById('txt_data_de_nascimento').value,
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

        const response = await fetch(API_URL_USUARIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o usuario: ' + response.statusText);
        }

        alert('Usuário cadastrado com sucesso!');

        window.location.href = 'loginUsuario.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    }
}

async function loginUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_URL_USUARIOS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados de login: ' + response.statusText);
        }

        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(
            usuario => usuario.email === email && usuario.senha === password
        );

        if (usuarioEncontrado) {
            alert('Login realizado com sucesso!');
            window.location.href = '../cliente/antespergunta.html';
        } else {
            alert('Usuário ou senha incorretos. Tente novamente.');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao fazer login.');
    }
}

document.getElementById('login-form').addEventListener('submit', loginUsuario);

document.getElementById('register-form').addEventListener('submit', salvarUsuario);
