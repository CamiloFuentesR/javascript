
const submit = document.querySelector('input[type="submit"]');

function imprimirAlerta(mensaje,tipo){
    const mostrarAlert = document.createElement('div');
    mostrarAlert.classList.add('px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center','border');
    

    if(tipo ===  'error'){
        mostrarAlert.classList.add('bg-red-100','border-red-400','rext-red-700');
        submit.disabled =true;//para que no se apriete el boton cuando ya hay una alerta

    }else{
        mostrarAlert.classList.add('bg-green-100','border-green-400','rext-green-700');
        mostrarAlert.textContent = mensaje;

    }
    mostrarAlert.textContent =mensaje;

    formulario.appendChild(mostrarAlert);
    setTimeout(()=>{
        mostrarAlert.remove();
        submit.disabled =false;

    },2000);

}
function conectarDB(){
    const abrirConexion = window.indexedDB.open('crm',1);

    abrirConexion.onerror =() =>{
        console.log('no se pudo conectar');
    }

    abrirConexion.onsuccess = () => {
        DB = abrirConexion.result; 
        
    }

}