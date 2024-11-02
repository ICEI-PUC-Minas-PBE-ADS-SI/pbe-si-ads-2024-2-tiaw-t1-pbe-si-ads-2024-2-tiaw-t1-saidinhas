const urlParams = new URLSearchParams(window.location.search);
const restauranteId = urlParams.get('id');

function carregarPerfilRestaurante(id, callback) {
    fetch(`http://localhost:3000/restaurantes/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar dados do restaurante');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Erro ao ler os dados do restaurante:', error);
        });
}

function criarPerfilRestaurante(restaurante) {
    const perfilDiv = document.getElementById('perfil-restaurante');
    perfilDiv.innerHTML = '';

    const botaoCardapio = document.createElement('button');
    botaoCardapio.id = 'acessar-cardapio';
    botaoCardapio.classList.add('botao-vermelho');
    botaoCardapio.textContent = 'Acessar Cardápio';
    botaoCardapio.addEventListener('click', irParaCardapio);

    const nome = document.createElement('h2');
    nome.textContent = restaurante.nome;

    const descricao = document.createElement('p');
    descricao.textContent = restaurante.descricao;

    const localizacao = document.createElement('p');
    localizacao.innerHTML = `<strong>Localização:</strong> ${restaurante.localizacao}`;

    const telefone = document.createElement('p');
    telefone.innerHTML = `<strong>Telefone:</strong> ${restaurante.telefone}`;

    const email = document.createElement('p');
    email.innerHTML = `<strong>Email:</strong> <a href="mailto:${restaurante.email}">${restaurante.email}</a>`;

    const horario = document.createElement('p');
    horario.innerHTML = `<strong>Horário de Funcionamento:</strong> Segunda a Sexta: ${restaurante.horario_funcionamento.segunda_sexta}, Sábado: ${restaurante.horario_funcionamento.sabado}, Domingo: ${restaurante.horario_funcionamento.domingo}`;

    const faixaPreco = document.createElement('p');
    faixaPreco.innerHTML = `<strong>Faixa de Preço:</strong> ${restaurante.faixa_preco}`;

    const avaliacao = document.createElement('p');
    avaliacao.innerHTML = `<strong>Avaliação:</strong> ${restaurante.avaliacao} (${restaurante.num_avaliacoes} avaliações)`;

    const redesSociais = document.createElement('div');
    redesSociais.innerHTML = `
        <h4>Redes Sociais</h4>
        <a href="${restaurante.redes_sociais.facebook}" target="_blank">Facebook</a> |
        <a href="${restaurante.redes_sociais.instagram}" target="_blank">Instagram</a> |
        <a href="${restaurante.redes_sociais.site}" target="_blank">Site</a>
    `;

    const hrCaracteristicas = document.createElement('hr');

    const cozinha = document.createElement('p');
    cozinha.innerHTML = `<strong>Cozinha:</strong> ${restaurante.cozinha.join(', ')}`;

    const especialidades = document.createElement('p');
    especialidades.innerHTML = `<strong>Especialidades:</strong> ${restaurante.especialidades.join(', ')}`;

    const imagensDiv = document.createElement('div');
    imagensDiv.classList.add('imagens-restaurante');

    restaurante.imagens.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `${restaurante.nome} - imagem`;
        img.classList.add('imagem-perfil');
        imagensDiv.appendChild(img);
    });

    perfilDiv.appendChild(nome);
    perfilDiv.appendChild(descricao);
    perfilDiv.appendChild(localizacao);
    perfilDiv.appendChild(telefone);
    perfilDiv.appendChild(email);
    perfilDiv.appendChild(horario);
    perfilDiv.appendChild(faixaPreco);
    perfilDiv.appendChild(avaliacao);
    perfilDiv.appendChild(redesSociais);

    perfilDiv.appendChild(botaoCardapio);
    perfilDiv.appendChild(hrCaracteristicas);
    perfilDiv.appendChild(cozinha);
    perfilDiv.appendChild(especialidades);
    perfilDiv.appendChild(imagensDiv);
}

function irParaCardapio() {
    window.location.href = `cardapio.html`;
}

carregarPerfilRestaurante(restauranteId, criarPerfilRestaurante);
