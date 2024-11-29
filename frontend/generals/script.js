async function loadUser() {
    try{
        const response = await fetch('../../service/auth/getUser.php');
        const result = await response.json();

        if (result.success){
            document.getElementById('welcomeMessage').textContent =`Bem-vindo ao Painel, ${result.username}`;

        } else{
            alert('Erro ao carregar o usuário:' + result.message);
            window.location.href = '../login/index.html';

        }
    } catch (error){
        console.error('Erro ao buscar usuário:', error);
    }
    
}

document.addEventListener('DOMContentLoaded',loadUser);

// Logout
document.getElementById('logout').addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('../../service/auth/logout.php');
    const result = await response.json();
    alert(result.message);
    window.location.href = '../login/index.html';
});