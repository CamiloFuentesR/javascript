import clienteAxios from "../../config/axios";

export const getPacienteById = async (id) =>{
    
    
    const cliente = await clienteAxios.get(`/pacientes/${id}`);
    const res = await cliente.data;
    return await res;
}


