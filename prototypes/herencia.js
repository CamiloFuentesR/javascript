function Cliente(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
}

Cliente.prototype.tipoCliente = function () {

    let tipo;
    if (this.saldo > 10000) {
        tipo = 'Gold';
    } else if (this.saldo > 5000) {
        tipo = 'plate';
    } else {
        tipo = 'bronze';
    }
    return tipo;
}

Cliente.prototype.nombreClienteSaldo = function () {
    return `Nombre : ${this.nombre}  Saldo: ${this.saldo}  Tipo de Cliente : ${this.tipoCliente()}`;
}

Cliente.prototype.retiraSaldo = function (retiro) {
    this.saldo -= retiro;
}

function Persona(nombre, saldo, telefono) {
    Cliente.call(this, nombre, saldo); // al usar el call, hereda nombre y saldo del objeto Cliente
    this.telefono = telefono;
}

Persona.prototype = Object.create(Cliente.prototype);// esto es para usar la herencia

Persona.prototype.constructor = Cliente;

const camilo = new Persona('camilo', 15000, 123456789);
const pedro = new Persona('Pedro',6000,987654321);
const abel = new Cliente('Abel',9000,341442);

console.log(`el teléfono de ${camilo} es ${camilo.telefono} `);
// camilo.retiraSaldo(3000);
console.log(camilo.nombreClienteSaldo());
camilo.retiraSaldo(500);
console.log(camilo.nombreClienteSaldo());


Persona.prototype.mostrarTelefono = function (){
    return `El telefono de ${this.nombre} es: ${this.telefono}`;
}

console.log(camilo.mostrarTelefono());

console.log(pedro.nombreClienteSaldo());

console.log(abel.nombreClienteSaldo());
abel.retiraSaldo(2000);
console.log(abel.nombreClienteSaldo());
