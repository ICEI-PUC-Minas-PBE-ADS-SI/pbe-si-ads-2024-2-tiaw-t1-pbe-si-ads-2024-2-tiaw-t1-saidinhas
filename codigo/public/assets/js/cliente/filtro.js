const API_URL = 'http://localhost:3000/restaurantes';
let restaurantes = [];

function carregarRestaurantes(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            restaurantes = data;
            callback(data);
        })
        .catch(error => {
            console.error('Erro ao ler os restaurantes via API JSONServer:', error);
        });
}

function criarItemRestaurante(restaurante) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.dataset.tipo = restaurante.tipo;
    itemDiv.style.cursor = 'pointer';

    const img = document.createElement('img');
    img.src = restaurante.image_url;
    img.alt = restaurante.nome;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('item-detailsFiltro');

    const title = document.createElement('h4');
    title.textContent = restaurante.nome;

    const tipo = document.createElement('span');
    tipo.textContent = `${restaurante.tipo}`;
    tipo.classList.add('availability-tag');
    tipo.style.color = 'green';
    
    const avaliacao = document.createElement('p');
    avaliacao.textContent = `Avaliação: ${restaurante.avaliacao}`;

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(tipo);
    detailsDiv.appendChild(avaliacao);
 
    itemDiv.appendChild(img);
    itemDiv.appendChild(detailsDiv);

    itemDiv.addEventListener('click', () => {
        window.location.href = `infoRestaurante.html?id=${restaurante.id}`;
    });

    return itemDiv;
}

function renderizarRestaurantes(restaurantes) {
    const itemsList = document.getElementById('items-list');
    const itemsListVazio = document.getElementById('items-list-vazio');

    itemsList.innerHTML = '';
    itemsListVazio.innerHTML = '';

    if (!restaurantes || restaurantes.length === 0) {
        itemsListVazio.innerHTML = '<h2>Nenhum restaurante disponível.</h2>';
        return;
    }

    itemsList.innerHTML = '';

    restaurantes.forEach(restaurante => {
        const itemDiv = criarItemRestaurante(restaurante);
        itemsList.appendChild(itemDiv);
    });

    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;
            filterItems(selectedCategory, restaurantes);
        });
    });
}

function filtrarRestaurantes() {
    const tipoSelecionado = document.querySelector('.select-tipo').value;
    const nomePesquisado = document.querySelector('.input-pesquisar').value.toLowerCase();

    const restaurantesFiltrados = restaurantes.filter(restaurante => {
        const nomeInclui = restaurante.nome.toLowerCase().includes(nomePesquisado);
        const tipoCorreto = tipoSelecionado === 'all' || restaurante.tipo === tipoSelecionado; 
        return nomeInclui && tipoCorreto; 
    });

    renderizarRestaurantes(restaurantesFiltrados);
}

document.querySelector('.select-tipo').addEventListener('change', filtrarRestaurantes);
document.querySelector('.input-pesquisar').addEventListener('input', filtrarRestaurantes);

carregarRestaurantes(renderizarRestaurantes);
