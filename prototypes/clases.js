class Persona {
    constructor(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo;

    }
    mostrar() {
        return `A ${this.nombre} le queda $${this.saldo} de saldo`
    }
}

class Empresa extends Persona {
    constructor(nombre, saldo, telefono, email) {
        super(nombre, saldo);
        this.telefono = telefono;
        this.email = email;
    }

    mostrarEmpresa(nombre) {
        return `nombre: ${nombre} saldo: ${this.saldo} telefono : ${this.telefono} Email : ${this.email}`;
    }

}

const juan = new Empresa(
    'Camilo',
    600,
    123456789,
    'juan@gmail.com'
);

console.log(juan.mostrarEmpresa('Pedro'));
console.log(juan);

let pedro = [];
pedro = [new Empresa({
    nombre: 'Pedro',
    saldo: 50000,
    telefono: 123131313,
    email: 'pedro@gmail.com'
}, ('asd'), ('dasdad'), ('juan@gmail.com')),
new Persona({
    nombre: 'Pedro',
    saldo: 50000,
    telefono: 123131313,
    email: 'pedro@gmail.com'
})]

console.log(pedro);

let heriberto = {
    persona:
    {
        nombre: 'juan',
        algo: 'asdada',
        sobrenombre: 'animal'
    },
    masota:'adsd',
    cantidad : 1
}

console.log(heriberto.cantidad);

