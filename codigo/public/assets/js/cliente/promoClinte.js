document.addEventListener('DOMContentLoaded', () => {
    // Simulação dos dados dos pratos do restaurante
     
    const cardContainer = document.getElementById('cardsContainer');

    pratos.forEach(prato => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Montagem do conteúdo do card
        let cardContent = `
            <img class="card-img" src="${prato.imagem}" alt="Imagem do Card">
            <div class="card-body">
                <h5 class="card-title">${prato.nome}</h5>
                <strong>R$:</strong><span>${prato.preco.toFixed(2)}
                </span> <span id="desconto">${prato.desconto}% off</span> <br>
        `;

        // Verifica se há preço com desconto
        if (prato.precoComDesconto !== null) {
            cardContent += `<span class="preco-novo">R$ ${prato.precoComDesconto.toFixed(2)}</span><br>`;
        }

        // Verifica se há pontos
        if (prato.pontos > 0) {
            cardContent += `<span class="pontos">Pontos: ${prato.pontos}</span>`;
        }

        cardContent += `
            </div>
        `;

        card.innerHTML = cardContent;
        cardContainer.appendChild(card);
    });
});
