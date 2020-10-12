// constructores
function Seguro(marca, year, type) {
    this.marca = marca;
    this.year = year;
    this.type = type;
}
// realiza la cotizacion de los seguros
Seguro.prototype.cotizarSeguro = function () {

    let cantidad;
    const base = 2000;

    switch (this.marca) {

        case '1':
            cantidad = base * 1.2;
            break;
        case '2':
            cantidad = base * 1.1;
            break;
        case '3':
            cantidad = base * 1.4;
            break;
        default:
            break;
    }
    //leer el año
    const diferencia = new Date().getFullYear() - this.year;

    //cada año que laa diferencia es mayor, el costo va a reducrise un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        si el seguro es basico se multiplica po 30%
        si el seguro es completo se multiplca por el 50%
     */

    if (this.type === 'completo') {
        cantidad += cantidad * 1.50;
    } else {
        cantidad += cantidad * 1.30;
    }
    return cantidad;

}

function Ui() {

}

//llenar las opciones de los años
Ui.prototype.LlenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//muestra alertas en pantalla
Ui.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 1000);

    Ui.prototype.mostrarResultado = (total, seguro) => {

        //crear resultado
        const div = document.createElement('div');
        div.classList.add('mt-10');
        const { marca, year, type } = seguro;
        //darle valor a a marca
        let textoMarca;
        switch (marca) {

            case '1':
                textoMarca = 'Americano';
                break;
            case '2':
                textoMarca = 'Asiatico';
                break;
            case '3':
                textoMarca = 'Europeo';
                break;
            default:
                break;
        }

        div.innerHTML = `
        <p class="header"> Tu Resumen </p>
        <p class="font-bold"> Marca :<span class="font-normal">  ${textoMarca}</span> </p>
        <p class="font-bold"> Tipo :<span class="font-normal capitalize">  ${type}</span> </p>
        <p class="font-bold"> Año :<span class="font-normal ">  ${year}</span> </p>

        <br>
        <p class="font-bold"> Total :<span class="font-normal"> $ ${total}</span> </p>


        `;
        const resultadoDiv = document.querySelector('#resultado');

        // mostrar el spinner
        const spinner = document.querySelector('#cargando');
        spinner.style.display = 'block';

        setTimeout(() => {

            spinner.style.display = 'none';
            resultadoDiv.appendChild(div);

        }, 1000)
    }
}

//instanciar UI
const ui = new Ui();
console.log(ui);



eventListers();

function eventListers() {

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
    document.addEventListener('DOMContentLoaded', () => {
        ui.LlenarOpciones();//llena el seelct con los años
    })
}

function cotizarSeguro(e) {
    e.preventDefault();
    //lectura de datos  -------------------------------------------------------------------------------------
    //leer marca
    const marca = document.querySelector('#marca').value;

    // leer año
    const year = document.querySelector('#year').value;

    //leer tipo seguro
    const tipo = document.querySelector('input[name=type]:checked').value;
    // --------------------fin de lectura de datos  ---------------------------------------------------

    //condicional para mostrar mensaje de error ---------------------------------------------------
    if (marca === '' || year === '' || tipo === '') {
        if (document.querySelector('.error') === null) { //para que aparezca el msj solo una vez
            // console.log(document.querySelector('.error')=== null;
            ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        }
        return;
    }

    ui.mostrarMensaje('Cotizando', 'exito')

    //ocultas cotizaciones previas
    /* const resultado = document.querySelector('#resultado div');

    if (resultado != null) {
        resultado.remove();
    } */
    //mejora del codigo de arriba
    const resultado = document.querySelectorAll('#resultado div');
    console.log(resultado.length);

    if (resultado.length != 0) {
        for (let i = 0; i < resultado.length; i++) {

            resultado[i].remove(resultado[i]);
        }
    }

    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(total, seguro);

}