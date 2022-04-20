const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos  = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {

    // Cuando agregas un curso presionando "Agregar al Carrito."
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Resetea el Arreglo
        limpiarHTML(); // Elimina todo
    })
}



// function
function agregarCurso(e) {
    const cursoSeleccionado =  e.target.parentElement.parentElement;
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {

        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}


// Lee el contenido HTML y Extrae la información
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso;   //Retorna el objeto actualizado
            }else {
                return curso;   //Retorna el objeto no actualizado
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    

    console.log(articulosCarrito);

    carritoHTML();
}


//Muestra el carrito de compra en el HTML
function carritoHTML () {

    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td> <img src="${curso.imagen}" width="100"> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
            </td>
        
        `;

        // Agrega en el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    });
}

//Elimina los cursos del tbody
function limpiarHTML() {
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
