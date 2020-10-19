import { Citas } from './clases/Citas.js';
import { UI } from './clases/Ui.js'
import { mascotaInput, propietarioInput, fechaInput, telefonoInput, horaInput, sintomasInput, formulario, alertas } from './selectores.js'

const ui = new UI();
const administrarCitas = new Citas();


let editando;
export let DB;

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
        ui.mostrarAlerta('Todos los campos deben estar completos', 'error');
        return;
    }
    //Preguntar si esta en modo edicion o crecion
    if (editando) {

        administrarCitas.editarCita({ ...citasObject });

         //edita en index db 
         const transaction = DB.transaction(['citas'], 'readwrite');

        //habilitar el object store
        const objectStore = transaction.objectStore('citas');

        //se agrega en la abse de datos
        objectStore.put(citasObject);

        transaction.oncomplete = () =>{
       
            ui.mostrarAlerta('Cita editada con éxito');

            formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
            //quitar modo edicion
            editando = false;
        }
        transaction.onerror = ()=>{
            console.log('ha ocurrido un error');
        }

     

    } else {
        console.log('modo crear cita')
        //generar id unico
        citasObject.id = Date.now();

        administrarCitas.agregarCita({ ...citasObject }); //se encierra en llaves para pasar una copia del objeto y no reemplazarlo en el metodo cada vez y asi no quedan todos los datos repetidos

         //--------------------------insertar en la base de datos---------------------------------------------

        // insertar registro en IndexDB
        const transaction = DB.transaction(['citas'], 'readwrite');

        //habilitar el object store
        const objectStore = transaction.objectStore('citas');

        //se agrega en la abse de datos
        objectStore.add(citasObject);

        transaction.oncomplete = () => {
            console.log('cita agregada');

            // mensaje de agregado crreactamente
            ui.mostrarAlerta('Cita ingresada con éxito');
        }
 
    }

    //reiniciar obj
    reiniciarObj();

    //reiniciar formulario
    formulario.reset();


    ui.imprimirCitas();

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

   const transaction = DB.transaction(['citas'],`readwrite`);
   const objectStore = transaction.objectStore(`citas`);
   objectStore.delete(id);

   transaction.complete = () =>{
       console.log(`cita ${id} eliminada`)
       ui.mostrarAlerta('Cita eliminada con exito');

   }

   transaction.onerror = () =>{
       console.log('ocurrio un error al eliminar la cita');
   }

    //imprimir mensaje

    ui.mostrarAlerta('Cita eliminada con exito');


    //refrescar las citas
    ui.imprimirCitas();

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

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

export function crearDB() { 
    const crearDB = window.indexedDB.open('citas', 1);

    crearDB.onerror = function () {
        console.log('un error');
    }

    crearDB.onsuccess = function () {
        console.log('Creada con exito');
        DB = crearDB.result;
        

        //mostrar citas al cargar (pero indexDB ya esta llisto)
        ui.imprimirCitas();
    }

    //definir schema

    crearDB.onupgradeneeded = function (e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true,
        });

        //definit las columnas
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });
  
        console.log('db creada y lista');
    }

}