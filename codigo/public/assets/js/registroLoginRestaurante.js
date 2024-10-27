const API_URL_RESTAURANTES = 'http://localhost:3000/usuariosRestaurante';

async function salvarRestaurante(event) {
    event.preventDefault(); 

    const novoRestaurante = {
        nome: document.getElementById('txt_nome_restaurante').value,
        cnpj: document.getElementById('txt_cnpj').value,
        email: document.getElementById('txt_email_restaurante').value,
        cep: document.getElementById('cep_restaurante').value,
        logradouro: document.getElementById('txt_logradouro_restaurante').value,
        bairro: document.getElementById('txt_bairro_restaurante').value,
        cidade: document.getElementById('txt_cidade_restaurante').value,
        estado: document.getElementById('txt_estado_restaurante').value,
        senha: document.getElementById('txt_senha_restaurante').value
    };

    try {
        const response = await fetch(API_URL_RESTAURANTES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoRestaurante)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar o restaurante: ' + response.statusText);
        }

        const dadosSalvos = await response.json();
       
        alert('Restaurante cadastrado com sucesso!');
        
        window.location.href = 'loginRestaurante.html';

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    }
}

async function loginRestaurante(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_URL_RESTAURANTES, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados de login: ' + response.statusText);
        }

        const restaurantes = await response.json();
        
        const restauranteEncontrado = restaurantes.find(
            restaurante => restaurante.email === email && restaurante.senha === password
        );

        if (restauranteEncontrado) {
            alert('Login realizado com sucesso!');
            window.location.href = '../restaurante/perfil.html'; // Caminho para a página principal
        } else {
            alert('Usuário ou senha incorretos. Tente novamente.');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao fazer login.');
    }
}

document.getElementById('login-form').addEventListener('submit', loginRestaurante);

document.getElementById('register-form').addEventListener('submit', salvarRestaurante);
