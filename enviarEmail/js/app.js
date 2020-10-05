//variables
//usa un frame work de ccs que no es bootstrap
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const eR = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,4}))$/;

const eREspacios =  /^\S*$/;

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
    formulario.addEventListener('submit',enviarEmail);
    //reinicia el form
    btnReset.addEventListener('click',resetearFormulario);
}
//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}


function validarForm(e) {
    //e.target.addEventListener('input',validarForm);
    e.target.addEventListener('input',validarForm);
    //console.log(e.target);
    if (e.target.value.trim() !== "" && eREspacios.test(e.target.value)) { /*agregandole la eREspacios, no se permiten espacion en toda la cadena y el trim es para no permitir cadenas vacias */

        error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
      /*   let errorI =document.querySelector(`i.${e.target.id}`);
        if(errorI){
        errorI.remove();// remueve el icono
        } */
        
        e.target.classList.remove('border', 'border-red-500','erro');
        e.target.classList.add('border', 'border-green-500');
       
    } else {
        
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500','erro');
        if(e.target.type === 'email'){
             error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            mostrarError('El campo Email esta vacío');
        }else if(e.target.id === 'mensaje'){
            error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
         /*    let alinear = document.querySelectorAll('.material-icons.alinear.mensaje');
            if(alinear.length === 0){
                icono('mensaje');
        } */
            mostrarError('El campo Mensaje esta vacío');
        }
        else if(e.target.id === 'asunto'){
           error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
          /*   let alinear = document.querySelectorAll('.material-icons.alinear.asunto');
            if(alinear.length === 0){
                icono('asunto');
        }
         */
            mostrarError('El campo Asunto esta vacio');
        } 
    }
    validarEmail(e);
if(eR.test(email.value)  && asunto.value !=='' && mensaje.value!==''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
}else{
    console.log('no pasaste la validacion');    
}
}

//funcion de icono
/* function icono(id){
    let icono = document.createElement('i');
        
        iconoEmail.appendChild(icono);
        icono.classList.add('material-icons','alinear',`${id}`);
        icono.textContent = 'error'; 
        let iconoEmail = document.querySelector(`#${id}`);
       // iconoEmail.classList.add('error',`${id}`);

} */

function validarEmail(e){
    if (e.target.type === 'email') {
       

        if (eR.test(e.target.value)) {
           error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
       /*      let alinear = document.querySelectorAll('.material-icons.alinear.email');
           
            if(alinear.length === 0){
                icono('email');
        } */
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500','erro');
            mostrarError('El email no es válido');
        }
    }
}

function mostrarError(msj) {
    const mensajeError = document.createElement('p');

    mensajeError.textContent = msj;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) { //para que solo apareca 1 mensaje de error y no muchos
        //console.log(errores.length);
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar el spinner

    setTimeout(()=>{
       // console.log('esta funcion  se ejecuta despues de 3 segundos');
       spinner.style.display = 'none';

       const parrafo = document.createElement('p');
       parrafo.textContent = 'El mensaje se envio correctamente';
       parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')

       //inserta parrafo antes de spinner
       formulario.insertBefore(parrafo,spinner);

       setTimeout(()=>{
           parrafo.remove();// elimina mensaje de exito
           resetearFormulario();
           iniciarApp();
       },3000);
    },3000);

}

function resetearFormulario(){
    formulario.reset();
}

