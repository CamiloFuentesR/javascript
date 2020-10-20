

import { cargarEdicion, eliminarCita, DB } from '../funciones.js'
import { citasUl, alertas } from '../selectores.js'
export class UI {

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
    imprimirCitas() {
        //video 198 muestra como hacer un head para cambiar el texto de administrar citas cuando esta vacia la bdd
        this.limpiarHtml();

        //leer el contenido de l base de datos

        //instancia de objectStore de citas
        const objectStore = DB.transaction('citas').objectStore(`citas`);

        const total = objectStore.count();


        objectStore.openCursor().onsuccess = function (e) {

            const cursor = e.target.result;


            if (cursor) {
                const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;
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
                const cita = cursor.value;

                btnBorrar.onclick = () => eliminarCita(id);
                btnEditar.onclick = () => cargarEdicion(cita); //sin el .value me dara undefined


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

                //ve al siguiente elemento
                cursor.continue();
            }
        }
    }

    limpiarHtml() {
        while (citasUl.firstChild) {
            citasUl.removeChild(citasUl.firstChild);
        }
    }
}