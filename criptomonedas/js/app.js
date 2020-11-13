const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const monedaSelect = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda : '',
    criptomoneda : ''
}

document.addEventListener('DOMContentLoaded',() => {

    consultarCriptomoneadas();

    formulario.addEventListener('submit', submitFormulario)
    criptomonedasSelect.addEventListener('change',leerValor)
    monedaSelect.addEventListener('change',leerValor)
    
})  
//crear un promise
const obtenerCriptomonedas = (criptomonedas) => new Promise( resolve => {

    resolve(criptomonedas);

}); 

function consultarCriptomoneadas() {

    const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => obtenerCriptomonedas(resultado.Data))
    .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas) {

    criptomonedas.forEach(cripto => {
 
        const {FullName,Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
        
    });

}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda)
}

function submitFormulario (e) {
    e.preventDefault();

    //validar

    const {moneda,criptomoneda} = objBusqueda;

    if(moneda === `` || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios');
    }
    //consultar api
    consultarApi();
}

function mostrarAlerta(mensaje) {
  
    const existeError = document.querySelector('.errorMensaje');

    if(!existeError){
        const msj = document.createElement('p');
        msj.textContent = mensaje;
        msj.classList.add('errorMensaje')
    
        formulario.appendChild(msj);
    
        setTimeout(() => {
            msj.remove();
        }, 3000);

    }
   
}

function consultarApi() {

    const {moneda,criptomoneda} = objBusqueda;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        mostrarSpinner();
        
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => cotizar(cotizacion.DISPLAY[criptomoneda][moneda])) //se manda como matriz para ahcerlo dinamico ya que muestra esos datos en la consulta a la api
}

function cotizar (cotizacion) {

    limpiarHtml();  

    const {PRICE,HIGHDAY, LOWDAY, CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El precio es ${PRICE}`;
    console.log(cotizacion);

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML =`El precio más alto del día : <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML =`El precio más bajo del dia: <span>${LOWDAY}</span>`;

    const ultimoDia = document.createElement('p');
    ultimoDia.innerHTML =`Variacion últimas 24 hrs : <span>${CHANGEPCT24HOUR}%</span>`;

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML =`Última Actualización : <span>${LASTUPDATE}</span>`;

    

    resultado.appendChild(precio); 
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimoDia);
    resultado.appendChild(ultimaActualizacion);

}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
 

function mostrarSpinner() {
    
    limpiarHtml();
    const spinner = document.createElement(`div`);
    spinner.classList.add('sk-cube-grid');

    spinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
    `;

    resultado.appendChild(spinner);

}