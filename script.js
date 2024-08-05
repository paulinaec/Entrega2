const servicios = [
    {id: 1, 
    nombre: "Consulta de Fisioterapia",
    precio: 350,
    },
    {
    id: 2,
    nombre:"Sesion Fisioterapia",
    precio: 400,
    },
    {
    id:3,
    nombre:"Sesion de Puncion Seca",
    precio: 700,
    },
    {
    id: 4,
    nombre: "Kinesiotape",
    precio: 300,
    },
    {
    id: 5,
    nombre: "Masaje Descontracturante",
    precio: 500,
    },
    {
    id: 6,
    nombre: "Sesion Radio Frecuencia",
    precio: 400,
    },
]
//console.log(servicios);
localStorage.setItem("servicios", JSON.stringify(servicios))
let serviciosDeStorage = JSON.parse(localStorage.getItem("servicios"))

class Servicios {
    constructor(id, nombre, precio, stock){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    }
}


let carrito = [];

function mostrarServicios() {
    const contenedorServicios = document.getElementById('servicios');
    if (contenedorServicios) {
        serviciosDeStorage.forEach(servicio => {
            const div = document.createElement('div');
            div.classList.add('servicio-item');
            div.innerHTML = `
                <h3>${servicio.nombre}</h3>
                <p>Precio: $${servicio.precio}</p>
                <button onclick="agregarAlCarrito(${servicio.id})">Agregar al carrito</button>
            `;
            contenedorServicios.appendChild(div);
        });
    } else {
        console.error('Elemento con id "servicios" no encontrado');
    }
}


function agregarAlCarrito(id) {
    const servicio = serviciosDeStorage.find(s => s.id === id);
    if (servicio) {
        carrito.push(servicio);
        alert(`Has agregado ${servicio.nombre} al carrito.`);
        actualizarCarrito();
        guardarCarrito();
    } else {
        console.error('Servicio no encontrado');
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(servicio => servicio.id !== id);
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    const contenedorServicios = document.getElementById('carrito-contenedor');
        contenedorServicios.innerHTML = ' ';
        carrito.forEach((servicio, id) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <p>${servicio.nombre} - $${servicio.precio}</p>
        <button class="eliminar-boton" onclick="eliminarDelCarrito(${servicio.id})">Eliminar</button>
        `;
        contenedorServicios.appendChild(div);
        });

    const total = carrito.reduce((sum, servicio) => sum + servicio.precio, 0);
    document.getElementById('total').textContent = `Total: $${total}`; 
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoDeStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoDeStorage) {
        carrito = carritoDeStorage;
        actualizarCarrito();
    }
}

function mostrarModal(mensaje) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="cerrarModal()">&times;</span>
            <p>${mensaje}</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarServicios();
    cargarCarrito();
});



