const formulario = document.querySelector('#formulario');
const btnBuscar = document.querySelector('input[type=submit]').value;
const resultado = document.querySelector('#resultado');
const paginacion = document.querySelector('#paginacion');


const registrosPorPagina = 30;
let totalPaginas;
let iterador;
let paginaActual = 1;


document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit', validarForm);

});


function validarForm(e) {
    e.preventDefault();
    const busqueda = document.querySelector('#termino').value;

    if (busqueda === '') {
        imprimirAlerta('Los campos estan vacios', 'error');
        return;
    } else {
        imprimirAlerta('buscando')
    }
    buscarImagenes();


}


function imprimirAlerta(mensaje, tipo) {


    const alerta = document.querySelector('.alerta-mensaje');
    if (!alerta) {
        const div = document.createElement('div');
        const mensajeError = document.createElement('p');
        mensajeError.textContent = mensaje;

        mensajeError.classList.add('alerta-mensaje', 'px-4', 'py-3', 'text-center', 'rounded', 'mx-auto', 'max-w-lg', 'mt-6');
        if (tipo === 'error') {
            mensajeError.classList.add('border-red-100', 'bg-red-100', 'text-red-400');
        } else {
            mensajeError.classList.add('border-green-400', 'bg-green-100', 'text-green-400');

        }
        formulario.appendChild(div);
        div.appendChild(mensajeError);
        setTimeout(() => {
            div.remove();

        }, 3000);
    }
}


async function buscarImagenes() {

    const busqueda = document.querySelector('#termino').value;


    console.log(busqueda);
    const key = `18887100-dc933d21cdc43e02ea780e240`; //con react o alguna libreria , se debe dejar como variable de entorno para que nadie mas tenga acceso a ella
    const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${registrosPorPagina}&page=${paginaActual}`;


 /*    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas=calcularPaginas(resultado.totalHits);
            
            mostrarImagenes(resultado.hits);
        }); */

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            totalPaginas=calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        } catch (error) {
            console.log(error);
            
        }
}

function mostrarImagenes(imagenes) {
    console.log(imagenes);
    limpiarHtml();

    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w1-/4 imagenes-busqueda">
            <div class="bg-white">
                <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                    <img class="w-full" src="${previewURL}">
                </a>
                    <div class="p-4">
                        <p class="font-bold">${likes}<span class="font-light">Me Gusta</span></p>
                        <p class="font-bold">${views}<span class="font-light">Visitas</span></p>
                            <a class="w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer" 
                            >
                            ver imagen
                            </a>
                    </div>
            </div>
        </div> 
        `;
    });
    imprimirPaginador();
}


function limpiarHtml() {
    while (resultado.firstChild) {

        resultado.removeChild(resultado.firstChild);
    }
}
function limpiarHtmlPaginador() {
    while (paginacion.firstChild) {

        paginacion.removeChild(paginacion.firstChild);
    }
}

function calcularPaginas (total){
    return parseInt(Math.ceil(total/registrosPorPagina));
}

//generador que va a registrar la cantidad  de elementos de acuerdo a paginas
function *crearPaginador(total) {
    for(let i=1; i<=total;i++){
        // console.log(i);
        yield i;
    }
}


function imprimirPaginador() {
    iterador = crearPaginador(totalPaginas);
    // console.log(iterador.next());  para ostrar el numero iterado
/*     console.log(iterador.next().done);
 */
   limpiarHtmlPaginador();
    while(true){
        const {done,value} = iterador.next();
        if(done) return;

        const boton = document.createElement('a');
        boton.href =`#`;
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-10','uppercase','rounded');


        boton.onclick = () => {

            paginaActual = value;
            console.log(paginaActual);
            buscarImagenes();
        } 
     /*    boton.addEventListener('click',()=>{
            console.log(value)
        }) */

        paginacion.appendChild(boton);

    }


}