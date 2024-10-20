// Função de busca e redirecionamento
function search() {
    const input = document.getElementById("search-input").value.toLowerCase();
    
    // Mapeamento de palavras-chave para URLs específicas
    const keywords = {
        "Bruschetta": "cap.html",
        "Salada Caprese": "cap.html",
        "Salada": "cap.html",
        "Filé Mignon": "cap.html",
        "Filé": "cap.html",
        "Risoto de Frutos do Mar": "cap.html",
        "Risoto": "cap.html",
        "Arroz e feijão": "cap.html",
        "Macarrão ao molho": "cap.html",
        "Macarrão": "cap.html",
        "Torta de Limão": "cap.html",
        "Torta": "cap.html",
        "Gelato de Chocolate": "cap.html",
        "Gelato": "cap.html",
        "Sanduíche natural": "cap.html",
        "Sanduíche": "cap.html",
        "Sushi": "cap.html",
    };

    if (input in keywords) {
        // Redireciona para a URL correspondente à palavra-chave
        window.location.href = keywords[input];
    } else if (input) {
        // Redireciona para outra página, passando o termo de busca na URL
        window.location.href = `cap.html?query=${encodeURIComponent(input)}`;
    } else {
        alert("Por favor, digite um termo para buscar.");
    }
}

// Filtragem de produtos conforme o texto digitado no campo de busca
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


