
//Campos del formluario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const alertas = document.querySelector('#alert');
const formulario = document.querySelector('#nueva-cita');
const citasUl = document.querySelector('#citas');

let editando;

//UI


//clases

class Citas {
    constructor() {
        this.citas = [];

    }

    agregarCita(citas) {
        this.citas = [...this.citas, citas]

    }
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    editarCita(citaActualizada){

        this.citas = this.citas.map(cita=> cita.id ===citaActualizada.id ? citaActualizada : cita)
        


    }
}

class UI {

    mostrarAlerta(mensaje, tipo) {
        alertas.classList.add('alert', 'text-center', 'd-blocl', 'col-12')
        alertas.setAttribute('role', 'alert');
        if (tipo === 'error') {
            alertas.classList.add('alert-danger');
        } else {
            alertas.classList.add('alert-success');

        }
        alertas.textContent = mensaje;
        setTimeout(() => {
            alertas.classList.remove('alert', 'alert-danger');
            alertas.classList.remove('alert', 'alert-success');
            alertas.textContent = '';
        }, 2000)

    }
    imprimirCitas({ citas }) {

        this.limpiarHtml();
        citas.forEach((cita) => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('div');
            divCita.className = 'cita p-3';
            divCita.dataset.id = id;

            //scripting 
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.textContent = mascota;
            mascotaParrafo.className = 'card-tittle font-weight-bolder';


            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bold">Propietario: </span>${propietario}`;


            const TelefonoParrafo = document.createElement('p');
            TelefonoParrafo.tinnerHTML = `<span class="font-weight-bold">Telefono: </span>${telefono}`;


            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bold">Fecha: </span>${fecha}`;


            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bold">Hora: </span>${hora}`;


            const sintomasParrado = document.createElement('p');
            sintomasParrado.innerHTML = `<span class="font-weight-bold">Sintomas: </span>${sintomas}`;


            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger');
            btnBorrar.innerHTML = `<p>Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg></p>`;

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = ` <p>editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></p>`

            btnBorrar.onclick = () => eliminarCita(id);
            btnEditar.onclick = () => cargarEdicion(cita);


            //agregar los parrafos al div cita

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(TelefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrado);
            divCita.appendChild(btnBorrar);
            divCita.appendChild(btnEditar);


            //agregar el div completo al html

            citasUl.appendChild(divCita);



        });
    }

    limpiarHtml() {
        while (citasUl.firstChild) {
            citasUl.removeChild(citasUl.firstChild);
        }

    }
}

//instanciar objetos o clases
const administrarCitas = new Citas();
const ui = new UI();


//registrar eventos
listeners();
function listeners() {

    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

//funcion para llenar objeto
function datosCita(e) {
    citasObject[e.target.name] = e.target.value;


}

//objeto con los campos de cita
const citasObject = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}



//Valida y agrega  una nueva cita a la clase cita

function nuevaCita(e) {
    e.preventDefault();

    //extraer informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObject;

    //validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.mostrarAlerta('Todos los camppos deben estar completos', 'error');
        return;
    }




    if (editando) {
        ui.mostrarAlerta('Cita editada con éxito');

        administrarCitas.editarCita({...citasObject});

        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        //quitar modo edicion
        editando = false;

    } else {
        console.log('modo crear cita')
        //generar id unico
        citasObject.id = Date.now();

        administrarCitas.agregarCita({ ...citasObject }); //se encierra en llaves para pasar una copia del objeto y no reemplazarlo en el metodo cada vez y asi no quedan todos los datos repetidos

        // mensaje de agregado crreactamente
        ui.mostrarAlerta('Cita ingresada con éxito');
    }

    //reiniciar obj
    reiniciarObj();

    //reiniciar formulario
    formulario.reset();


    ui.imprimirCitas(administrarCitas);

}

function reiniciarObj() {
    citasObject.id = '';
    citasObject.mascota = '';
    citasObject.propietario = '';
    citasObject.telefono = '';
    citasObject.fecha = '';
    citasObject.hora = '';
    citasObject.sintomas = '';

}

function eliminarCita(id) {

    //eliminar cita
    administrarCitas.eliminarCita(id);

    //imprimir mensaje

    ui.mostrarAlerta('Cita eliminada con exito');


    //refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

function cargarEdicion(cita) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //llenar los inputs

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar objeto


    citasObject.mascota = mascota;
    citasObject.propietario = propietario;
    citasObject.telefono = telefono;
    citasObject.fecha = fecha;
    citasObject.hora = hora;
    citasObject.sintomas = sintomas;
    citasObject.id = id;

    console.log(cita)


    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}