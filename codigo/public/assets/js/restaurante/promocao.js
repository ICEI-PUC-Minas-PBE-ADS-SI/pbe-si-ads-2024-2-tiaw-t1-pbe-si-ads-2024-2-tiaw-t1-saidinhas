const apiURL = "http://localhost:3000/promocoes"; // URL da API JSON Server

// Função para buscar e renderizar os pratos do JSON Server
function renderCards() {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.getElementById('cardsContainer');
            cardContainer.innerHTML = '';
            data.forEach(prato => {
                const card = document.createElement('div');
                card.classList.add('card');

                let cardContent = `
                    <img class="card-img" src="${prato.imagem}" alt="Imagem do Card">
                    <div class="card-body">
                        <h5 class="card-title">${prato.nome}</h5>
                        <strong>R$:</strong><span id="preco${prato.id}">${prato.preco.toFixed(2)}</span>
                        <span class="desconto" id="desconto${prato.id}">${prato.desconto}% off</span><br>
                `;

                if (prato.precoComDesconto !== null) {
                    cardContent += `<span class="preco-novo">R$ ${prato.precoComDesconto.toFixed(2)}</span><br>`;
                }

                if (prato.pontos > 0) {
                    cardContent += `<span class="pontos" id="pontos${prato.id}">Pontos: ${prato.pontos}</span>`;
                }

                cardContent += `
                    <button class="btn primary" onclick="toggleCaixaNumerica(event, ${prato.id})">Preço</button>
                    <button class="btn secondary" onclick="toggleCaixaDesconto(event, ${prato.id})">Desconto</button><br>
                    <button class="btn primary" onclick="toggleCaixaPontos(event, ${prato.id})">Adicionar Pontos</button><br>
                    <button class="btn danger" onclick="deletarCard(${prato.id})">Deletar</button><br>
                    </div>
                `;

                card.innerHTML = cardContent;
                cardContainer.appendChild(card);
            });
        });
}

// Função para impedir o recarregamento da página
function preventFormSubmission(event) {
    event.preventDefault();
}

// Função para atualizar os dados no JSON Server
function atualizarPrato(id, campo, valor) {
    const updateData = {};
    updateData[campo] = valor;

    fetch(`${apiURL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
        .then(response => response.json())
        .then(() => console.log(`Atualizado ${campo} para o prato ${id}`))
        .catch(error => console.error(`Erro ao atualizar ${campo}:`, error));
}

// Função para alternar a caixa de input de preço
function toggleCaixaNumerica(event, id) {
    event.stopPropagation(); // Impede qualquer outro comportamento inesperado
    const cardBody = event.target.parentElement;
    let input = cardBody.querySelector('.input-preco');

    if (input) {
        input.remove();
    } else {
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-preco';
        input.placeholder = 'Digite o preço';
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const precoSpan = cardBody.querySelector(`#preco${id}`);
                precoSpan.textContent = input.value;
                atualizarPrato(id, 'preco', parseFloat(input.value));
                input.remove();
            }
        });
        cardBody.appendChild(input);
        input.focus();
    }
}

// Função para alternar a caixa de input de desconto
function toggleCaixaDesconto(event, id) {
    event.stopPropagation();
    const cardBody = event.target.parentElement;
    let input = cardBody.querySelector('.input-desconto');

    if (input) {
        input.remove();
    } else {
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-desconto';
        input.placeholder = 'Digite o desconto (%)';
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const descontoSpan = cardBody.querySelector(`#desconto${id}`);
                const precoSpan = cardBody.querySelector(`#preco${id}`);
                const precoOriginal = parseFloat(precoSpan.textContent);
                const desconto = parseFloat(input.value);
                const precoComDesconto = precoOriginal - (precoOriginal * (desconto / 100));

                descontoSpan.textContent = `${desconto}% off`;
                let precoNovoSpan = cardBody.querySelector('.preco-novo');

                if (!precoNovoSpan) {
                    precoNovoSpan = document.createElement('span');
                    precoNovoSpan.className = 'preco-novo';
                    precoSpan.parentElement.appendChild(precoNovoSpan);
                }

                precoNovoSpan.textContent = `R$ ${precoComDesconto.toFixed(2)}`;
                atualizarPrato(id, 'desconto', desconto);
                atualizarPrato(id, 'precoComDesconto', precoComDesconto);
                input.remove();
            }
        });
        cardBody.appendChild(input);
        input.focus();
    }
}

// Função para deletar um prato
function deletarCard(id) {
    fetch(`${apiURL}/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            renderCards(); // Atualiza a página sem recarregar
        })
        .catch(error => console.error('Erro ao deletar prato:', error));
}

// Função para exibir e fechar popup de adicionar prato
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Inicializa a renderização dos pratos ao carregar a página
document.addEventListener('DOMContentLoaded', renderCards);
