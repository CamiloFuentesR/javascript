const activo = document.querySelector('.activo');

activo.addEventListener('mouseover',activar);



function activar(e){
    const nav = document.querySelector('nav-item')
    const crear = nav.classList.add('acivo');
    nav.appendChild(crear);

}