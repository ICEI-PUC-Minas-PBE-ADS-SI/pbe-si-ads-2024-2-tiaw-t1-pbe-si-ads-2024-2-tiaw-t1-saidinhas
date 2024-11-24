const API_URL_RESTAURANTES = 'http://localhost:3000/restaurantes';
const API_RESERVA = 'http://localhost:3000/reservas';
let id;

function carregarRestaurantes() {
    fetch(API_URL_RESTAURANTES)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar restaurantes');
            }
            return response.json();
        })
        .then(restaurantes => {
            const select = document.getElementById('restauranteRC');
            restaurantes.forEach(restaurante => {
                const option = document.createElement('option');
                option.value = restaurante.id;
                option.textContent = restaurante.nome;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro:', error));
}

async function salvarReserva() {
    const restauranteId = document.getElementById('restauranteRC').value;
    const data = document.getElementById('dataRC').value;
    const hora = document.getElementById('horaRC').value;
    const obs = document.getElementById('tipoRC').value;

    if (!restauranteId || !data || !hora || !obs) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    try {
        const responseRestaurante = await fetch(`${API_URL_RESTAURANTES}/${restauranteId}`);
        if (!responseRestaurante.ok) {
            throw new Error('Erro ao carregar os detalhes do restaurante');
        }

        const restaurante = await responseRestaurante.json();
        const nomeRestaurante = restaurante.nome;

        const reserva = {
            restauranteId: restauranteId,
            nomeRestaurante: nomeRestaurante,
            data: data,
            hora: hora,
            obs: obs,
            status: true
        };

        const response = await fetch(API_RESERVA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reserva)
        });

        if (!response.ok) {
            throw new Error('Erro ao salvar a reserva: ' + response.statusText);
        } else {
            alert('Reserva realizada com sucesso!');
            carregarReservas();
            location.reload(true);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar a reserva: ' + error.message);
    }
}

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

                    const botao = document.createElement('button');
                    botao.id = `excluir-${id}`;
                    botao.classList.add('botao-excluir');

                    const imagem = document.createElement('img');
                    imagem.src = '../../assets/images/cesto-de-lixo.png';
                    imagem.classList.add('imagem-excluir');
                    

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
                        deleteReserva(reserva.id);
                    })
                });
                mensagemSemReservas.style.display = 'none';
                listaReservas.style.display = 'block';
            }
        })
        .catch(error => console.error('Erro:', error));
}

function deleteReserva(id, carregarReservas) {
    console.log("ID:", id);
    alert("Tem certeza que deseja cancelar sua reserva?");
    fetch(`${API_RESERVA}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert('Sua reserva foi cancelada!');
            location.reload(true);
        })
        .catch(error => {
            console.error('Erro ao remover reserva via API JSONServer:', error);
            displayMessage("Erro ao excluir contato");
        });
}

document.getElementById('confirmarRC').addEventListener('click', salvarReserva);


document.addEventListener('DOMContentLoaded', () => {
    carregarRestaurantes();
    carregarReservas();
});
