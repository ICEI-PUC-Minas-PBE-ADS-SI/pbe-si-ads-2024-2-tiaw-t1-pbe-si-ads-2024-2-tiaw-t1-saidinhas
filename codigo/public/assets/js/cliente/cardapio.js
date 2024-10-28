const urlParams = new URLSearchParams(window.location.search);
const restauranteId = urlParams.get('id');

function carregarDetalhesRestaurante(id) {
    fetch(`http://localhost:3000/restaurantes/${id}`)
        .then(response => response.json())
        .then(restaurante => {
            document.getElementById('restaurante-nome').textContent = restaurante.nome;
            document.getElementById('restaurante-imagem').src = restaurante.image_url;
            document.getElementById('restaurante-tipo').textContent = `Tipo: ${restaurante.tipo}`;
            document.getElementById('restaurante-distancia').textContent = `Distância: ${restaurante.distancia}`;
            document.getElementById('restaurante-avaliacao').textContent = `Avaliação: ${restaurante.avaliacao}`;
            document.getElementById('restaurante-faixa-preco').textContent = `Faixa de preço: ${restaurante.faixa_preco}`;
        })
        .catch(error => console.error('Erro ao carregar os detalhes do restaurante:', error));
}

carregarDetalhesRestaurante(restauranteId);
