
const API_RESERVA='http://localhost:3000/reserva';
const_URL = '/modulos/reserva/reserva.html';

async function salvarreserva(){

    const novareserva={
        restaurante: document.getElementById('restauranteRC').value,
        data: document.getElementById('dataRC').value,
        hora: document.getElementById('horaRC').value
    };

    try{

        const response = await fetch(API_RESERVA,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(novareserva)
        });
        if (!response.ok) {
            throw new Error('Erro ao realizar sua reserva: ' + response.statusText);
        }

        const salvareserva = await response.json();
        console.log('Reserva realizada, consulte os seus dados', salvareserva);

        
        alert('Reserva realizada com sucesso!');
    }catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu ao realizar sua reserva.');
    }
}

/*if(confirmar){
    confirmar.addEventListener('click', salvarreserva);
}else{
    alert('Confirmar está null');
}*/

document.addEventListener('DOMContentLoaded', function() {
    const confirmar=document.getElementById('confirmarRC');
    if (confirmar) {
        confirmar.addEventListener('click', salvarreserva);
    }
});
