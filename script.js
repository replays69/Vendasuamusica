document.addEventListener("DOMContentLoaded", function() {
    // Página de registro de usuário
    const registerForm = document.getElementById('registerForm');
    const errorDisplay = document.getElementById('error');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();

            if (username && email) {
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);
                localStorage.setItem('coins', 0); // Inicializa as moedas com 0
                window.location.href = 'game.html';
            } else {
                errorDisplay.textContent = 'Por favor, insira um nome de usuário e e-mail válidos.';
            }
        });
    }

    // Página do jogo
    const usernameDisplay = document.getElementById('usernameDisplay');
    const scoreDisplay = document.getElementById('score');
    const coinsDisplay = document.getElementById('coins');
    const clickButton = document.getElementById('clickButton');
    const resetButton = document.getElementById('resetButton');

    if (usernameDisplay) {
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        let coins = parseInt(localStorage.getItem('coins')) || 0;
        if (!username || !email) {
            window.location.href = 'index.html';
        } else {
            usernameDisplay.textContent = username;
            coinsDisplay.textContent = `Moedas: ${coins}`;
        }

        let score = parseInt(localStorage.getItem('score')) || 0;
        scoreDisplay.textContent = `Pontos: ${score}`;

        function changeButtonColor() {
            clickButton.style.backgroundColor = '#28a745'; // Verde
            setTimeout(() => {
                clickButton.style.backgroundColor = '#007bff'; // Volta à cor original
            }, 200); // 200ms
        }

        function celebrate() {
            scoreDisplay.classList.add('celebration');
            setTimeout(() => {
                scoreDisplay.classList.remove('celebration');
            }, 500);
        }

        clickButton.addEventListener('click', function() {
            score++;
            scoreDisplay.textContent = `Pontos: ${score}`;
            localStorage.setItem('score', score); // Armazena a pontuação
            changeButtonColor(); // Muda a cor do botão

            if (score % 100 === 0) {
                coins++;
                localStorage.setItem('coins', coins); // Armazena as moedas
                coinsDisplay.textContent = `Moedas: ${coins}`;
                celebrate(); // Animação de celebração
            }
        });

        resetButton.addEventListener('click', function() {
            score = 0;
            scoreDisplay.textContent = `Pontos: ${score}`;
            localStorage.setItem('score', score); // Reseta a pontuação armazenada
        });
    }
});
