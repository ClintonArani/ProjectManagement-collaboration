// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form') as HTMLDivElement;
//     const registerForm = document.getElementById('register-form') as HTMLDivElement;
//     const showRegisterButton = document.getElementById('show-register') as HTMLButtonElement;
//     const showLoginButton = document.getElementById('show-login') as HTMLButtonElement;
//     const registrationForm = document.getElementById('registration-form') as HTMLFormElement;
//     const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

//     showRegisterButton.addEventListener('click', () => {
//         loginForm.classList.remove('active');
//         loginForm.classList.add('hidden');
//         registerForm.classList.remove('hidden');
//         registerForm.classList.add('active');
//     });

//     showLoginButton.addEventListener('click', () => {
//         registerForm.classList.remove('active');
//         registerForm.classList.add('hidden');
//         loginForm.classList.remove('hidden');
//         loginForm.classList.add('active');
//     });

//     registrationForm.addEventListener('submit', (event) => {
//         const password = (document.getElementById('register-password') as HTMLInputElement).value;
//         const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;

//         if (password!== confirmPassword) {
//             event.preventDefault();
//             errorMessage.classList.remove('hidden');
//         } else {
//             errorMessage.classList.add('hidden');
//         }
//     });
// }); // Closing 'DOMContentLoaded' event listener



const signupButton = document.getElementById('show-register') as HTMLButtonElement;
if (signupButton) {
    signupButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
}
