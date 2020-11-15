// const url = "http://localhost:4000/clientes";

const url = "https://kmikmilo.netlify.app:4000/clientes";

export const nuevoCliente = async cliente => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),  //se puede mandar como json o como objeto, en este caso coomo json
            headers:{
                'Content-Type': 'application/json'
            }    
        });
         window.location.href = 'index.html'; 
    } catch (error) {
        console.log(error);
    }
}

export const obtenerClientes = async() =>{

    try {
        const resultado = await fetch(url);
        const clientes = await resultado.json();
        return clientes;
    } catch (error) {
        console.error(error);        
    }

}

//elimina un cliente
export const eliminarCliente = async id => {

    try {

        await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
         
    } catch (error) {
        console.error(error);
        
    }

}

//obtiene un cliente por su id

export const obtenerCliente = async id => {
    try {
        const resultado = await fetch(`${url}/${id}`);
        const cliente = await resultado.json();
        return cliente;
        
    } catch (error) {
        console.error(error);
        
    }
}

//actualiza un registro

export const editarCliente = async cliente => {
    const {id} = cliente;
    try {
        await fetch(`${url}/${id}`,{
            method: 'PUT',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        window.location.href = 'index.html'; 
        
    } catch (error) {
        console.error(error);
        
    }
}