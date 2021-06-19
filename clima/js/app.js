

const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const buscarPais = document.querySelector('#pais');

/* const ciudadSelect = document.querySelector('#ciudad');

console.log(ciudadSelect);

const option =document.createElement('option');

ciudadSelect.appendChild(option)
*/

buscarPais.addEventListener('change', ciudad);

function obtenerPais(e) {
    console.log(e.target.value)
}
// window.addEventListener('DOMContentLoaded',ciudad);
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


function buscarClima(e) {
    e.preventDefault();
    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligtorios');
        /*   Swal.fire(
              'Campos vacìos',
              '¿Revisaste que todos los campos esten llenos?',
              'warning'
            ) */
        return;
    }
    //consultar la API
    consultarApi(ciudad, pais);
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        //el scope de alerta no llega dentro de esta funcion
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px4', 'py3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
        <strong class="font-bold">Error!!</strong>
        <span class="block">${mensaje}</span>
        `;
        contenedor.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 2000);

    }
}

function ciudad(e) {
    const ciudadValue = e.target.value;
    const url = 'ciudad/city.json';
    spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpirHTMLResultado ();
            mostrarCiudad(datos, ciudadValue)
        })
}

function mostrarCiudad(datos, id) {
    const { country } = datos;
    const contenido = document.querySelector('#ciudad');
    let html = ``;
    let ciudades = datos.filter(ciudad => id === ciudad.country)
    ciudades.forEach(nombre => {
        html += `
        <option value="${nombre.name}">${nombre.name}</option>`;
    });
    contenido.innerHTML = html;
    $('.select2').select2();

    /*    ciudades.forEach(ciudad => {
       let newCiudades = new Option(ciudad.name,ciudad.id,false,false);
       $('.select2').append(newCiudades).trigger('change').select2();
       }); */

    /*    ciudades.forEach(ciudad => {
        const ciudadSelect = document.querySelector('#ciudad');

         const option =document.createElement('option');
         option.value = ciudad.name;
         option.textContent = ciudad.name;
          
         ciudadSelect.appendChild(option) 
        });  */

    // const {id,nombre,empresa,trabajo} = datos;

}


function consultarApi(ciudad, pais) {
    const apiId = 'e2a01a2c23f18128b343c96a3cc180e5';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;
    spinner();
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            //limpiar el html previo
            limpirHTMLResultado ();
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }
            mostrarClima(datos);
        })
}

function mostrarClima(datos) {

    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('text-bold', 'text-2xl')

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad)

    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMin)
    resultadoDiv.appendChild(tempMax)


    resultado.appendChild(resultadoDiv);

}

const limpirHTMLResultado  = () => {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function spinner() {
    limpirHTMLResultado ();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
`;
    resultado.appendChild(divSpinner);
}
