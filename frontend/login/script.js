document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;

    const password = document.getElementById('password').value;

    const response = await fetch('../../service/auth/loginValue.php',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    });

    const result = await response.json();
    alert(result.message);
    if(result.success){
        window.location.href='../generals/index.html'; //Redirecionar pós sucesso
    }
});

// Alternar visibilidade da senha usando ícones Font Awesome
document.querySelectorAll('.togglePassword').forEach(toggle => {
    toggle.addEventListener('click', () => {
        // Pega o campo associado ao ícone clicado
        const input = toggle.previousElementSibling;

        // Alterna o tipo do campo entre "password" e "text"
        if (input.type === 'password') {
            input.type = 'text';
            toggle.classList.remove('fa-eye');
            toggle.classList.add('fa-eye-slash'); // Muda o ícone para olho fechado
        } else {
            input.type = 'password';
            toggle.classList.remove('fa-eye-slash');
            toggle.classList.add('fa-eye'); // Muda o ícone para olho aberto
        }
    });
});