function Cliente(nombre,saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

Cliente.prototype.tipoCliente = function (){

    let tipo;

    if(this.saldo > 1000){
        tipo = 'Gold';
    }else if (this.saldo > 500){
        tipo = 'plate';
    }else{
        tipo = 'bronze';
    }
    return tipo;
}

Cliente.prototype.nombreClienteSaldo = function (){
    
    return `Nombre : ${this.nombre}  Saldo: ${this.saldo}  Tipo de Cliente : ${this.tipoCliente()}`;
}

Cliente.prototype.retiraSaldo = function (retiro) {
    this.saldo -= retiro ;
}

//instaciarlo

const camilo = new Cliente('camilo',7000);


 console.log(camilo.tipoCliente() );

console.log(camilo.nombreClienteSaldo());
camilo.retiraSaldo(2000);
console.log(camilo.nombreClienteSaldo());