const fullScreenBtn = document.querySelector('#abrir-pantalla-completa');
const fullScreenOutBtn = document.querySelector('#salir-pantalla-completa');

const img = document.querySelector('#imagen');
/* 
img.addEventListener('click',function(e){
    getFullscreen(this);
}),false;

function aumentarImagen(){
   getFullscreen(this);
}
 */
/* function getFullscreen(img){
    if(img.requestFullscreen) {
        img.requestFullscreen();
      } else if(img.mozRequestFullScreen) {
        img.mozRequestFullScreen();
      } else if(img.webkitRequestFullscreen) {
        img.webkitRequestFullscreen();
      } else if(img.msRequestFullscreen) {
        img.msRequestFullscreen();
      }
  }
img.addEventListener('click',function(){
    getFullscreen(this);
})
 */


let imagen = false;

img.addEventListener('click',()=>{
   //document.documentElement.requestFullscreen(); cuando se quiere toda la pantalla completa
    img.requestFullscreen() // se apunta a ese elemento en especifico   
   
    .then(()=>{
        imagen=true;
        })

});

    img.addEventListener('click',function(e){
        if(imagen){
        document.exitFullscreen(this);
        imagen = false;
        }
    })

 
/* function pantallaCompleta(){
 document.documentElement.requestFullscreen();
} */

