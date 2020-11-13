import {obtenerCliente,editarCliente} from './API.js';
import {mostrarAlerta,validar} from './funciones.js';

(function (){
        //campos del formulario
        const nombreInput = document.querySelector('#nombre');
        const emailInput = document.querySelector('#email');
        const empresaInput = document.querySelector('#empresa');
        const telefonoInput = document.querySelector('#telefono');
        const idInput = document.querySelector('#id');

    document.addEventListener('DOMContentLoaded', async () => {
        const paramURL = new URLSearchParams(window.location.search);

        const idCliente = parseInt(paramURL.get('id'));
        console.log(idCliente)

        const cliente = await obtenerCliente(idCliente);

        mostrarCliente(cliente);
        //submit al form
        const form = document.querySelector('#formulario');
        form.addEventListener('submit', validarCliente);
    });

    function mostrarCliente({nombre,email,telefono,empresa,id}) {

        nombreInput.value = nombre;
        emailInput.value = email;
        empresaInput.value = empresa;
        telefonoInput.value = telefono;
        idInput.value = id;
    }

    function validarCliente (e) {
        e.preventDefault();

        const cliente =  {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
        
         if(validar(cliente)){
            //mostrar mensaje
         mostrarAlerta('Todos los campo son obligatoros');
            return;
        } 
        //re escribe el obj
        editarCliente(cliente);

    }


})();