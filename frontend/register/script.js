document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // Validações
    if (!/^[a-zA-Z]+\s[a-zA-Z]+$/.test(username)) {
        alert('O nome deve conter pelo menos duas palavras.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('O e-mail deve estar no formato example@gmail.com');
        return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        alert('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('As senhas não coincidem.');
        return;
    }

    // Tentativa de cadastro
    try {
        const response = await fetch('../../service/auth/registerValue.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, passwordConfirm }),
        });

        const result = await response.json();
        alert(result.message);

        if (result.success) {
            window.location.href = '../generals/index.html'; // Redirecionar pós sucesso
        }
    } catch (error) {
        alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
        console.error('Erro:', error);
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