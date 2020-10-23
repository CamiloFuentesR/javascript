const aplicarDescuento = new Promise((resolve,reject)=>{
    const descuento = true  ;


    if (descuento){
        resolve('descuento aplicado')
    }else{
        reject(`'No se pudo aplicar el descuento`)
    }
})

aplicarDescuento
.then(resultado=>{
    descuento(resultado);
})
.catch(error=>{
    console.log(error)
})


function descuento (mensaje){
    console.log(mensaje)
}

/* 
3 posibles respuestas

fulfilled - la promesa se cumplio
reject - la promesa no se cumplio
pending - no se ha cumplido ni ha sido rechzado
*/