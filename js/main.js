const productos = [
    {
        id: "1",
        nombre: "Nike Dunk Panda",
        detalle: "Zapatillas de hombre",
        precio: 209.999,
        img: "../img/nikedunkpanda.webp",
    },
    {
        id: "2",
        nombre: "Nike Dunk Low Retro",
        detalle: "Zapatillas de hombre",
        precio: 219.999,
        img: "../img/nikedunklowretro.webp",
    },
    {
        id: "3",
        nombre: "Nike Jordan 1 mid ",
        detalle: "Zapatillas de hombre",
        precio: 249.999,
        img: "../img/jordan1mid.webp",
    },
    {
        id: "4",
        nombre: "Nike Jordan 1 Retro ",
        detalle: "Zapatillas de hombre",
        precio: 309.999,
        img: "../img/jorda1retro.webp",
    },
    {
        id: "5",
        nombre: "Nike Air Max 1",
        detalle: "Zapatillas de hombre",
        precio: 289.999,
        img: "../img/airmax1blue.webp",
    },
    {
        id: "6",
        nombre: "Nike Air Max 1",
        detalle: "Zapatillas de hombre",
        precio: 289.999,
        img: "../img/airmax1.webp",
    },
    {
        id: "7",
        nombre: "Nike Air Force 1 Red",
        detalle: "Zapatillas de hombre",
        precio: 259.999,
        img: "../img/airforce1red.webp",
    },
    {
        id: "8",
        nombre: "Nike Air Force 1 Low",
        detalle: "Zapatillas de hombre",
        precio: 279.999,
        img: "../img/airforce1low.webp",
    }
];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const contenedorProductos = document.querySelector("#productos");
const cartList = document.getElementById('cartItems');
const totalCarrito = document.getElementById('total-carrito');

// Crea los elementos de los productos y los agrega al contenedorProductos
function mostrarProductos() {
    productos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.img}">
            <h3>${producto.nombre}</h3>
            <p class="detalle">${producto.detalle}</p>
            <p class="precio">$${producto.precio.toLocaleString('es-ES', {style: 'currency', currency: 'ARS'})}</p>
        `;
        let button = document.createElement("button");
        button.classList.add("producto-btn");
        button.innerText = "Agregar al carrito";
        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
        div.append(button);
        contenedorProductos.append(div);
    });
}

// Agrega un producto al carrito
function agregarAlCarrito(producto) {
    const itemEncontrado = carrito.find(item => item.id === producto.id);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    actualizarCarrito();
}

// Actualiza el contenido del carrito
function actualizarCarrito() {
    cartList.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x ${item.cantidad}`;
        cartList.appendChild(li);
    });
    const total = calcularTotalCompra();
    totalCarrito.textContent=`Total: $${total.toFixed(2) }`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

 // Función para calcular el total de la compra
function calcularTotalCompra() {
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });
    return total;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito.length = 0;
    actualizarCarrito();
}

// Abre la ventana emergente del carrito
function openModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    modal.style.display = 'block';
    overlay.style.display = 'block';
    actualizarCarrito();
}

// Cierra la ventana emergente del carrito
function closeModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Carga los productos al cargar la página
window.onload = function() {
    mostrarProductos();
};


document.addEventListener('DOMContentLoaded', function () {
    const btnCarrito = document.getElementById('btn-carrito');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const btnCerrarModal = document.getElementById('cerrar-modal');
    const btnVaciarCarrito = document.getElementById('vaciar-carrito');

    btnCarrito.addEventListener('click', function () {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        actualizarCarrito();
    });

    overlay.addEventListener('click', function () {
        closeModal();
    });

    btnCerrarModal.addEventListener('click', function () {
        closeModal();
    });

    btnVaciarCarrito.addEventListener('click', function () {
        vaciarCarrito();
    });
});

function closeModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}




actualizarCarrito();

