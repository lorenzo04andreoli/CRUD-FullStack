document.addEventListener('DOMContentLoaded', async () => {
    // Buscar informações do usuário
    try {
        const response = await fetch('../../service/auth/getUser.php');
        const result = await response.json();

        if (result.success) {
            // Atualizar mensagem de boas-vindas
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bem-vindo ao Painel, ${result.username}`;
            } else {
                console.error("Elemento com ID 'welcomeMessage' não encontrado.");
            }
        } else {
            alert('Erro ao carregar o usuário: ' + result.message);
            window.location.href = '../login/index.html';
        }
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }

    // Registrar evento de logout
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('../../service/auth/logout.php');
                const result = await response.json();
                alert(result.message);
                window.location.href = '../login/index.html';
            } catch (error) {
                console.error('Erro ao processar logout:', error);
            }
        });
    } else {
        console.error("Botão de logout não encontrado.");
    }
});
