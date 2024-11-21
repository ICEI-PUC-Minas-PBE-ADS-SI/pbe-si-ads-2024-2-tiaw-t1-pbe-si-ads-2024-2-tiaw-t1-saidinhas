
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

function updateReserva(id){
    console.log("ID:", id);
    alert("Tem certeza que deseja marcar essa reserva como concluida?")
    const texto = document.getElementById(`reserva-${id}`);
    texto.classList.toggle("rasurado");
}

document.addEventListener('DOMContentLoaded', () => {
    carregarReservas(); 
});