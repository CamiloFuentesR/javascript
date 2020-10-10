const carrito = document.querySelector('#carrito');
const agregarCarrito = document.querySelector('.agregar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
const llenarCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarro = document.querySelector('#vaciar-carrito');
let listaCarrito = [];

cargarEventos();
function cargarEventos() {
    listaCurso.addEventListener('click', leerDatos);
    vaciarCarro.addEventListener(`click`,vaciarCarrito);
    carrito.addEventListener('click',eliminarCurso);
}

function leerDatos(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const datosCarrito = e.target.parentElement.parentElement;
        guardarDatos(datosCarrito);
    }
}

function guardarDatos(curso) {

    const infoCurso = {
        titulo: curso.querySelector('h4').textContent,
        img: curso.querySelector('img').src,
        nombre: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    const existe = listaCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){
        const cursos =listaCarrito.map((curso)=>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        })
        listaCarrito =[...cursos];
    }else{

        listaCarrito = [...listaCarrito, infoCurso];

}
carritoHTML();
}

function carritoHTML(){
    limpiarHTML();
    
    listaCarrito.forEach(curso=>{
        const row = document.createElement('tr');

        row.innerHTML = `
        <td><img src="${curso.img}" width="100%"</td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td><a href="#" data-id="${curso.id}" class="borrar-curso">x</td>
        `;
       llenarCarrito.appendChild(row);
        
    })
}

    function limpiarHTML(){
        while(llenarCarrito.firstChild)
        llenarCarrito.removeChild(llenarCarrito.firstChild);
        
    }

    function vaciarCarrito(){
        listaCarrito= [];
        limpiarHTML();

    }

    function eliminarCurso(e){
        
        if(carrito.children[0].children[1].children[0]){//eimina el error de referencia cuando esta vacio
       //    console.log(e.target.parentElement.parentElement.children[3].textContent);
        const contador =carrito.children[0].children[1].children[0].children[3].textContent
        //console.log(carrito.children[0].children[1].children[0].children[3].textContent);
          //console.log(carrito.children[0].children[1].children[0].children[3].textContent);
       // console.log(carrito.children[0].children[1].children(e.target.getAttribute('data-id')).children[3].textContent);
        //console.log(e.target.getAttribute('data-id').textContent);
        //console.log(curso.id);
        console.log(contador);
        if(contador > 1){

           const eliminar = listaCarrito.map((curso)=>{
                if(curso.id === e.target.getAttribute('data-id')){
                    curso.cantidad--;
                    return curso;
                }else{
                    return curso;
                }

            })
            listaCarrito = [...eliminar];
            carritoHTML();
    } else if(contador <=1){
       listaCarrito = listaCarrito.filter((curso) => curso.id !== e.target.getAttribute('data-id'))
        carritoHTML();
    }
}
    }
