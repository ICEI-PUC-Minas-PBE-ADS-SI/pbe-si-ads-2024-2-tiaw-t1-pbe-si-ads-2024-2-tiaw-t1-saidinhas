
const API_RESERVA = 'http://localhost:3000/reservas';
let id;

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
                    id = reserva.id;
                    modo = reserva.status;
                    const li = document.createElement('li');
                    li.classList.add('reserva-item');
                    li.id = `reserva-${id}`;

                    const botao = document.createElement('button');
                    botao.id = `concluir-${id}`;
                    botao.classList.add('botao-concluir');

                    const imagem = document.createElement('img');
                    imagem.src = '../../assets/images/verificar.png';
                    imagem.classList.add('imagem-concluir');

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
                    botao.appendChild(imagem);
                    li.appendChild(botao);

                    botao.addEventListener('click', () => {
                        console.log(`Botão da reserva ${reserva.id} clicado!`);
                        updateReserva(reserva.id);

                    })
                });
                mensagemSemReservas.style.display = 'none';
                listaReservas.style.display = 'block';
            }
        })
        .catch(error => console.error('Erro:', error));
}

function updateReserva(id, carregarReservas) {
    console.log("ID:", id);
    fetch(`${API_RESERVA}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(reserva => {
            reserva.status = false;
            alert("Tem certeza que deseja concluir esta reserva?");
            fetch(`${API_RESERVA}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reserva)
            })
                .then(response => response.json())
                .then(data => {
                    alert('A reserva em seu restaurante foi concluida!');
                })
                .catch(error => {
                    console.error('Erro ao concluir reserva via API JSONServer:', error);
                    displayMessage("Erro ao concluir contato");
                });

        })
        .catch(error => {
            console.error('Erro ao obter reserva via API JSONServer:', error);
            displayMessage("Erro ao obter reserva");
        });
    ReservaConcluida(id);
}
function ReservaConcluida(id) {
    fetch(`${API_RESERVA}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(reserva => {
            if (reserva.status == false) {
                const texto = document.getElementById(`reserva-${id}`);
                texto.classList.toggle("active");
            }
        })
        .catch(error => {
            console.error('Erro ao obter reserva via API JSONServer:', error);
            displayMessage("Erro ao obter reserva");
        });
}


document.addEventListener('DOMContentLoaded', () => {
    carregarReservas();
});