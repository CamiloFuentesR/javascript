const activo = document.querySelectorAll('.nav-item ');
//console.log(activo);
//console.log(activo);

//activo.addEventListener('mouseover',activar);
activar();


function activar(){
    for(let i=0;i<activo.length;i++){
   let nav = document.querySelector('.nav-link');
    let resultado =nav.classList.add('activo');
    //console.log(nav)
    return resultado;
    }   
}

for(let i=0;i<activo.length;i++){
    
        
    if(activo[1].addEventListener('mouseover',activar)){
    
        
    }
    
}