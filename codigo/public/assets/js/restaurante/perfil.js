document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profile-form');
    const userId = 1;

    async function fetchProfileData() {
        try {
            const response = await fetch(`http://localhost:3000/usuariosRestaurante/${userId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do perfil');
            }
            const userData = await response.json();

            document.getElementById('nome').value = userData.nome;
            document.getElementById('cnpj').value = userData.cnpj;
            document.getElementById('email').value = userData.email;
            document.getElementById('cep').value = userData.cep;
            document.getElementById('logradouro').value = userData.logradouro;
            document.getElementById('bairro').value = userData.bairro;
            document.getElementById('cidade').value = userData.cidade;
            document.getElementById('estado').value = userData.estado;
            document.getElementById('senha').value = userData.senha;

        } catch (error) {
            console.error(error);
            alert('Não foi possível carregar os dados do perfil.');
        }
    }

    async function saveProfileData(event) {
        event.preventDefault();

        const formData = {
            nome: document.getElementById('nome').value,
            cnpj: document.getElementById('cnpj').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').value,
            bairro: document.getElementById('bairro').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value,
            senha: document.getElementById('senha').value,
        };

        try {
            const response = await fetch(`http://localhost:3000/usuariosRestaurante/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar os dados do perfil');
            }

            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao salvar os dados. Verifique sua conexão.');
        }
    }

    form.addEventListener('submit', saveProfileData);

    fetchProfileData();
});
