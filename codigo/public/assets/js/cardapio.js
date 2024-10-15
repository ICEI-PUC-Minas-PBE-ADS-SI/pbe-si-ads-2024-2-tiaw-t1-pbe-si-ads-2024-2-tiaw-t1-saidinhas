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
    itemDiv.classList.add('item');
    itemDiv.dataset.category = categoryName;

    const img = document.createElement('img');
    const imageName = item.image_url;
    img.src = `/public/assets/images/${imageName}.jpg`;
    img.alt = item.name;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('item-details');

    const title = document.createElement('h3');
    title.textContent = item.name;

    const caption1 = document.createElement('p');
    caption1.textContent = item.description;

    const caption2 = document.createElement('p');
    caption2.textContent = `R$ ${item.price}`;

    const availabilityTag = document.createElement('span');
    availabilityTag.classList.add('availability-tag');
    availabilityTag.textContent = item.available ? 'Disponível' : 'Indisponível';
    availabilityTag.style.color = item.available ? 'green' : 'red';
    availabilityTag.style.float = 'right';

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => abrirModalEdicao(item, categoryName));

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(caption1);
    detailsDiv.appendChild(caption2);
    detailsDiv.appendChild(availabilityTag);

    itemDiv.appendChild(img);
    itemDiv.appendChild(detailsDiv);
    itemDiv.appendChild(editButton);

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

function abrirModalEdicao(item, categoryName) {
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.modal .close');
    const editForm = document.getElementById('editForm');

    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemAvailable').checked = item.available;

    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    editForm.onsubmit = function (e) {
        e.preventDefault();

        item.name = document.getElementById('itemName').value;
        item.description = document.getElementById('itemDescription').value;
        item.price = parseFloat(document.getElementById('itemPrice').value);
        item.available = document.getElementById('itemAvailable').checked;

        salvarDadosEditados(item, categoryName);

        modal.style.display = 'none';
    };
}

async function salvarDadosEditados(item, categoryName) {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
    
        const filteredCategory = data.categories.find(category => category.name === categoryName);
        const filteredItem = filteredCategory.items.find(i => i.id === item.id);
  
        filteredItem.name = item.name;
        filteredItem.description = item.description;
        filteredItem.price = parseFloat(item.price).toFixed(2);
        filteredItem.available = item.available;
    
        console.log('Item atualizado:', filteredItem);
        console.log('Data atualizado:', data);
    
        const updateResponse = await fetch(`${API_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        if (!updateResponse.ok) {
            throw new Error('Erro ao atualizar o item: ' + updateResponse.statusText);
        }
    
        const updatedData = await updateResponse.json();
        console.log('Dados atualizados com sucesso:', updatedData);
    } catch (error) {
        console.error('Erro:', error);
    }
}

carregarCardapio(renderizarCardapio);