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

    const img = document.createElement('img');
    img.src = `/codigo/public/assets/images/${restaurante.tipo}.jpg`;
    img.alt = restaurante.nome;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('item-details');

    const title = document.createElement('h4');
    title.textContent = restaurante.nome;

    const tipo = document.createElement('p');
    tipo.textContent = `Tipo: ${restaurante.tipo}`;

    const distancia = document.createElement('p');
    distancia.textContent = `Distância: ${restaurante.distancia}`;

    const avaliacao = document.createElement('p');
    avaliacao.textContent = `Avaliação: ${restaurante.avaliacao}`;

    const faixaPreco = document.createElement('p');
    faixaPreco.textContent = `Faixa de preço: ${restaurante.faixa_preco}`;

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(tipo);
    detailsDiv.appendChild(distancia);
    detailsDiv.appendChild(avaliacao);
    detailsDiv.appendChild(faixaPreco);

    itemDiv.appendChild(img);
    itemDiv.appendChild(detailsDiv);

    return itemDiv;
}

function renderizarRestaurantes(restaurantes) {
    const itemsList = document.getElementById('items-list');
    const itemsListVazio = document.getElementById('items-list-vazio');

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

function filterItems(selectedCategory, restaurantes) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    restaurantes.forEach(restaurante => {
        if (selectedCategory === 'all' || restaurante.tipo === selectedCategory) {
            const itemDiv = criarItemRestaurante(restaurante);
            itemsList.appendChild(itemDiv);
        }
    });
}

const searchInput = document.querySelector('.input-pesquisar');

const selectTipo = document.querySelector('.select-tipo');

selectTipo.addEventListener('change', () => {
    const selectedTipo = selectTipo.value;
    console.log(restaurantes);
    filterItemsPorTipo(selectedTipo, restaurantes);
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filtrarRestaurantes(searchTerm);
});

function filterItemsPorTipo(selectedCategory, restaurantes) {
    const itemsList = document.getElementById('items-list');
    const itemsListVazio = document.getElementById('items-list-vazio');
    itemsList.innerHTML = '';

    let hasVisibleItems = false;

    restaurantes.forEach(restaurante => {
        if (selectedCategory === 'all' || restaurante.tipo === selectedCategory) {
            const itemDiv = criarItemRestaurante(restaurante);
            itemsList.appendChild(itemDiv);
            hasVisibleItems = true;
        }
    });

    if (!hasVisibleItems) {
        itemsListVazio.style.display = 'block'; 
    } else {
        itemsListVazio.style.display = 'none';  
    }
}

function filtrarRestaurantes(searchTerm) {
    const items = document.querySelectorAll('.item');
    let hasVisibleItems = false;

    items.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        const itemTipo = item.querySelector('p').textContent.toLowerCase();

        if (itemName.includes(searchTerm) || itemTipo.includes(searchTerm)) {
            item.style.display = 'block';
            hasVisibleItems = true;
        } else {
            item.style.display = 'none';
        }
    });

    const itemsListVazio = document.getElementById('items-list-vazio');

    if (!hasVisibleItems) {
        itemsListVazio.style.display = 'block';
    } else {
        itemsListVazio.style.display = 'none';
    }
}

carregarRestaurantes(renderizarRestaurantes);
