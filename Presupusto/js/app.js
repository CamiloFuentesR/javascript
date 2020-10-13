//definciion de variables globales
const formulario = document.querySelector('#agregar-gasto');
console.log(formulario);
listeners();
function listeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
    formulario.addEventListener('submit',agregarGasto);

}

//-------------------------------------------clases---------------------------------------------------------

class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gasto = [];
    }
}

class Ui{
   
    insertarPresupuesto(cantidad){ //el objeto  de Presupuesto se le pasa a cantidad
        const {presupuesto,restante} = cantidad; //las constantes deben llamarse igual que el constructor de presupuesto;

        //agregando valores al html
        document.querySelector('#total').textContent = presupuesto; //cantidad.presupuesto
        document.querySelector('#restante').textContent = restante; //cantidad.restante
        console.log(cantidad.Presupuesto);
}
    imprimirAlerta(mensaje,tipo){
        const div = document.createElement('div');
        const contenido = document.querySelector('.contenido.primario');
        div.classList.add('text-center','alert')
        if(tipo === 'error'){
            div.classList.add('font-weight-bolder','alert-danger');
            
        }else{
            div.classList.add('font-weight-bolder','alert-success');
            

        }
        div.textContent = mensaje;

        contenido.insertBefore(div,formulario);

        setTimeout(()=>{
            div.remove();
        },2000)
    }
}

//------------------------------------fin de clases----------------------------------------------------------- 





//------------------------------------Instancias de clases globales------------------------------------------

const ui = new Ui();

let presupuesto;


//---------------------------------------fin de instancias globales----------------------------------------





//-----------------------------------------------funciones------------------------------------------

function preguntarPresupuesto(){
    let preguntar = prompt('cual es su presupeusto');
       
if(preguntar =='' || isNaN(preguntar) || preguntar <= 0 || preguntar === null){
    window.location.reload();
}

presupuesto = new Presupuesto(preguntar); //creacion del objeto presupuesto
  ui.insertarPresupuesto(presupuesto);
  //console.log(presupuesto);
  
}

function agregarGasto(e){
    e.preventDefault();
    const gasto = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;
    if(gasto ==='' ||cantidad ===''){
        
        ui.imprimirAlerta('Debe ingresar ambos campos','error');
       
    }else if(isNaN(cantidad) || cantidad <= 0){

        ui.imprimirAlerta('Ingrese datos válidos en : "Cantidad "','error');
        console.log(typeof cantidad.textContent);
    }else{
    ui.imprimirAlerta('Gasto ingresado con exito','exito');
    }
  
}


//-----------------------------------fin de funciones---------------------------------

