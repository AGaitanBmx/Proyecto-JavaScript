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

function actualizarTabla() {
    const tabla = document.getElementById('tablaInventario').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpia la tabla antes de redibujarla
    let valorTotal = 0;

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
        valorTotal += totalProducto;

        const botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = 'Eliminar';
        botonEliminar.onclick = function() {
            eliminarProducto(index);
        };
        celdaAcciones.appendChild(botonEliminar);
    });

    document.getElementById('valorTotal').innerHTML = valorTotal.toFixed(2);
}

function eliminarProducto(index) {
    inventario.splice(index, 1);
    actualizarTabla();
    guardarInventario();
}

document.getElementById('productoForm').addEventListener('submit', agregarProducto);

cargarInventario();