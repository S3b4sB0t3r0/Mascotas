document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');

    // Manejar el cambio entre formularios
    const toRegisterLink = document.getElementById('toRegister');
    const toLoginLink = document.getElementById('toLogin');

    if (toRegisterLink) {
        toRegisterLink.addEventListener('click', () => {
            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        });
    }

    if (toLoginLink) {
        toLoginLink.addEventListener('click', () => {
            registerContainer.style.display = 'none';
            loginContainer.style.display = 'block';
        });
    }

    // Manejar el formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío del formulario de manera tradicional

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8080/usuario?correo_user=' + encodeURIComponent(username), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const users = await response.json();

                const user = users.find(u => u.correo_user === username && u.password === password); // Verifica el usuario

                if (user) {
                    alert('Inicio de sesión exitoso');
                    window.location.href = 'indexTienda.html'; // Redirige al usuario
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al iniciar sesión');
            }
        });
    }
});
// Manejar el formulario de registro
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario de manera tradicional

        const newUsername = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('newPassword').value;

        const newUser = {
            nombre_user: newUsername,
            correo_user: email,
            password: newPassword
        };

        try {
            const response = await fetch('http://localhost:8080/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Registro exitoso');
                // Después de registrar, cambiar a la vista de login
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            } else {
                alert('Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrar el usuario');
        }
    });
}

