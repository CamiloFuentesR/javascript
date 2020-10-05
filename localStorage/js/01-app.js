localStorage.setItem('nombre', 1);

const producto = {
    nombre : "Monitor 24 Pulgadas",
    precio: 300
}
//parsear a string u objeto para ser leido por local storage
const productoString = JSON.stringify(producto);
localStorage.setItem('productos',productoString);

//parsear un array para que sea un string y sea leido por local storage
let meses = ['Enero', 'Febrero', 'Marzo'];
localStorage.setItem('meses', JSON.stringify( meses ));