//identificar si un elemento es visible
// es una api nativa de js
document.addEventListener('DOMContentLoaded',()=>{

    const observer =new IntersectionObserver(entries =>{
        console.log(entries[0]);

        if(entries[0].isIntersecting) {
            console.log('ya esta visible');
        }
    })

    observer.observe(document.querySelector('button')) //aqui se le da la referencia que queremos ver e la pag
})

