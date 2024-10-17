let inventario = [];

function cargarInventario() {
    const inventarioGuardado = localStorage.getItem('inventario');
    if (inventarioGuardado) {
        inventario = JSON.parse(inventarioGuardado);
        actualizarTabla();
    }
}

function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

function agregarProducto(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);

    const producto = {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio
    };

    inventario.push(producto);
    
    actualizarTabla();
    guardarInventario();
    
    document.getElementById('productoForm').reset();
}

async function actualizarTabla() {
    const tabla = document.getElementById('tablaInventario').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    let valorTotalPesos = 0;

    inventario.forEach((producto, index) => {
        const fila = tabla.insertRow();
        
        const celdaNombre = fila.insertCell(0);
        const celdaCantidad = fila.insertCell(1);
        const celdaPrecio = fila.insertCell(2);
        const celdaTotal = fila.insertCell(3);
        const celdaAcciones = fila.insertCell(4);

        celdaNombre.innerHTML = producto.nombre;
        celdaCantidad.innerHTML = producto.cantidad;
        celdaPrecio.innerHTML = `$${producto.precio.toFixed(2)}`;
        const totalProducto = producto.cantidad * producto.precio;
        celdaTotal.innerHTML = `$${totalProducto.toFixed(2)}`;
        valorTotalPesos += totalProducto;

        const botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = 'Eliminar';
        botonEliminar.classList.add('btn-eliminar');
        botonEliminar.onclick = function() {
            eliminarProducto(index);
        };
        celdaAcciones.appendChild(botonEliminar);
    });

    document.getElementById('valorTotal').innerHTML = `$${valorTotalPesos.toFixed(2)}`;


    const precioDolar = await obtenerPrecioDolarOficial();
    if (precioDolar) {
        const valorTotalDolares = valorTotalPesos / precioDolar;
        const totalDolaresElement = document.getElementById('valorTotalDolares');
        totalDolaresElement.innerHTML = `Valor Total en Dólares: $${valorTotalDolares.toFixed(2)}`;
        totalDolaresElement.classList.add('dolar-estilizado');
    } else {
        document.getElementById('valorTotalDolares').innerHTML = "Error al obtener el valor en dólares";
    }
}

function eliminarProducto(index) {
    inventario.splice(index, 1);
    actualizarTabla();
    guardarInventario();
}

//Api para obtener el precio del dolar en pesos Argentinos.
async function obtenerPrecioDolarOficial() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
        const data = await response.json();
        return data.venta;
    } catch (error) {
        console.error('Error al obtener el precio del dólar:', error);
        return null;
    }
}

document.getElementById('productoForm').addEventListener('submit', agregarProducto);

cargarInventario(); 

obtenerPrecioDolarOficial();

function descargarInventarioJSON() {
    const dataStr = JSON.stringify(inventario, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventario.json';
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a); 
}

function agregarBotonDescarga() {
    const botonDescarga = document.createElement('button');
    botonDescarga.innerHTML = 'Descargar Inventario en JSON';
    botonDescarga.classList.add('btn-descarga');
    botonDescarga.onclick = descargarInventarioJSON;

    const contenedor = document.getElementById('boton_json');
    contenedor.appendChild(botonDescarga);
}

document.addEventListener('DOMContentLoaded', agregarBotonDescarga);

const images = [
    './images/inventario (1).png',
    './images/inventario (2).png',
    './images/inventario.png'
];

const seccionImagenes = document.getElementById('seccionImagenes');

for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = images[i];
    img.alt = `Imagen ${i + 1}`; 
    img.classList.add('imgDescriptiva');


    seccionImagenes.appendChild(img);
}
