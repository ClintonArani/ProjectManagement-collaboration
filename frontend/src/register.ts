let user_firstname = document.getElementById("firstname") as HTMLInputElement;
let user_lastname = document.getElementById("lastname") as HTMLInputElement;
let user_image = document.getElementById("image") as HTMLInputElement; // Assuming this is now a text input for URL
let user_phonenumber = document.getElementById("phonenumber") as HTMLInputElement;
let user_email = document.getElementById("email") as HTMLInputElement;
let user_password = document.getElementById("password") as HTMLInputElement;

let successMessage = document.querySelector('.success-msg') as HTMLParagraphElement;
let errorMessage = document.querySelector('.error-msg') as HTMLParagraphElement;

let registrationForm = document.getElementById("registrationForm") as HTMLFormElement;

registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstname = user_firstname.value.trim();
    let lastname = user_lastname.value.trim();
    let phone = user_phonenumber.value.trim();
    let email = user_email.value.trim();
    let password = user_password.value.trim();
    let image = user_image.value.trim();

    let user = firstname !== '' && lastname !== '' && image !== '' && phone !== '' && email !== '' && password !== '';

    if (user) {
        fetch('http://localhost:5300/users/create', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                FirstName: firstname,
                LastName: lastname,
                phone_number: phone,
                email: email,
                password: password,
                user_image: image
            })
        })
        .then(response => response.json())
        .then(res => {
            if (res.error) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = res.error;

                setTimeout(() => {
                    errorMessage.textContent = '';
                    errorMessage.style.display = 'none';
                }, 3000);
            } else {
                successMessage.style.display = 'block';
                successMessage.textContent = res.message;

                user_firstname.value = '';
                user_lastname.value = '';
                user_phonenumber.value = '';
                user_email.value = '';
                user_image.value = '';
                user_password.value = '';

                setTimeout(() => {
                    successMessage.textContent = '';
                    successMessage.style.display = 'none';

                    navigateToLogin();
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Registration failed. Please try again.';

            setTimeout(() => {
                errorMessage.textContent = '';
                errorMessage.style.display = 'none';
            }, 3000);
        });
    }
});

function navigateToLogin() {
    window.location.href = 'log.html';
}
function fetchAndDisplayUserName() {
    // Retrieve user ID from local storage
    const user_id = localStorage.getItem('id');
    if (!user_id) {
        console.error('User ID not found in local storage.');
        return;
    }

    // Fetch user data from the API
    fetch(`http://localhost:5300/users/${user_id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET"
    })
    .then(response => response.json())
    .then(user => {
        // Update the welcome message with the user's first name and last name
        const welcomeNameElement = document.getElementById('welcome-name') as HTMLSpanElement;
        welcomeNameElement.textContent = `${user.FirstName} ${user.LastName}`;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayUserName);

