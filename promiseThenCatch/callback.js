//llevar codigo de callback hell a promise

const paises  =[];


function nuevoPais(pais,callback){
    paises.push(pais);
    console.log(`Agregado pais: ${pais}`);

    callback();
}

function mostrarPais(){
    console.log(paises);
}


function iniciarCallBackHell(){
    setTimeout(()=>{
        nuevoPais('alemania',mostrarPais)
        setTimeout(() => {
            nuevoPais('francia',mostrarPais)
            setTimeout(() => {
                nuevoPais(`nigeria`,mostrarPais)
            }, 3000);
            
        }, 3000);
    },3000)
}

iniciarCallBackHell();