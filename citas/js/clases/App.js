import {crearDB, datosCita,nuevaCita } from '../funciones.js'
import {mascotaInput,propietarioInput,fechaInput,telefonoInput,horaInput,sintomasInput,formulario} from '../selectores.js'
export class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        //formulario para nuevas citas
        formulario.addEventListener('submit', nuevaCita);

        
        //se ejecuta cuando se abre la ventana
        crearDB();
        // window.onload = () =>{
           
        // }
        
    }
    
}

