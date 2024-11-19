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

            descontoSpan.textContent = `${desconto}% off`;
            descontoSpan.style.color = 'red';
            precoSpan.style.textDecoration = 'line-through';

            let precoNovoSpan = cardBody.querySelector('.preco-novo');
            if (!precoNovoSpan) {
                precoNovoSpan = document.createElement('span');
                precoNovoSpan.className = 'preco-novo';
                precoSpan.parentElement.insertBefore(precoNovoSpan, precoSpan.nextSibling);
            }
            precoNovoSpan.textContent = ` R$ ${precoComDesconto.toFixed(2)}`;
            precoNovoSpan.style.marginLeft = '10px';
        };
        cardBody.appendChild(input);
    }
}

function toggleCaixaPontos(button) {
    const cardBody = button.parentElement;
    let input = cardBody.querySelector('.input-pontos');
    if (input) {
        input.remove();

    } else {
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'input-pontos';
        input.placeholder = 'Digite os pontos';
        input.oninput = function () {
            let pontosSpan = cardBody.querySelector('.pontos');
            if (!pontosSpan) {
                pontosSpan = document.createElement('span');
                pontosSpan.className = 'pontos';
                cardBody.appendChild(pontosSpan);
            } pontosSpan.textContent = `Pontos: ${input.value}`;
        };
        cardBody.appendChild(input);
    }
}
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

function adicionarCard() {
    var titulo = document.getElementById('titulo').value;
    var urlImagem = document.getElementById('urlImagem').value;
    var preco = document.getElementById('preco').value;
    var pontos = document.getElementById('ponto').value;

    console.log('Título:', titulo);
    console.log('URL da Imagem:', urlImagem);
    console.log('Preço:', preco);


    if (!titulo || !urlImagem || !preco) {
        alert('Preencha todos os campos!');
        return;
    }

    var cardContainer = document.getElementById('cardsContainer');
    var novoCard = document.createElement('div');
    novoCard.classList.add('card');

    var cardContent = `
        <img class="card-img" src="${urlImagem}" alt="Imagem do Card">
        <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <strong>R$:</strong><span id="preco">${preco}</span> <span id="desconto"></span> <br>
            <button class="btn primary" onclick="toggleCaixaNumerica(this)">Adicionar</button>
            <button class="btn secondary" onclick="toggleCaixaDesconto(this)">Desconto</button>
            <br><strong>Pontos:</strong><span id="ponto"></span>
            <button class="btn primary" onclick="toggleCaixaPontos(this)">Adicionar Pontos</button>
        </div>
    `;

    novoCard.innerHTML = cardContent;
    cardContainer.appendChild(novoCard);

    hidePopup();
}
