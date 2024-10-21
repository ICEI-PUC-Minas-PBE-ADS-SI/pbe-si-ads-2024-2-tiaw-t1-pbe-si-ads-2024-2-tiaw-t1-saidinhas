const API_RESERVA='http://localhoost:3000/reserva';
const_URL = '/assets/reserva/reserva.html';

var db_reserva={};

.then(response => response.json())
        .then(data => {
            
            db_reserva.push;
            document.getElementById('Reservas').innerText=JSON.stringify(db_reserva);
            
        })
.catch (erro=>{
            document.getElementById('consultarRC').innerText='Ocorreu um erro:' + erro.message;
 });  
