function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = 'https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/login';
    const body = {
        email: email,
        password: password
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error');
    })
    .then(data => mostrarCosa())
    .catch(error => {
        console.error('Error: ', error);
        alert('Usuario o contraseña incorrectos');
    });
}

function mostrarCosa () {
    const dashboard = document.getElementById("datos");

    dashboard.innerHTML = `
        <h1>Bienvenido, ¿qué desea ver?</h1>
        <button onclick="mostrarClientes()">Clientes</button>
        <button onclick="mostrarOrdenes()">Ordenes</button>
        <button onclick="mostrarUsuarios()">Usuarios</button>
    `;
}

function mostrarOrdenes () {
    const vista = document.getElementById("vista");
    const urlOrders = 'https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/orders';

    fetch(urlOrders)
    .then(response => response.json())
    .then(data => ponerOrdenes(data))
    .catch(error => console.error('Error: ', error));
}

function mostrarClientes () {
    const vista = document.getElementById("vista");
    const urlClients = 'https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/clients';

    fetch(urlClients)
    .then(response => response.json())
    .then(data => ponerClientes(data))
    .catch(error => console.error('Error: ', error));
}

function mostrarUsuarios () {
    const vista = document.getElementById("vista");
    const urlUsers = 'https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/users';

    fetch(urlUsers)
    .then(response => response.json())
    .then(data => ponerUsuarios(data))
    .catch(error => console.error('Error: ', error));
}

function ponerClientes(clientes) {
    console.log(clientes);
    vista.innerHTML= "";
    clientes.forEach((cliente) => {
        console.log(cliente);
        const productoHTML = `
            <article class="dato">
                <div>     
                    <h3>Nombre: ${cliente.name}</h3>
                    <p>Direccion: ${cliente.address}</p>
                    <p>Telefono: ${cliente.phone}</p>
                    <p>Tarjeta: ${cliente.card}</p>
                </div>
            </article>
        `;
        vista.innerHTML += productoHTML;
    })
}

function ponerOrdenes(ordenes) {
    console.log(ordenes);
    vista.innerHTML= "";
    ordenes.forEach((orden) => {
        console.log(orden);
        const ordenHTML = `
            <article class="dato">
                <div>     
                    <h3>ID cliente: ${orden.client_id}</h3>
                    <p>Nombre Cliente: ${orden.clients.name}</p>
                    <p>Productos: ${orden.products.name}</p>
                    <p>Total: ${orden.total}</p>
                </div>
            </article>
        `;
        vista.innerHTML += ordenHTML;
    })
}

function ponerUsuarios(users) {
    console.log(users);
    vista.innerHTML= "";
    users.forEach((user) => {
        console.log(user);
        const userHTML = `
            <article class="dato">
                <div>     
                    <h3>Username: ${user.name}</h3>
                    <p>Email: ${user.email}</p>
                </div>
            </article>
        `;
        vista.innerHTML += userHTML;
    })
}