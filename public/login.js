const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = documents.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password ) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email,password }),
            headers: { 'content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replace('/');
        } else {
            alert( 'failed to log in. ');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const password = document.querySelector('#password-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();

    if ( password && email){
        const response = await fetch ('/api/users', {
            method: 'POST', 
            body: JSON.stringify({ password, email}),
            headers: { ' Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(' failed to sign up');
        }
    }
};

document
    .querySelector('.loginForm')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signupForm')
    .addEventListener('submit', signupFormHandler);



