const nombreCache = 'apv-v1';

const archivos = [
    './',
    './error.html',
    './index.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',

    
];


// cuando se instala el service worker

self.addEventListener('install', e => {
    console.log('Instalando el serviceWorker');

    e.waitUntil(
        caches.open(nombreCache)
        .then(cache => {
            console.log('cacheando');
            cache.addAll(archivos)
        })
    )
});


//ativar el service worker

self.addEventListener('activate', e => {
    console.log('Service Worker activado...');

    e.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(
                keys.filter(key => key !== nombreCache) //filtra la version de cache actual
                .map(key => caches.delete(key))  // borra als demas versiones de cache
            )
        })
    )
});

//evento fech paa descargar archivos estaticos

self.addEventListener('fetch',  e => {
    // console.log('fetch...',e)

    e.respondWith(
        caches.match(e.request)
        .then(respuestaCache => {
            console.log(e.request);
            return respuestaCache || fetch(e.request);
        })
        .catch(()=> caches.match('./error.html'))
    )
})