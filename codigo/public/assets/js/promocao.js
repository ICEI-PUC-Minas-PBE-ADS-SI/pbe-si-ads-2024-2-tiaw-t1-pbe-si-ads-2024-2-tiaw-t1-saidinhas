function toggleCaixaNumerica(button) {
    const cardBody = button.parentElement;
    let input = cardBody.querySelector('.input-preco');
    if (input) {
        input.remove();
    } else {
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-preco';
        input.placeholder = 'Digite o preço';
        input.oninput = function () {
            const precoSpan = cardBody.querySelector('span[id^="preco"]');
            precoSpan.textContent = input.value;
        };
        cardBody.appendChild(input);
    }
}

function toggleCaixaDesconto(button) {
    const cardBody = button.parentElement;
    let input = cardBody.querySelector('.input-desconto');
    if (input) {
        input.remove();
    } else {
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-desconto';
        input.placeholder = 'Digite o desconto (%)';
        input.oninput = function () {
            const descontoSpan = cardBody.querySelector('span[id^="desconto"]');
            const precoSpan = cardBody.querySelector('span[id^="preco"]');
            const precoOriginal = parseFloat(precoSpan.textContent);
            const desconto = parseFloat(input.value);
            const precoComDesconto = precoOriginal - (precoOriginal * (desconto / 100));
            descontoSpan.textContent = ` (${desconto}% off)`;
            descontoSpan.style.color = 'red'; // Adiciona a cor vermelha ao desconto
            precoSpan.style.textDecoration = 'line-through';
            precoSpan.nextElementSibling.textContent = ` R$ ${precoComDesconto.toFixed(2)}`;
        };
        cardBody.appendChild(input);
    }
}
// JavaScript para controlar o popup e adicionar novos cards
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

function adicionarCard() {
    var titulo = document.getElementById('titulo').value;
    var urlImagem = document.getElementById('urlImagem').value;

    var cardContainer = document.getElementById('cardsContainer');
    var novoCard = document.createElement('div');
    novoCard.classList.add('card');

    var cardContent = `
        <img class="card-img" src="${urlImagem}" alt="Imagem do Card">
        <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <button class="btn-primary" onclick="toggleCaixaNumerica(this)">Adicionar</button>
            <button class="btn-secondary" onclick="toggleCaixaDesconto(this)">Desconto</button>
        </div>
    `;

    novoCard.innerHTML = cardContent;
    cardContainer.appendChild(novoCard);

    hidePopup();
}
