const productos = [];
const carrito = [];
var totalFinal = 0;

window.addEventListener("load", () => {
    fetch('https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/products')
    .then(response => response.json())
    .then(data => mostrarPlatos(data))
    .catch(error => console.error('Error: ', error));
});

function mostrarPlatos(platos) {
    const entradas = document.getElementById("entradas");
    const platosFuertes = document.getElementById("platos_fuertes");
    const bebidas = document.getElementById("bebidas");
    const postres = document.getElementById("postres");

    entradas.innerHTML = "";
    platosFuertes.innerHTML = "";
    bebidas.innerHTML = "";
    postres.innerHTML = "";
    console.log(platos);
    platos.forEach((plato) => {
        console.log(plato);
        productos.push(plato);
        const platoHtml = `
            <article class="plato">
                <img src="${plato.image}" alt="${plato.name}">
                <div>     
                    <h3 class="nombre">${plato.name}</h3>
                    <p class="descripcion">${plato.description}</p>
                </div>
                <div>
                    <p class="precio">$ ${plato.price}</p>
                    <button class="agregar-carrito" onclick="agregarAlCarrito(${plato.id})">Agregar al carrito</button>
                </div>
            </article>
        `;

        switch (plato.category) {
            case "Entrada":
                entradas.innerHTML += platoHtml;
                break;
            case "Plato Principal":
                platosFuertes.innerHTML += platoHtml;
                break;
            case "Bebidas":
                bebidas.innerHTML += platoHtml;
                break;
            case "Postres":
                postres.innerHTML += platoHtml;
                break;
            default:
                console.error("La categoría no existe: " + plato.Categoria);
                break;
        }
    })
}


function agregarAlCarrito(id) {
    console.log(productos);
    const plato = productos.find((plato) => plato.id === id);
    carrito.push(plato);
    console.log(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const precioTotal = document.getElementById("total")
    listaCarrito.innerHTML = "";
    carrito.forEach((plato, index) => {
        const platoHtml = `
            <article class="plato">
                <img src="${plato.image}" alt="${plato.name}">
                <div>     
                    <h3 class="nombre">${plato.name}</h3>
                    <p class="descripcion">${plato.description}</p>
                </div>
                <div>
                    <p class="precio">$ ${plato.price}</p>
                    <button class="agregar-carrito" onclick="eliminarPlato(${index})">Eliminar</button>
                </div>
            </article>`;
        listaCarrito.innerHTML += platoHtml;
    })
    precioTotal.innerHTML = `${obtenerTotal()}`;
}

function obtenerTotal(){
    var valor = 0;
    carrito.forEach((plato) => {
        valor += plato.price;
        totalFinal = valor;
    })
    return valor;
}

function eliminarPlato(index){
    carrito.splice(index, 1);
    mostrarCarrito();
}

function enviarPedido() {
    const nombre = document.getElementById("name").value;
    const direccion = document.getElementById("address").value;
    const telefono = document.getElementById("phone").value;
    const tarjeta = document.getElementById("card").value;
    const body = {
        name: nombre,
        address: direccion,
        phone: telefono,
        card: tarjeta
    };

    fetch('https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/clients', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Se subieron los datos', data);
        alert('Se ha enviado el pedido');
        enviarOrden(data);
    })
    .catch(error => console.error('Error: ', error));
}

function enviarOrden(data) {
    carroFinal = JSON.stringify(carrito);
    const bodyOrder = {
        client_id: '1',
        cart: 'No entregado',
        total: totalFinal
    }
    fetch('https://proyecto-restaurante-jdmeandssm-web20241.onrender.com/api/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyOrder)
    })
    .then(response => response.text())
    .then(data => console.log('Se subieron los datos', data))
    .catch(error => console.error('Error: ', error));
}
