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