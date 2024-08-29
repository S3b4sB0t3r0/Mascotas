document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    
    // Manejar el cambio entre formularios
    document.getElementById('toRegister').addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    document.getElementById('toLogin').addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Manejar el formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
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

    // Manejar el formulario de registro
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario de manera tradicional

        const newUsername = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('newPassword').value;

        const userData = {
            id_user: Date.now(), // Genera un ID único
            nombre_user: newUsername,
            correo_user: email,
            password: newPassword // Incluye el campo de contraseña
        };

        try {
            const response = await fetch('http://localhost:8080/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registro exitoso');
                loginContainer.style.display = 'block';
                registerContainer.style.display = 'none';
            } else {
                throw new Error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrarse');
        }
    });

    // Manejar el formulario de subida de productos
    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario de manera tradicional

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        if (!productImage) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const imageDataUrl = reader.result;

            const productData = {
                name: productName,
                price: productPrice,
                image: imageDataUrl // Guardar la imagen como Data URL
            };

            try {
                const response = await fetch('http://localhost:8080/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });

                if (response.ok) {
                    alert('¡Producto agregado exitosamente!');
                    document.getElementById('uploadForm').reset(); // Limpiar el formulario
                } else {
                    throw new Error('Error al agregar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al agregar el producto.');
            }
        };
        reader.readAsDataURL(productImage);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    
    // Manejar el cambio entre formularios
    document.getElementById('toRegister').addEventListener('click', () => {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    document.getElementById('toLogin').addEventListener('click', () => {
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Manejar el formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
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

    // Manejar el formulario de registro
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario de manera tradicional

        const newUsername = document.getElementById('newUsername').value;
        const email = document.getElementById('email').value;
        const newPassword = document.getElementById('newPassword').value;

        const userData = {
            id_user: Date.now(), // Genera un ID único
            nombre_user: newUsername,
            correo_user: email,
            password: newPassword // Incluye el campo de contraseña
        };

        try {
            const response = await fetch('http://localhost:8080/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                alert('Registro exitoso');
                loginContainer.style.display = 'block';
                registerContainer.style.display = 'none';
            } else {
                throw new Error('Error al registrar el usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrarse');
        }
    });

    // Manejar el formulario de subida de productos
    document.getElementById('uploadForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío del formulario de manera tradicional

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productImage = document.getElementById('productImage').files[0];

        if (!productImage) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const imageDataUrl = reader.result;

            const productData = {
                name: productName,
                price: productPrice,
                image: imageDataUrl // Guardar la imagen como Data URL
            };

            try {
                const response = await fetch('http://localhost:8080/product', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(productData)
                });

                if (response.ok) {
                    alert('¡Producto agregado exitosamente!');
                    document.getElementById('uploadForm').reset(); // Limpiar el formulario
                } else {
                    throw new Error('Error al agregar el producto');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un error al agregar el producto.');
            }
        };
        reader.readAsDataURL(productImage);
    });
});
