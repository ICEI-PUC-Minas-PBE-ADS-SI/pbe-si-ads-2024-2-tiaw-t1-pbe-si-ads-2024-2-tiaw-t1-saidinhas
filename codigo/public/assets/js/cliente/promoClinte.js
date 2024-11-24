document.addEventListener('DOMContentLoaded', () => {
    const pratos = [
        {
            nome: "Salada",
            imagem: "../../assets/images/salada.jpg",
            preco: 15.00,
            desconto: 10,
            precoComDesconto: 13.50,
            pontos: 50
        },
        {
            nome: "File mignon",
            imagem: "../../assets/images/file.jpg",
            preco: 37.50,
            desconto: 5,
            precoComDesconto: 35.62,
            pontos: 75
        },
        {
            nome: "Bobó de camarão",
            imagem: "../../assets/images/camarao.jpg",
            preco: 67.50,
            desconto: 0,
            precoComDesconto: null,
            pontos: 100
        },
        {
            nome: "Drincks",
            imagem: "../../assets/images/bebida.jpg",
            preco: 37.50,
            desconto: 15,
            precoComDesconto: 31.88,
            pontos: 25
        }
    ];

    const cardContainer = document.getElementById('cardsContainer');

    pratos.forEach(prato => {
        const card = document.createElement('div');
        card.classList.add('card');

        let cardContent = `
            <img class="card-img" src="${prato.imagem}" alt="Imagem do Card">
            <div class="card-body">
                <h5 class="card-title">${prato.nome}</h5>
                <strong>R$:</strong><span>${prato.preco.toFixed(2)}</span>
                <span class="desconto">${prato.desconto}% off</span> <br>
        `;

        if (prato.precoComDesconto !== null) {
            cardContent += `<span class="preco-novo">R$ ${prato.precoComDesconto.toFixed(2)}</span><br>`;
        }

        if (prato.pontos > 0) {
            cardContent += `<span class="pontos">Pontos: ${prato.pontos}</span>`;
        }

        cardContent += `
            </div>
        `;

        card.innerHTML = cardContent;
        cardContainer.appendChild(card);
    });
    let pontos = 0;

    // para acumular pontos
    document.getElementById('acumularPontosBtn').addEventListener('click', () => {
        const pontosAcumulados = Math.floor(Math.random() * 10) + 1; // Acumula de 1 a 100 pontos
        pontos += pontosAcumulados;
        document.getElementById('pontos').innerText = pontos;
        adicionarPromocao(`Você acumulou ${pontosAcumulados} pontos!`);
    });

});
