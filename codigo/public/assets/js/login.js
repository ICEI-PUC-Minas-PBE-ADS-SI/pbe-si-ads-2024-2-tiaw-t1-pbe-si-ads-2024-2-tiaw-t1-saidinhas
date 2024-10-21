// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo realiza o registro de novos usuários e login para aplicações com 
// backend baseado em API REST provida pelo JSONServer
// Os dados de usuário estão localizados no arquivo db.json que acompanha este projeto.
//
// Autor: Rommel Vieira Carneiro (rommelcarneiro@gmail.com)
// Data: 09/09/2024
//
// Código LoginApp  


// Página inicial de Login
const API_URL = 'http://localhost:3000/usuarios';
const LOGIN_URL = "/modulos/login/login.html";



const API_URL_RESTAURANTES = 'http://localhost:3000/usuarios';


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
        console.log('Restaurante salvo com sucesso:', dadosSalvos);

        
        alert('Restaurante cadastrado com sucesso!');

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    }
}


document.getElementById('register-form').addEventListener('submit', salvarRestaurante);
