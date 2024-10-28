
function search() {
    const input = document.getElementById("search-input").value.toLowerCase();
    
    // Mapeamento de palavras-chave para URLs específicas
    const keywords = {
       "Bruschetta": "cardapio.html",
       "Salada Caprese": "cardapio.html",
       "Salada":"cardapio.html",
       "Filé Mignon": "cardapio.html",
       "Filé": "cardapio.html",
       "Risoto de Frutos do Mar": "cardapio.html",
       "Risoto": "cardapio.html",
       "Arroz e feijão": "cardapio.html",
       "Macarrão ao molho": "cardapio.html",
       "Macarrão": "cardapio.html",
       "Torta de Limão": "cardapio.html",
       "Torta": "cardapio.html",
       "Gelato de Chocolate": "cardapio.html",
        "Gelato": "cardapio.html",
        "Sanduíche natural": "cardapio.html",
        "Sanduíche": "cardapio.html",
        "Sushi": "cardapio.html",
    };

    if (input in keywords) {
        // Redireciona para a URL correspondente à palavra-chave
        window.location.href = keywords[input];
    } else if (input) {
        // Redireciona para outra página, passando o termo de busca na URL
        window.location.href = `cardapio.html?query=${encodeURIComponent(input)}`;
    } else {
        alert("Por favor, digite um termo para buscar.");
    }
}
document.querySelector('input[type="text"]').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});
