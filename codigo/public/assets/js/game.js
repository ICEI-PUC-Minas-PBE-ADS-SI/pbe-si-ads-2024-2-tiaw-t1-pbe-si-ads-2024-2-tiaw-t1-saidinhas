const API_URL = 'http://localhost:3000/aplicarcupom'; // URL para buscar os cupons
let pontos = 0;

// Função para buscar os cupons do servidor
async function fetchCupons() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro ao buscar os cupons: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Cupons obtidos:', data); // Depuração
        return data; // Retorna a lista de cupons
    } catch (error) {
        console.error('Erro no fetch:', error.message);
        return []; // Retorna lista vazia em caso de erro
    }
}

// Função para verificar o cupom inserido pelo usuário
async function verificarCupom() {
    const codigoCupom = document.getElementById('codigoCupom').value.trim();
    const mensagemCupom = document.getElementById('mensagemCupom');
    const pontosElemento = document.getElementById('pontos');

    // Validar entrada do usuário
    if (!codigoCupom) {
        mensagemCupom.innerText = "Por favor, insira um código de cupom.";
        return;
    }

    // Busca os cupons do servidor
    const cupons = await fetchCupons();

    // Depuração
    console.log('Código do Cupom inserido:', codigoCupom);
    console.log('Lista de Cupons disponíveis:', cupons);

    // Verifica se o cupom é válido
    const cupomValido = cupons.find(cupom => cupom.codigoCupom === codigoCupom);

    if (cupomValido) {
        console.log('Cupom válido encontrado:', cupomValido); // Depuração
        mensagemCupom.innerText = `Cupom aplicado: ${cupomValido.mensagemCupom}`;
        pontos += cupomValido.pont; // Adiciona os pontos do cupom
        pontosElemento.innerText = pontos;
    } else {
        console.log('Cupom inválido:', codigoCupom); // Depuração
        mensagemCupom.innerText = "Código de cupom inválido.";
    }

    // Limpa o campo de entrada
    document.getElementById('codigoCupom').value = '';
}

// Adiciona o evento ao botão de aplicar cupom
document.getElementById('aplicarCupomBtn').addEventListener('click', verificarCupom);
