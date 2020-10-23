 const notificarmeBtn = document.querySelector('#notificar');
 const verNotificionBtn = document.querySelector('#verNotificacion');


notificarmeBtn.addEventListener('click',()=>{
    Notification
    .requestPermission()
    .then(resultado =>{
        console.log(`el resultado es `,resultado);
    })
   
});

verNotificionBtn.addEventListener('click',()=>{
   if( Notification.permission ==='granted'){
    const notificacion = new Notification('Esta es la notificacion',{
        icon: 'img/flor.JPG',
        body : 'notiicacion de curso de js'
    });

    notificacion.onclick = ()=>{
        window.open('https://www.codigoconjuan.com')
    }
   }
});
