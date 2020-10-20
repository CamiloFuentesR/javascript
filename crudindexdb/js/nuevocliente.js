(function (){

const formulario = document.querySelector('#formulario');
const submit = document.querySelector('input[type="submit"]');
console.log(submit);
document.addEventListener('DOMContentLoaded', ()=>{
    conectarDB();

    formulario.addEventListener('submit',validarCliente);


})


function validarCliente(e){
    e.preventDefault();
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if(nombre ==='' || email ==='' || telefono ==='' || empresa ===''){

        imprimirAlerta('todos los campos son requeridos ','error');
        return; 
    }

    const cliente = {
        nombre,
        email,
        telefono,
        empresa,
        id:Date.now()
    }
   

    nuevoCliente(cliente);

}

    function nuevoCliente (cliente){

        const transaction = DB.transaction(['crm'],'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror =  function(){
            imprimirAlerta('error crear cliente','error');
        }

        transaction.oncomplete = function () {
            imprimirAlerta('cliente creado con exito');
            console.log('cliente creado con exito');

            setTimeout(() => {
                window.location = 'index.html';
                
            }, 1900);
        
        }

    }




})();