let precioTotal = 0;


function agregarAlCarrito() {
    const carrito = document.getElementById('carrito-secction');
    const carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || [];

    const contadorProductos = {};

    carritoProductos.forEach((producto) => {
        contadorProductos[producto.nombre] = (contadorProductos[producto.nombre] || 0) + 1;
    });

    carritoProductos.forEach((producto, index) => {
        const productoYaAgregado = document.querySelector(`.carrito-js[data-producto="${producto.nombre}"]`);
        if (productoYaAgregado) {
            const cantidadElement = productoYaAgregado.querySelector('.cantidad');
            cantidadElement.textContent = `x${contadorProductos[producto.nombre]}`;
        } else {
            const divCarrito = document.createElement('div');
            divCarrito.classList.add('carrito-js');
            divCarrito.setAttribute('data-producto', producto.nombre);

            const item = document.createElement('div');
            item.classList.add('item');

            const img = document.createElement('img');
            img.src = '../' + producto.img;
            img.alt = producto.nombre;
            item.appendChild(img);

            const divInfo = document.createElement('div');
            divInfo.classList.add('info');
            item.appendChild(divInfo);

            const titulo = document.createElement('h3');
            titulo.textContent = producto.nombre;
            divInfo.appendChild(titulo);

            const pinfo = document.createElement('p');
            pinfo.textContent = 'info del producto';
            divInfo.appendChild(pinfo);

            const precio = document.createElement('p');
            precio.classList.add('p-precio');
            precio.textContent = `Precio: $${producto.precio}`;
            divInfo.appendChild(precio);

            const cantidad = document.createElement('p');
            cantidad.classList.add('cantidad');
            cantidad.textContent = `Cantidad: x${contadorProductos[producto.nombre]}`;
            divInfo.appendChild(cantidad);

            const eliminar = document.createElement('button')
            eliminar.classList.add('eliminar-btn');
            eliminar.textContent = 'ELIMINAR';
            item.appendChild(eliminar);

            eliminar.addEventListener('click', function() {
                divCarrito.remove();
                carritoProductos.splice(index, 1);
                localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
                location.reload();
                actualizarPrecio();
            })

            divCarrito.appendChild(item);
            carrito.appendChild(divCarrito);
        }
    });

    const divprecio = document.createElement('div');
    divprecio.classList.add('divprecio');
    carrito.appendChild(divprecio);

    const preciop = document.createElement('p');
    preciop.textContent = `Precio final= $${precioTotal}`;
    divprecio.appendChild(preciop);
}
function actualizarPrecio() {
    precioTotal = 0;
    const carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || [];
    carritoProductos.forEach((producto) => {
        precioTotal = suma(precioTotal, producto.precio); 
    })
    const precioFinalElement = document.querySelector('#carrito-secction p:last-child');
    if (precioFinalElement) {
        precioFinalElement.textContent = `Precio final: $${precioTotal}`;
    }
}
document.querySelector('.comprar').addEventListener('click', function(){
    let tiempoRestante = 5; 
    Swal.fire({
        title: "¿Está seguro que desea realizar la compra?",
        text: `El valor total es de: $${precioTotal}`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí, estoy seguro",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "¡Se realizó la compra con éxito!",
            html: `Redirigiendo en <strong id="tiempo-restante">${tiempoRestante}</strong> segundos.`,
            icon: "success",
            showConfirmButton: false,
            timer: tiempoRestante * 1000,
            timerProgressBar: true,
            didOpen: () => {
              const interval = setInterval(() => {
                tiempoRestante--;
                document.getElementById('tiempo-restante').textContent = tiempoRestante;
              }, 1000);
              setTimeout(() => {
                clearInterval(interval);
              }, tiempoRestante * 1000);
            }
          }).then(() => {
            localStorage.clear();
            window.location.href = "../index.html";
          });
        }
      });
});
const suma = (a, b) => a+b; 

actualizarPrecio();
agregarAlCarrito();

