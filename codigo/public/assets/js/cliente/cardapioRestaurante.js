const API_URL = 'http://localhost:3000/menu';

function carregarCardapio(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            callback(data.categories);
        })
        .catch(error => {
            console.error('Erro ao ler o cardápio via API JSONServer:', error);
        });
}

function criarItem(item, categoryName) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('card');

    const img = document.createElement('img');
    const imageName = item.image_url;
    img.src = imageName.includes('http') ? imageName : `/codigo/public/assets/images/${imageName}.jpg`;
    img.alt = item.name;
    img.style.width = '200px';
    img.style.borderRadius = '8px'; 

    const title = document.createElement('h3');
    title.textContent = item.name;

    const description = document.createElement('p');
    description.textContent = item.description;

    const priceInfo = document.createElement('p');
    priceInfo.classList.add('info');
    priceInfo.innerHTML = `Preço: R$ ${item.price}`;

    const originInfo = document.createElement('p');
    originInfo.classList.add('info');
    originInfo.textContent = `Origem: ${item.origin || 'Desconhecida'}`;

    itemDiv.appendChild(img);
    itemDiv.appendChild(title);
    itemDiv.appendChild(description);
    itemDiv.appendChild(priceInfo);
    itemDiv.appendChild(originInfo);

    return itemDiv;
}

function renderizarCardapio(categories) {
    const itemsList = document.getElementById('items-list');
    const itemsListVazio = document.getElementById('items-list-vazio');

    if (!categories || categories.length === 0) {
        itemsListVazio.innerHTML = '<h2>Nenhum item disponível no cardápio.</h2>';
        return;
    }

    itemsList.innerHTML = '';

    categories.forEach(category => {
        category.items.forEach(item => {
            const itemDiv = criarItem(item, category.name);
            itemsList.appendChild(itemDiv);
        });
    });

    const categoryButtons = document.querySelectorAll('.category-btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;
            filterItems(selectedCategory, categories);
        });
    });

    const addBtn = document.querySelector('.add-btn');

    addBtn.onclick = function () {
        abrirModalCadastro()
    };
}

function filterItems(selectedCategory, categories) {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';

    categories.forEach(category => {
        if (selectedCategory === 'all' || category.name === selectedCategory) {
            category.items.forEach(item => {
                const itemDiv = criarItem(item, category.name);
                itemsList.appendChild(itemDiv);
            });
        }
    });
}

carregarCardapio(renderizarCardapio);
