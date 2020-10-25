

const contenedor = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const buscarPais = document.querySelector('#pais');

/* const ciudadSelect = document.querySelector('#ciudad');

console.log(ciudadSelect);

const option =document.createElement('option');

ciudadSelect.appendChild(option)
*/

buscarPais.addEventListener('change',ciudad); 


function obtenerPais(e){

    
    console.log(e.target.value)
}

// window.addEventListener('DOMContentLoaded',ciudad);


window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);
});


function buscarClima(e){
    e.preventDefault();

    //validar

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad ==='' || pais ===''){
         mostrarError('Ambos campos son obligtorios');

      /*   Swal.fire(
            'Campos vacìos',
            '¿Revisaste que todos los campos esten llenos?',
            'warning'
          ) */

        return;
    }

    //consultar la API
    

    consultarApi(ciudad,pais);
}


function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta){
        //el scope de alerta no llega dentro de esta funcion
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px4','py3','rounded','max-w-md','mx-auto','mt-6','text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!!</strong>
        <span class="block">${mensaje}</span>
        `;

        contenedor.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
            
        }, 2000);

    }
}

function ciudad(e){
    const ciudadValue = e.target.value;
    
    const url = 'ciudad/city.json';

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => mostrarCiudad(datos,ciudadValue))
}

function mostrarCiudad(datos,id){
    console.log(id)
    const {country} =datos;
    const contenido = document.querySelector('#ciudad');
    let html =``;

    let ciudades = datos.filter(ciudad => id === ciudad.country)
  
    
    ciudades.forEach(nombre => {
        html +=`
        <option value="${nombre.name}">${nombre.name}</option>`;
           
       });
       contenido.innerHTML =html;
       $('.select2').select2();

 /*    ciudades.forEach(ciudad => {
    let newCiudades = new Option(ciudad.name,ciudad.id,false,false);
    $('.select2').append(newCiudades).trigger('change').select2();
    }); */


/*         console.log(ciudades);
 */     /*    for(let nombre of ciudades) {
           console.log(nombre.name) */
          
       /*    ciudades.forEach(ciudad => {
           const ciudadSelect = document.querySelector('#ciudad');

            const option =document.createElement('option');
            option.value = ciudad.name;
            option.textContent = ciudad.name;
            
             
            ciudadSelect.appendChild(option) 

               
           });  */

          
 /*    */



/* ciudadSelect.innerHTML = html;
             */
        

      


     /*    

        if(country ==='CL'){
            console.log(datos);
        } */

       
        // const {id,nombre,empresa,trabajo} = datos;

  /*       html += `
        --------------------------------------
        <p>Id : ${id}</p>
        <p>Nombre : ${nombre}</p>
        <p>Empresa : ${empresa}</p>
        <p>Trabajo : ${trabajo}</p>
        --------------------------------------
        `;
    });
     */
    
  
 
}


        
    




function consultarApi(ciudad,pais){
    const apiId = 'e2a01a2c23f18128b343c96a3cc180e5';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        if(datos.cod ==="404"){
            mostrarError('Ciudad no encontrada');
        }
    })
}

