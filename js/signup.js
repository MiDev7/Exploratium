const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const errorPassword = document.querySelector('#error-password');


const passwordCheck = /^(?=.*[A-Z]{4,})(?=.*[a-z]{3,})(?=.*\d{3,})(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}).{13,}$/;


passwordInput.addEventListener('keyup', () => {
    passwordCheck.test(passwordInput.value) ? errorPassword.innerHTML = "" : errorPassword.innerHTML = "weak";
});