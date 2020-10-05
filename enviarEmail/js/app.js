//variables
//usa un frame work de ccs que no es bootstrap
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const eR = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,4}))$/;

const eREspacios = /^\S*$/;

//variables para campos del form

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
let error = document.querySelector('p.error');
//let alinear = document.querySelector('.material-icons.alinear.mensaje');
//console.log(error);


//event listener
eventListeners();


function eventListeners() {
    //Cuando la appp arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del form
    email.addEventListener('blur', validarForm);
    //email.addEventListener('input',validarForm);
    asunto.addEventListener('blur', validarForm);
    mensaje.addEventListener('blur', validarForm);
    formulario.addEventListener('submit', enviarEmail);
    //reinicia el form
    btnReset.addEventListener('click', resetearFormulario);
}
//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarForm(e) {

    e.target.addEventListener('input', validarForm);
    //console.log(e.target);
    if (e.target.value.trim() !== "" ) { /*agregandole la eREspacios, no se permiten espacion en toda la cadena y el trim es para no permitir cadenas vacias */

        error = document.querySelector(`p.error.${e.target.id}`);
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500', 'erro');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500', 'erro');
        if (e.target.type === 'email') {
            mostrarError('El campo Email esta vacío', email);
        } else if (e.target.id === 'mensaje') {
            mostrarError('El campo Mensaje esta vacío', mensaje);
        } else if (e.target.id === 'asunto') {
            error = document.querySelector('p.error');
            mostrarError('El campo Asunto esta vacio', asunto);
        }
    }

    validarEmail(e);

    if (eR.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } else {
        console.log('no pasaste la validacion');
    } if (email.classList.contains('border-red-500') || asunto.value === '' || mensaje.value === '') {
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
    }
}

function validarEmail(e) {
    if (e.target.type === 'email') {

        if (eR.test(e.target.value)) {
            error = document.querySelector(`p.error.${e.target.id}`);
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500', 'erro');
            mostrarError('El email no es válido', email);
        }
    }
}

function mostrarError(msj, atributo) {

    const mensajeError = document.createElement('p');
    mensajeError.textContent = msj;
    mensajeError.classList.add('text-red-500', 'p-2', 'error', `${atributo.id}`);
    const errores = document.querySelectorAll(`.error.${atributo.id}`);

    if (errores.length === 0) {  //para que solo apareca 1 mensaje de error y no muchos
        //console.log(errores.length);
        const antes = atributo.parentElement;
        antes.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar el spinner

    setTimeout(() => {
        // console.log('esta funcion  se ejecuta despues de 3 segundos');
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        //inserta parrafo antes de spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {

            parrafo.remove();// elimina mensaje de exito
            resetearFormulario();
            iniciarApp();
            email.classList.remove('border', 'border-green-500');
            asunto.classList.remove('border', 'border-green-500');
            mensaje.classList.remove('border', 'border-green-500');

        }, 3000);
    }, 3000);

}

function resetearFormulario() {
    formulario.reset();
}

