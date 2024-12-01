let pratos = [
    {
        id: 1,
        nome: "Salada",
        imagem: "../../assets/images/salada.jpg",
        preco: 15.00,
        desconto: 10,
        precoComDesconto: 13.50,
        pontos: 50
    },
    {
        id: 2,
        nome: "File mignon",
        imagem: "../../assets/images/file.jpg",
        preco: 37.50,
        desconto: 5,
        precoComDesconto: 35.62,
        pontos: 75
    },
    {
        id: 3,
        nome: "Bobó de camarão",
        imagem: "../../assets/images/camarao.jpg",
        preco: 67.50,
        desconto: 0,
        precoComDesconto: null,
        pontos: 100
    },
    {
        id: 4,
        nome: "Drincks",
        imagem: "../../assets/images/bebida.jpg",
        preco: 37.50,
        desconto: 15,
        precoComDesconto: 31.88,
        pontos: 25
    }
];


function renderCards() {
    const cardContainer = document.getElementById('cardsContainer');
    cardContainer.innerHTML = '';

    pratos.forEach(prato => {
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
                <button class="btn primary" onclick="toggleCaixaNumerica(this, ${prato.id})">Preço</button>
                <button class="btn secondary" onclick="toggleCaixaDesconto(this, ${prato.id})">Desconto</button><br>
                <button class="btn primary" onclick="toggleCaixaPontos(this, ${prato.id})">Adicionar Pontos</button><br>
                <button class="btn danger" onclick="deletarCard(${prato.id})">Deletar</button><br>
                
            </div>
        `;

        card.innerHTML = cardContent;
        cardContainer.appendChild(card);
    });
}

function toggleCaixaNumerica(button, id) {
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
            const precoSpan = cardBody.querySelector(`#preco${id}`);
            precoSpan.textContent = input.value;
            pratos.find(prato => prato.id === id).preco = parseFloat(input.value);
            
        };
        cardBody.appendChild(input);
    }
}

function toggleCaixaDesconto(button, id) {
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
            const descontoSpan = cardBody.querySelector(`#desconto${id}`);
            const precoSpan = cardBody.querySelector(`#preco${id}`);
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

            pratos.find(prato => prato.id === id).desconto = desconto;
            pratos.find(prato => prato.id === id).precoComDesconto = precoComDesconto;
            
        };
        cardBody.appendChild(input);
    }
}

function toggleCaixaPontos(button, id) {
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
            let pontosSpan = cardBody.querySelector(`#pontos${id}`);
            if (!pontosSpan) {
                pontosSpan = document.createElement('span');
                pontosSpan.className = 'pontos';
                cardBody.appendChild(pontosSpan);
            }
            pontosSpan.textContent = `Pontos: ${input.value}`;
            pratos.find(prato => prato.id === id).pontos = parseInt(input.value, 10);
            
        };
        cardBody.appendChild(input);
    }
}

function adicionarCard() {
    const titulo = document.getElementById('titulo').value;
    const urlImagem = document.getElementById('urlImagem').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const ponto = parseFloat(document.getElementById('ponto').value);

    if (!titulo || !urlImagem || isNaN(preco)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const novoCard = {
        id: pratos.length + 1,
        nome: titulo,
        imagem: urlImagem,
        preco: preco,
        desconto: 0,
        precoComDesconto: null,
        pontos: ponto
    };

    pratos.push(novoCard);
    renderCards();
    hidePopup();
    
}

function deletarCard(id) {
    pratos = pratos.filter(prato => prato.id !== id);
    renderCards();
    
}

document.addEventListener('DOMContentLoaded', renderCards);

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}
