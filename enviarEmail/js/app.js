//variables
//usa un frame work de ccs que no es bootstrap
const btnEnviar = document.querySelector('#enviar');

//variables para campos del form

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
let error = document.querySelector('p.error');
let alinear = document.querySelectorAll('.material-icons.alinear.mensaje');
console.log(error);


//event listener
eventListeners();

function eventListeners() {
    //Cuando la appp arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del form
    email.addEventListener('click', validarForm);
    asunto.addEventListener('click', validarForm);
    mensaje.addEventListener('click', validarForm);
}
//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


function validarForm(e) {
    e.target.addEventListener('input',validarForm);
    
    console.log(e.target);
    if (e.target.value.length > 0) {

        error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        let errorI =document.querySelector(`i.${e.target.id}`);
        if(errorI){
        errorI.remove();
        }
        
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
       
    } else {
        
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        if(e.target.type === 'email'){
             error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            mostrarError('El campo Email esta vacío');
        }else if(e.target.id === 'asunto'){
           error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            let alinear = document.querySelectorAll('.material-icons.alinear.asunto');
           
            if(alinear.length === 0){
                icono('asunto');
        }
        
            mostrarError('El campo Asunto ');
        } else if(e.target.id === 'mensaje'){
            error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            mostrarError('El campo Mensaje esta vacío');
        }
    }
    validarEmail(e);

}

//funcion de icono
function icono(id){
    let icono = document.createElement('i');
        let iconoEmail = document.querySelector(`.${id}`);
        iconoEmail.appendChild(icono);
        icono.classList.add('material-icons','alinear',`${id}`);
        icono.textContent = 'error';

}

function validarEmail(e){
    if (e.target.type === 'email') {
        const eR = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

        if (eR.test(e.target.value)) {
           error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            let alinear = document.querySelectorAll('.material-icons.alinear.email');
           
            if(alinear.length === 0){
                icono('email');
        }
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El email no es válido');
        }
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');

    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) { //para que solo apareca 1 mensaje de error y no muchos
        //console.log(errores.length);
        formulario.appendChild(mensajeError);
    }
}

