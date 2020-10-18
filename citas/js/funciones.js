import { Citas } from './clases/Citas.js';
import { UI } from './clases/Ui.js'
import { mascotaInput, propietarioInput, fechaInput, telefonoInput, horaInput, sintomasInput, formulario,alertas } from './selectores.js'

const ui = new UI();
const administrarCitas = new Citas();

let editando =false;

//objeto con los campos de cita
const citasObject = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}


export function datosCita(e) {
    citasObject[e.target.name] = e.target.value;
}


//Valida y agrega  una nueva cita a la clase cita

export function nuevaCita(e) {
    e.preventDefault();

    //extraer informacion del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObject;

    //validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.mostrarAlerta('Todos los camppos deben estar completos', 'error');
        return;
    }
    //Preguntar si esta en modo edicion o crecion
    if (editando) {
        ui.mostrarAlerta('Cita editada con éxito');

        administrarCitas.editarCita({ ...citasObject });

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

export function reiniciarObj() {
    citasObject.id = '';
    citasObject.mascota = '';
    citasObject.propietario = '';
    citasObject.telefono = '';
    citasObject.fecha = '';
    citasObject.hora = '';
    citasObject.sintomas = '';

}

export function eliminarCita(id) {

    //eliminar cita
    administrarCitas.eliminarCita(id);

    //imprimir mensaje

    ui.mostrarAlerta('Cita eliminada con exito');


    //refrescar las citas
    ui.imprimirCitas(administrarCitas);

}

export function cargarEdicion(cita) {

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