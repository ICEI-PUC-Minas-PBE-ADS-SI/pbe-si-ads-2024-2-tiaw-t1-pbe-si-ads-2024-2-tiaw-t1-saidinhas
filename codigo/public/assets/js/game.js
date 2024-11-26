document.addEventListener("DOMContentLoaded", () => {
    // Lista de cupons válidos e seus valores em pontos
    const cuponsValidos = {
        "SAIDA10": 10,
        "PONTOS20": 20,
        "PREMIO50": 50
    };

    let pontosAcumulados = 0;

    // Referências aos elementos do DOM
    const codigoCupomInput = document.getElementById("codigoCupom");
    const aplicarCupomBtn = document.getElementById("aplicarCupomBtn");
    const mensagemCupom = document.getElementById("mensagemCupom");
    const pontosSpan = document.getElementById("pontos");

    // Função para aplicar cupom
    const aplicarCupom = () => {
        const codigoCupom = codigoCupomInput.value.trim().toUpperCase(); // Normaliza o código
        if (cuponsValidos[codigoCupom]) {
            const pontos = cuponsValidos[codigoCupom];
            pontosAcumulados += pontos;

            // Atualiza a exibição dos pontos acumulados
            pontosSpan.textContent = pontosAcumulados;

            // Mensagem de sucesso
            mensagemCupom.textContent = `Cupom aplicado com sucesso! Você ganhou ${pontos} pontos.`;
            mensagemCupom.style.color = "green";
        } else {
            // Mensagem de erro
            mensagemCupom.textContent = "Cupom inválido. Tente novamente.";
            mensagemCupom.style.color = "red";
        }

        // Limpa o campo de entrada
        codigoCupomInput.value = "";
    };

    // Evento de clique no botão "Aplicar Cupom"
    aplicarCupomBtn.addEventListener("click", aplicarCupom);

    // Permite aplicar o cupom ao pressionar Enter
    codigoCupomInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            aplicarCupom();
        }
    });
});


