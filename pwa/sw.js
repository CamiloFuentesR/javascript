// cuando se instala el service worker

self.addEventListener('install', e => {
    console.log('Instalando el serviceWorker');

    console.log(e);
});


//ativar el service worker

self.addEventListener('activate', e => {
    console.log('Service Worker activado...');

    console.log(e);
});

//evento fech paa descargar archivos estaticos

self.addEventListener('fetch', e => {
    console.log('fetch...',e)
})