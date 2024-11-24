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
    img.src = imageName.includes('http') ? imageName : `/codigo/public/assets/images/${imageName}.jpg`;
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

    const trashBtn = document.createElement('button');
    trashBtn.classList.add('trash-btn');
    trashBtn.innerHTML = '<i class="fa fa-trash"></i>';
    trashBtn.id = `trashBtn${item.id}`;
    trashBtn.addEventListener('click', () => abrirModalConfirmacao(item.id));
    trashBtn.style.float = 'left';
    trashBtn.style.color = 'red';

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
    itemDiv.appendChild(trashBtn);

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

        renderizarCardapio(data.categories);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function abrirModalCadastro() {
    const modal = document.getElementById('addModal');
    const closeBtn = document.querySelector('.modal .close1');
    const cadastroForm = document.getElementById('addForm');

    modal.style.display = 'block';

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    cadastroForm.onsubmit = function (e) {
        e.preventDefault();
        const newItem = {
            name: document.getElementById('newItemName').value,
            description: document.getElementById('newItemDescription').value,
            price: parseFloat(document.getElementById('newItemPrice').value),
            available: document.getElementById('newItemAvailable').checked,
            image_url: document.getElementById('newItemImage').value
        };

        const categoryName = document.getElementById('newItemCategory').value;

        salvarNovoItem(newItem, categoryName);
        modal.style.display = 'none';
    };
}

async function salvarNovoItem(item, categoryName) {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    const filteredCategory = data.categories.find(category => category.name === categoryName);

    if (filteredCategory) {
        item.id = Date.now();
        filteredCategory.items.push(item);
    } else {
        console.error('Categoria não encontrada.');
        return;
    }

    const updateResponse = await fetch(`${API_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    renderizarCardapio(data.categories);

    if (!updateResponse.ok) {
        throw new Error('Erro ao salvar o novo item: ' + updateResponse.statusText);
    }
}

function abrirModalConfirmacao(itemId) {
    const confirmModal = document.getElementById('confirmDeleteModal');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const cancelBtn = document.getElementById('cancelDeleteBtn');
    const closeBtn = document.querySelector('#confirmDeleteModal .close');

    confirmModal.style.display = 'block';

    function fecharModal() {
        confirmModal.style.display = 'none';
    }

    confirmBtn.onclick = function () {
        excluirItem(itemId);
        fecharModal();
    };

    cancelBtn.onclick = closeBtn.onclick = function () {
        fecharModal();
    };

    window.onclick = function (event) {
        if (event.target === confirmModal) {
            fecharModal();
        }
    };
}

async function excluirItem(itemId) {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();

        data.categories.forEach(category => {
            const itemIndex = category.items.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                category.items.splice(itemIndex, 1);
            }
        });

        const updateResponse = await fetch(`${API_URL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!updateResponse.ok) {
            throw new Error('Erro ao atualizar o cardápio: ' + updateResponse.statusText);
        }

        renderizarCardapio(data.categories);
    } catch (error) {
        console.error('Erro ao excluir item:', error);
    }
}

carregarCardapio(renderizarCardapio);
