//definciion de variables globales
const formulario = document.querySelector('#agregar-gasto');
const gastoHtml = document.querySelector('.secundario');
const lista = document.querySelector('#gastos ul');
const alertRestante = document.querySelector('.restante');
const restanteMinimo = document.querySelector('#restante');
const alertPrsupuesto = document.querySelector('#total');
const ingresarCantidad = document.querySelector('#cantidad');
listeners();
function listeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);

}

//-------------------------------------------clases---------------------------------------------------------

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto) {

        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {

        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)//gasto es el nombre que se le asignaa al objeto, puede ser cuaquier nombre.
        this.restante = this.presupuesto - gastado;
        if (this.restante < 0) {
            console.log('no puedes gastar mas de lo que tienes');
        }
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();

    }

}

class Ui {

    insertarPresupuesto(cantidad) { //el objeto  de Presupuesto se le pasa a cantidad
        const { presupuesto, restante } = cantidad; //las constantes deben llamarse igual que el constructor de presupuesto;

        //agregando valores al html
        document.querySelector('#total').textContent = presupuesto; //cantidad.presupuesto
        document.querySelector('#restante').textContent = restante; //cantidad.restante

    }
    imprimirAlerta(mensaje, tipo) {
        const div = document.createElement('div');
        const contenido = document.querySelector('.contenido.primario');
        div.classList.add('text-center', 'alert')
        if (tipo === 'error') {
            div.classList.add('font-weight-bolder', 'alert-danger');

        } else {
            div.classList.add('font-weight-bolder', 'alert-success');
        }
        div.textContent = mensaje;
        const btn = document.querySelector('.btn-primary')
        formulario.insertBefore(div, btn);

        setTimeout(() => {
            div.remove();
        }, 2000)
    }

    mostrarGastos(gasto) {
        this.limpiarHTML();
        console.log(gasto);

        let mostrarGasto;

        gasto.forEach(gasto => {
            mostrarGasto = document.createElement('li');
            const { nombreGasto, cantidad, id } = gasto;
            mostrarGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            mostrarGasto.dataset.id = id;
            mostrarGasto.innerHTML = `${nombreGasto}<span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

            const btnBorrar = document.createElement('button');
            btnBorrar.innerHTML = 'borrar &times';
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            mostrarGasto.appendChild(btnBorrar);

            lista.appendChild(mostrarGasto);

        });
        console.log(gasto);
    }
    limpiarHTML() {
        while (lista.firstChild)
            lista.removeChild(lista.firstChild);

    }
    actualizarRestante(restante) {

        document.querySelector('#restante').textContent = restante;
    }
    comprobarGastos(presupuestoObj) {
        console.log(presupuestoObj);
        const { presupuesto, restante } = presupuestoObj;

        if (restante <= presupuesto * 0.25 ) {
            alertRestante.classList.remove('alert-warning');
            alertRestante.classList.add('alert-danger');
        } else if (restante <= presupuesto * 0.5  ) {
            alertRestante.classList.remove('alert-success','alert-danger');
            alertRestante.classList.add('alert-warning');
        }  else {
            alertRestante.classList.remove('alert-warning', 'alert-danger')
            alertRestante.classList.add('alert-success')
        } 

        //si el total es menor a 0
        if (restante < 0) {
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }

}

//------------------------------------fin de clases----------------------------------------------------------- 

//------------------------------------Instancias de clases globales------------------------------------------
const ui = new Ui();
let presupuesto;
console.log(presupuesto);

//---------------------------------------fin de instancias globales----------------------------------------





//-----------------------------------------------funciones------------------------------------------

function preguntarPresupuesto() {
    let preguntar = prompt('cual es su presupeusto');

    if (preguntar == '' || isNaN(preguntar) || preguntar <= 0 || preguntar === null) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(preguntar); //creacion del objeto presupuesto

    ui.insertarPresupuesto(presupuesto);


}

function agregarGasto(e) {
    e.preventDefault();

    //leer los datos del form
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    let ingresarMax = 0;
    ingresarMax = Number(restanteMinimo.textContent) - Number(ingresarCantidad.value);

    if (ingresarMax <= 0) {

        // alert('excede el maximo');
        ui.imprimirAlerta('Excede el maximo', 'error');
        let ca = document.querySelector('#cantidad');
        ca.classList.add('border', 'border-danger');
        setTimeout(() => {

            ca.classList.remove('border', 'border-danger');

        }, 2000);
        return;
    } else
        if (nombreGasto === '' || cantidad === '') {

            ui.imprimirAlerta('Debe ingresar ambos campos', 'error');
            return;
        } else if (isNaN(cantidad) || cantidad <= 0) {

            ui.imprimirAlerta('Ingrese datos válidos en : "Cantidad "', 'error');
            return;
        }

    ui.imprimirAlerta('Gasto ingresado con exito', 'exito');
    console.log('agregando gasto')

    const gasto = { nombreGasto, cantidad, id: Date.now() }  //ES6
    /*objeto gasto =>
           gasto = {
               nombreGasto : nombreGasto,
               cantidad : cantidad,
               id : Date.now()
           }
       */
    //añade un nuevo gasto
    presupuesto.nuevoGasto(gasto);

    // immprimir los gastos
    const { gastos, restante, id } = presupuesto;
    console.log(gastos);
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarGastos(presupuesto);

    //reinicia formulario
    formulario.reset();
}

function eliminarGasto(id) {
    //elimina gastos desde el objeto
    presupuesto.eliminarGasto(id);

    //elimina gastos de html
    const { gastos, restante } = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comprobarGastos(presupuesto);
}

//-----------------------------------fin de funciones---------------------------------

