const API_URL_RESTAURANTES = 'http://localhost:3000/restaurantes';
const API_RESERVA = 'http://localhost:3000/reservas';

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

    if (!restauranteId || !data || !hora) {
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
            hora: hora
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
                    const li = document.createElement('li');
                    li.textContent = `Restaurante: ${reserva.nomeRestaurante}, Data: ${reserva.data}, Hora: ${reserva.hora}`;
                    listaReservas.appendChild(li);
                });
                mensagemSemReservas.style.display = 'none';
                listaReservas.style.display = 'block';
            }
        })
        .catch(error => console.error('Erro:', error));
}

document.getElementById('confirmarRC').addEventListener('click', salvarReserva);

document.addEventListener('DOMContentLoaded', () => {
    carregarRestaurantes();
    carregarReservas(); 
});
