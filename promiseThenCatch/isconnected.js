window.addEventListener('online',actualizaEstado);
window.addEventListener('offline',actualizaEstado);
Notification
.requestPermission()
.then(resultado =>{
    console.log(`el resultado es `,resultado);
});
/* function actualizaEstado(){
    if(navigator.onLine){ 
        console.log(navigator.onLine)
    
    if( Notification.permission ==='granted'){//al parecer en chrome no es necesario hacer esta pregunta
        
        const online = new Notification('Esta conextado a internet',{
            icon: 'img/flor.JPG',
            body : 'Internet activado',
            silent : true
        });
        console.log('si estas conectado');
        console.log(online);

    }
}else {
    console.log(Notification.permission);

        const offline = new Notification('No tiene conexión a internet',{
            icon: 'img/flor.JPG',
            body : 'Verifíque que tiene acceso a internet',
            silent : true,
            
        });
}
} */


/* 
ejepmplo de notificacion
function spawnNotification(theBody,theIcon,theTitle) {
    var options = {
        body: theBody,
        icon: theIcon
    }
    var n = new Notification(theTitle,options);
    setTimeout(n.close.bind(n), 5000); 
  }

  spawnNotification('agua','','aguita');
 */

function actualizaEstado() {
    if( Notification.permission ==='granted'){
    if(navigator.onLine){ 
    const options = {
        body: 'conectado',
        icon: 'img/flor.JPG'
    }
    let n = new Notification('Conectado',options);
    setTimeout(n.close.bind(n), 5000); 
  }else{
    const options = {
        body: 'desconectado',
        icon: 'img/flor.JPG'
    }
    let n = new Notification('Sin Conexion',options);
    setTimeout(n.close.bind(n), 5000); 
  }
return;
}
  console.log('sin permiso de notificaciones')

}