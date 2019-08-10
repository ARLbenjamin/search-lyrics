import * as UI from './interfaz.js';
import {API} from './api.js';
UI.formulario.addEventListener('submit', (e)=>{
     e.preventDefault();
    
     //obtener los datos del formulario

    const artista= document.querySelector('#artista').value,
         cancion= document.querySelector('#cancion').value;
    
    if(artista === '' || cancion=== ''){
        //mensaje de error por falta de datos en el formulario
        UI.divMensajes.innerHTML= 'Todos los campos son obligatorios...';
        UI.divMensajes.classList.add('error');

        setTimeout(()=>{

            UI.divMensajes.innerHTML= '';
            UI.divMensajes.classList.remove('error');
    
        }, 3000);
    } else{
        //los campos se llenaron correctamente
     const api= new API(artista, cancion);
     api.consultarAPI().then((data)=>{
         if(data.consulta.lyrics){
             //la cancion existe
            const letra= data.consulta.lyrics;
            UI.divResultados.innerHTML= `${letra}`;
          
         
            } else{
             //La cancion no existe
            UI.divMensajes.innerHTML= 'No existe una cancion con los parametros solicitados..';
            UI.divMensajes.classList.add('error');
    
            setTimeout(()=>{
    
                UI.divMensajes.innerHTML= '';
                UI.divMensajes.classList.remove('error');
                UI.formulario.reset();
            }, 3000);
         }
     })
      
    }
})