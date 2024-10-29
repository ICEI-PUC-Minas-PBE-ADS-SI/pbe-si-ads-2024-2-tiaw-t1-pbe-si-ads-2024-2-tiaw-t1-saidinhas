
const API_RESERVA = 'http://localhost:3000/reservas';

function carregarReservas() {
    fetch(API_RESERVA)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar reservas');
            }
            return response.json();
        })
        .then(reservas => {
            const listaReservas = document.getElementById('listaReservas');
            const mensagemSemReservas = document.getElementById('mensagemSemReservas');
            listaReservas.innerHTML = '';

            if (reservas.length === 0) {
                mensagemSemReservas.style.display = 'block';
                listaReservas.style.display = 'none';
            } else {
                reservas.forEach(reserva => {
                    const li = document.createElement('li');
                    li.classList.add('reserva-item'); 

                    li.innerHTML = `
                        <div class="reserva-info">
                            <span class="reserva-id">Reserva n°: ${reserva.id}</span><br>
                            <span class="reserva-restaurante">Restaurante: ${reserva.nomeRestaurante}</span><br>
                            <span class="reserva-data">Data: ${reserva.data}</span>
                            <span class="reserva-hora">Hora: ${reserva.hora}</span><br>
                            <span class="reserva-obs">Observação: ${reserva.obs}</span>
                        </div><br>
                    `;
                    listaReservas.appendChild(li);
                });
                mensagemSemReservas.style.display = 'none';
                listaReservas.style.display = 'block';
            }
        })
        .catch(error => console.error('Erro:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    carregarReservas(); 
});