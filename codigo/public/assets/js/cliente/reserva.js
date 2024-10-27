
const API_RESERVA='http://localhost:3000/reserva';
const RESERVA_URL = "/modulos/reserva/reserva.html";

async function salvarreserva(event){
    event.preventDefault(); 

    //Coleta de dados dos inputs
    const novareserva={
        restaurante: document.getElementById('restauranteRC').value,
        data: document.getElementById('dataRC').value,
        hora: document.getElementById('horaRC').value
    };

    try{
        console.log('nova reserva:', novareserva);
        //Requisição de envio
        const response = await fetch(API_RESERVA,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(novareserva)
        });
        //Reposta capturada após a requisição
        console.log('response:', response);
        if (!response.ok) {
            throw new Error('Erro ao realizar sua reserva: ' + response.statusText);
        }

        //Armazena a resposta e mostra no console
        const salvareserva = await response.json();
        console.log('Reserva realizada, consulte os dados', salvareserva);

        //Confirma a reserva mostrando um alerta na tela
        alert('Reserva realizada com sucesso!');
    }catch (error) {
        //Exibe erro no console e cria um alerta
        console.error('Erro:', error);
        alert('Ocorreu um erro ao realizar sua reserva.');
    }
}
async function obterReservas() {
    try {
        // Faz a requisição GET para o servidor
        const response = await fetch(API_RESERVA, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao obter as reservas: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const reservas = await response.json();
        console.log('Reservas recebidas:', reservas);

        mostrarReserva(reservas);
        

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao obter as reservas.');
    }
}

function mostrarReserva(reservados){
    let tela = document.getElementById('consultarRC');
    let conteudo = '';

    console.log('Reservados: ',reservados);
    for(i=0; i< reservados.length; i++){
        conteudo += `<span>${reservados.reserva[i].restaurante} </span><br>
                     <span>${reservados.reserva[i].data} </span><br>
                     <span>${reservados.reserva[i].hora} </span>`;
    }

    tela.innerHTML = conteudo;
   
}

document.addEventListener('DOMContentLoaded', obterReservas);
document.addEventListener('DOMContentLoaded', function() {
    const confirmar=document.getElementById('confirmarRC');
    if (confirmar) {
        confirmar.addEventListener('click', salvarreserva);
    }
});
