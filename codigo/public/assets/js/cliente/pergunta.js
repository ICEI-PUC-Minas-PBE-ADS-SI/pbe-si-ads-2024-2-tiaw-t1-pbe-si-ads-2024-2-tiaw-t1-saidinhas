function cadastrarUsuario(nome) {
    const userId = Date.now();
    const usuario = {
        id: userId,
        nome: nome,
        respostas: {}
    };
    localStorage.setItem(`usuario_${userId}`, JSON.stringify(usuario));
    return userId;
}

document.querySelector(".continuar a").addEventListener("click", function (event) {
    event.preventDefault();

    const userId = cadastrarUsuario("Nome do Usuário Exemplo");

    const respostas = {
        qual_comida: document.querySelector('input[name="q1"]:checked')?.value || "",
        bebida_favorita: document.querySelector('input[name="q2"]:checked')?.value || "",
        sobremesa_favorita: document.querySelector('input[name="q3"]:checked')?.value || "",
        companhia_para_sair: document.querySelector('input[name="q4"]:checked')?.value || "",
        frequencia_sair: document.querySelector('input[name="q5"]:checked')?.value || "",
        horario_preferido_sair: document.querySelector('input[name="q6"]:checked')?.value || ""
    };

    const usuario = JSON.parse(localStorage.getItem(`usuario_${userId}`));
    usuario.respostas = respostas;
    localStorage.setItem(`usuario_${userId}`, JSON.stringify(usuario));

    console.log("Respostas salvas para o usuário:", usuario);
});

function obterUsuario(userId) {
    const usuario = JSON.parse(localStorage.getItem(`usuario_${userId}`));
    console.log("Dados do usuário:", usuario);
    return usuario;
}
