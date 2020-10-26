import * as UI from './interfaz.js';
import API from './api.js';



UI.formulario.addEventListener('submit',buscarCancion);


function buscarCancion(e){

    e.preventDefault();

    const artistaInput = document.querySelector('#artista').value,
          cancionInput = document.querySelector('#cancion').value;
          
          if(artistaInput === '' || cancionInput === ''){

            UI.divMensajes.textContent = 'Error... Todos los campos son obligatorios';
            UI.divMensajes.classList.add('error');//css hoja de estilos css

            setTimeout(() => {
                UI.divMensajes.textContent ='';
                UI.divMensajes.classList.remove('error');
            }, 3000);
            return;
          }

          //consultar la api    
         const busqueda = new API(artistaInput,cancionInput);

         busqueda.consultarAPI();

}


