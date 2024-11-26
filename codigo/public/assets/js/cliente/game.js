let pontos = 0;

// Lista de cupons com pontos específicos
const cupons = [
    { codigo: "DESCONTO10", descricao: "10% de desconto em qualquer produto", pontos: 10, valido: true },
    { codigo: "FRETEGRATIS", descricao: "Frete grátis para compras acima de R$100", pontos: 20, valido: true },
    { codigo: "BLACKFRIDAY50", descricao: "50% de desconto na Black Friday", pontos: 50, valido: true },
    { codigo: "DESCONTOVIP", descricao: "Desconto exclusivo para clientes VIP", pontos: 30, valido: true }
];

// Função para acumular pontos aleatórios
document.getElementById('acumularPontosBtn').addEventListener('click', () => {
    const pontosAcumulados = Math.floor(Math.random() * 10) + 1; // Acumula de 1 a 10 pontos
    pontos += pontosAcumulados;
    document.getElementById('pontos').innerText = pontos;
    adicionarPromocao(`Você acumulou ${pontosAcumulados} pontos!`);
});

// Função para adicionar promoções à lista
function adicionarPromocao(mensagem) {
    const listaPromocoes = document.getElementById('listaPromocoes');
    const li = document.createElement('li');
    li.innerText = mensagem;
    listaPromocoes.appendChild(li);
}

// Função para aplicar cupons
document.getElementById('aplicarCupomBtn').addEventListener('click', () => {
    const codigoCupom = document.getElementById('codigoCupom').value.trim().toUpperCase(); // Remove espaços e normaliza
    const mensagemCupom = document.getElementById('mensagemCupom');

    // Verifica se o campo de código do cupom não está vazio
    if (!codigoCupom) {
        mensagemCupom.innerText = "Por favor, insira um código de cupom.";
        return;
    }

    // Procura o cupom na lista
    const cupomEncontrado = cupons.find(c => c.codigo === codigoCupom);

    if (cupomEncontrado && cupomEncontrado.valido) {
        // Adiciona os pontos do cupom
        pontos += cupomEncontrado.pontos;
        document.getElementById('pontos').innerText = pontos;

        // Exibe a mensagem de sucesso
        mensagemCupom.innerText = `Cupom aplicado: ${cupomEncontrado.descricao}. Você ganhou ${cupomEncontrado.pontos} pontos!`;
        adicionarPromocao(`Cupom aplicado: ${cupomEncontrado.descricao}. Você ganhou ${cupomEncontrado.pontos} pontos!`);
    } else {
        // Exibe mensagem de erro
        mensagemCupom.innerText = "Código de cupom inválido ou não válido.";
    }

    // Limpa o campo de entrada após a verificação
    document.getElementById('codigoCupom').value = '';
});
