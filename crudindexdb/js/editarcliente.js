(function(){

let idCliente;
const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const empresaInput = document.querySelector('#empresa');
const emailInput = document.querySelector('#email');
const formulario = document.querySelector('#formulario');


document.addEventListener('DOMContentLoaded',()=>{
    conectarDB();
    //verificar  el ID de la url
    //obtener id desde la url

    formulario.addEventListener('submit',actualizarCliente);

    const parmetrosURL = new URLSearchParams(window.location.search);
    idCliente = parmetrosURL.get('id');

    if(idCliente){

        setTimeout(()=>{
            obtenerCliente(idCliente);

        },100);
      
    }

})     

function obtenerCliente(id){
    const transaction = DB.transaction(['crm'],'readonly');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = (e) =>{
        const cursor = e.target.result;

        if(cursor){
            if(cursor.value.id === Number(id)){
                llenarFormulario(cursor.value);
            }
           
            cursor.continue();
        }
    }
}

function llenarFormulario(datosCliente){

    const {nombre,telefono,email,empresa} =datosCliente;
    console.log(nombreInput);
    nombreInput.value = nombre;
    telefonoInput.value = telefono;
    emailInput.value = email;
    empresaInput.value = empresa;
    
}

function actualizarCliente(e){
    e.preventDefault();
    if(nombreInput.value ===' ' || telefonoInput.value ==='' || emailInput.value === '' || empresaInput.value ===''){
        imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }

    const ClienteActialuzado = {
        nombre : nombreInput.value,
        telefono : telefonoInput.value,
        email : emailInput.value,
        empresa : empresaInput.value,
        id : Number(idCliente)  
    }

    const transaction = DB.transaction(['crm'],'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(ClienteActialuzado);

    transaction.oncomplete = () =>{
        imprimirAlerta('Cliente actualizado');
        setTimeout(()=>{
            window.location ='index.html'
        },1000)
    };

    transaction.onerror = () =>{
        imprimirAlerta('No se ha podido actualizar el Cliente');
    }
}

})();