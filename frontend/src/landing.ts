
document.addEventListener('DOMContentLoaded', () => {
    const registerBtn = document.getElementById('register-btn') as HTMLButtonElement;

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.href = "register.html";
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const welcomeSection = document.querySelector('.welcome-section') as HTMLElement | null;
        if (welcomeSection) {
            welcomeSection.classList.add('show-welcome-section');
        }
    }, 3000);
});

const loginButton = document.getElementById('login-btn') as HTMLButtonElement | null;
if (loginButton) {
    loginButton.addEventListener('click', () => {
        window.location.href = 'log.html';
    });
}
