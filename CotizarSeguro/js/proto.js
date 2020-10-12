function Persona(nombre, edad) {
 
    this.nombre = nombre;
    this.edad = edad;
    
    }
    
    Persona.prototype.info = function() {
    
    console.log(this.nombre + " " + this.edad);
    
    }
    
    
    var pepito = new Persona("pepito", 20);
    var juanito = new Persona("juanito", 30);
    
    pepito.info();
    juanito.info();
    
    
    Persona.prototype.info = function() {
    
    console.log("otro");
    }
    
    
    juanito.info();
    pepito.info();