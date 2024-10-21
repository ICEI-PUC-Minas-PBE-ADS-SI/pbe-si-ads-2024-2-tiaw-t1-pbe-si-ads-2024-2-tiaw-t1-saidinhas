
const API_RESERVA='http://localhoost:3000/reserva';
const_URL = '/assets/reserva/reserva.html';

var db_reserva = {};

const confirmar=document.getElementById('confirmarRC');

async function salvarreserva(){

    const novareserva={
        restaurante:document.getElementById('restauranteRC').value,
        data:document.getElementById('dataRC').value,
        hora:document.getElementById('horaRC').value
    }


    fetch(API_RESERVA,{
        method: 'POST',
        Headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(novareserva)
    })
    .then(response => response.json())
        .then(data => {
            
            db_reserva.push (novareserva);
            document.getElementById('consultarRC').innerText=JSON.stringify(db_reserva)
            
        })
    
    .catch (erro=>{
        document.getElementById('consultarRC').innerText='Ocorreu um erro:' + erro.message;
    });

}


confirmar.addEventListener('click', salvarreserva);

