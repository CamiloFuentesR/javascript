import * as UI from './interfaz.js';


class API{
    constructor(artista,cancion){
        this.artista = artista;
        this.cancion = cancion;
    
    }

    consultarAPI(){
        const url= `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //lyrics
            console.log(resultado)
            if(resultado.lyrics){
                const {lyrics} = resultado;

            UI.divResultado.textContent = lyrics;
            UI.headingResultado.textContent =`letra de la cancion : ${this.cancion} del artista : ${this.artista}`;
            UI.divResultadoTotal.classList.add('resultado-busqueda');
            }else{
                UI.divResultado.textContent ='';
                UI.headingResultado.textContent ='';
                UI.divMensajes.classList.add('error');
                UI.divResultadoTotal.classList.remove('resultado-busqueda');

                UI.divMensajes.textContent ='Lo sentimos... No se encontro la letra de la cancion';
                setTimeout(() => {
                    UI.divMensajes.textContent= '';
                    UI.divMensajes.classList.remove('error');
                }, 3000);
            }
           
            
        })
    }
}

export default API;