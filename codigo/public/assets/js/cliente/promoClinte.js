document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar dados do arquivo JSON
    fetch('/codigo/db.json') // Caminho relativo ao arquivo db.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json(); // Converte a resposta em JSON
        })
        .then(data => {
            const promocoes = data.promocoes; // Acessa o array de promoções dentro do JSON
            const cardContainer = document.getElementById('cardsContainer');

            // Cria os cards para cada promoção
            promocoes.forEach(promocao => {
                const card = document.createElement('div');
                card.classList.add('card');

                let cardContent = `
                    <img class="card-img" src="${promocao.imagem}" alt="Imagem do Card">
                    <div class="card-body">
                        <h5 class="card-title">${promocao.nome}</h5>
                        <strong>Preço:</strong> R$ ${promocao.preco.toFixed(2)}<br>
                        <span class="desconto">${promocao.desconto}% off</span> <br>
                `;

                if (promocao.precoComDesconto !== null) {
                    cardContent += `<span class="preco-novo">Preço com desconto: R$ ${promocao.precoComDesconto.toFixed(2)}</span><br>`;
                }

                if (promocao.pontos > 0) {
                    cardContent += `<span class="pontos">Pontos: ${promocao.pontos}</span>`;
                }

                cardContent += `</div>`;
                card.innerHTML = cardContent;
                cardContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro:', error); // Exibe o erro no console
        });

    let pontos = 0;

    // Para acumular pontos
    document.getElementById('acumularPontosBtn').addEventListener('click', () => {
        const pontosAcumulados = Math.floor(Math.random() * 10) + 1; // Acumula de 1 a 10 pontos
        pontos += pontosAcumulados;
        document.getElementById('pontos').innerText = pontos;
        adicionarPromocao(`Você acumulou ${pontosAcumulados} pontos!`);
    });
});
