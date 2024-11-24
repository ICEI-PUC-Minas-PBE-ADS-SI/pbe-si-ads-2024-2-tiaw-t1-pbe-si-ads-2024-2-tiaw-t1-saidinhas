const API_URL = 'http://localhost:3000/aplicarCupomBtn';
const LOGIN_URL = "/modulos/login/indexgame.html";

let pontos = 0;

// para acumular pontos
document.getElementById('acumularPontosBtn').addEventListener('click', () => {
    const pontosAcumulados = Math.floor(Math.random() * 10) + 1; // Acumula de 1 a 100 pontos
    pontos += pontosAcumulados;
    document.getElementById('pontos').innerText = pontos;
    adicionarPromocao(`Você acumulou ${pontosAcumulados} pontos!`);
});

// para adicionar promoções
function adicionarPromocao(mensagem) {
    const listaPromocoes = document.getElementById('listaPromocoes');
    const li = document.createElement('li');
    li.innerText = mensagem;
    listaPromocoes.appendChild(li);
}

// para aplicar cupons
document.getElementById('aplicarCupomBtn').addEventListener('click', () => {
    const codigoCupom = document.getElementById('codigoCupom').value;
    const mensagemCupom = document.getElementById('mensagemCupom');

    if (codigoCupom === "DESCONTO10") {
        mensagemCupom.innerText = "Cupom aplicado: 10% de desconto!";
    } else if (codigoCupom === "PONTOS50") {
        pontos += 50;
        document.getElementById('pontos').innerText = pontos;
        mensagemCupom.innerText = "Cupom aplicado: +50 pontos!";
    } else {
        mensagemCupom.innerText = "Código de cupom inválido.";
    }

    // Limpa o campo de entrada
    document.getElementById('codigoCupom').value = '';
});
