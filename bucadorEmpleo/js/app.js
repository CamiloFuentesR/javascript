const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', validarBusqueda)
})

function validarBusqueda(e) {
    e.preventDefault();
    const busqueda = document.querySelector('#busqueda').value;

    if (busqueda.length < 3 && busqueda != 'c#' ) {
        mostrarMensaje('busqueda muy corta, falta   informacion');
        return;
    }
    consultarAPI(busqueda);
}

function consultarAPI(busqueda) {
    const gitHubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(gitHubUrl)}`; // se usa el encode para pdoer acceder a la api, ya que esta con proteccion y no deja entrar sin hacer esto

    axios.get(url)
        .then(respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents)))
}


function mostrarMensaje(msg) {

    const alertaPrevia = document.querySelector('.alerta');

    if (!alertaPrevia) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        alerta.textContent = msg;

        formulario.appendChild(alerta);

        setTimeout(() => {

            alerta.remove();

        }, 3000);

    }
}

function mostrarVacantes(vacantes) {
console.log(vacantes)
    limpiarHTML();
    if (vacantes.length > 0 ) {
        resultado.classList.add('grid')
        vacantes.forEach(empleos => {

            const { title, company, type, url } = empleos;

            resultado.innerHTML += `
            
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span>
                </p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
            </div>
            `;

        });
    }else{
        const noResultado = document.createElement('p');
        noResultado.classList.add('text-center','mt-10','text-gray-600','w-full');
        resultado.classList.remove('grid');
        noResultado.textContent ='No se encontraron resultados';
        resultado.appendChild(noResultado);
    }

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}