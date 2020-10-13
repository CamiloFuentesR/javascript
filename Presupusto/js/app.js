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
    nuevoGasto(gasto){
        this.gasto = [...this.gasto,gasto];
        console.log(this.gasto);

        

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
        const btn = document.querySelector('.btn-primary')
        formulario.insertBefore(div,btn);

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
  console.log(presupuesto);
  
}

function agregarGasto(e){
    e.preventDefault();

    //leer los datos del form
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);
    if(nombreGasto ==='' ||cantidad ===''){
        
        ui.imprimirAlerta('Debe ingresar ambos campos','error');
       return;
    }else if(isNaN(cantidad) || cantidad <= 0){

        ui.imprimirAlerta('Ingrese datos válidos en : "Cantidad "','error');
        console.log(typeof cantidad.textContent);
        return;
    }
    ui.imprimirAlerta('Gasto ingresado con exito','exito');
    console.log('agregando gasto')
    
    const gasto = { nombreGasto,cantidad,id: Date.now()}  //ES6
    presupuesto.nuevoGasto(gasto);
    /*objeto gasto =>
        gasto = {
            nombreGasto : nombreGasto,
            cantidad : cantidad,
            id : Date.now()
        }
    */

    //reinicia formulario
    formulario.reset();
    
  
}


//-----------------------------------fin de funciones---------------------------------

