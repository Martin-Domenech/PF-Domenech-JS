class Producto {
    constructor(nombre, precio, img, stock, categoria) {
      this.nombre = nombre;
      this.precio = precio;
      this.img = img;
      this.stock = stock;
      this.categoria = categoria;
    }
}
let productosGlobal = [];

const contenedor = document.getElementById('grid-store');

function agregarProductos(productos) {
    contenedor.innerHTML = '';
    productosGlobal = productos;
    if (productos.length > 0) {
        productos.forEach(producto => {
            const divGridItem = document.createElement('div');
            divGridItem.classList.add('grid-item-store');

            const imagen = document.createElement('img');
            imagen.src = producto.img;
            imagen.alt = producto.nombre;
            divGridItem.appendChild(imagen);

            const divTextStore = document.createElement('div');
            divTextStore.classList.add('text-store');

            const nombreParrafo = document.createElement('p');
            nombreParrafo.textContent = producto.nombre;
            divTextStore.appendChild(nombreParrafo);

            const precioParrafo = document.createElement('p');
            precioParrafo.classList.add('precio');
            precioParrafo.textContent = `$${producto.precio}`;
            divTextStore.appendChild(precioParrafo);
            
            const divBoton = document.createElement('div');
            divBoton.classList.add('div-boton');
            divTextStore.appendChild(divBoton);

            const form = document.createElement('form');
            form.id = 'agregarAlCarritoForm';
            form.method = 'get';
            divBoton.appendChild(form);

            const boton = document.createElement('button');
            boton.type = "submit";
            boton.classList.add('btn', 'btn-dark');
            boton.addEventListener('click', function() {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tu producto ha sido agregado al carrito',
                    showConfirmButton: false,
                    timer: 1500
                });
            });

            if(producto.stock > 0){
                boton.textContent = 'Agregar al carrito';
                boton.addEventListener('click', function() {
                    let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || [];
                    carritoProductos.push(producto);
                    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
                    console.log(carritoProductos);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Tu producto ha sido agregado al carrito',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            }
            else{
                boton.textContent = 'Sin stock';
                boton.disabled = true;
            }

            form.appendChild(boton);

            divGridItem.appendChild(divTextStore);

            contenedor.appendChild(divGridItem);
        });
    } else {
        const divNoProducto = document.createElement('div');
        divNoProducto.classList.add('no-producto');
        divNoProducto.innerHTML = `<h4>No se ha encontrado ningún producto</h4>`;
        contenedor.appendChild(divNoProducto);
    }
}


document.getElementById('filtroForm').addEventListener('submit', function(event){
    event.preventDefault();
    const nombreProducto = document.getElementById('nombreProducto').value;
    filtroProductos(nombreProducto);
});

document.querySelector('.btn-hombre').addEventListener('click', function(){
    productosJSON('hombre');
});

document.querySelector('.btn-mujer').addEventListener('click', function(){
    productosJSON('mujer'); 
});

document.querySelector('.btn-nino').addEventListener('click', function(){
    productosJSON('nino'); 
});

document.querySelector('.btn-accesorio').addEventListener('click', function(){
    productosJSON('accesorio'); 
});

document.querySelector('.btn-inicio').addEventListener('click', function(){
    productosJSON(); 
});

function filtroProductos(nombre) {
    const nombreFiltro = nombre.trim().toUpperCase();
    const productosFiltrados = productosGlobal.filter(producto => producto.nombre.toUpperCase().includes(nombreFiltro));
    contenedor.innerHTML = '';
    agregarProductos(productosFiltrados);
}

function productosJSON(categoria = '') {
    fetch('productos.json')
        .then(response => response.json())
        .then(productos => {
            if (categoria) {
                productos = productos.filter(producto => producto.categoria === categoria);
            }
            agregarProductos(productos);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

productosJSON();