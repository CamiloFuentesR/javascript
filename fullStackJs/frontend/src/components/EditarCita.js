import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

const EditarCita = (props) => {
    const { id } = useParams();
    const cliente = clienteAxios.get(`/pacientes/${id}`);
    const isMounted = useRef(true);
    const [prom, setProm] = useState(props.cita || {
        _id: '',
        nombre: '',
        fecha: '',
        hora: '',
        sintomas: '',
        telefono: '',
        propietario: ''
    });



    useEffect(() => {
        return () => {
            setProm({})
        }
    }, [])
    useEffect(() => {

        if (isMounted.current) {
            cliente.then(async (res) => {
                try {
                    const perro = await res.data;
                    await setProm(perro);

                } catch (error) {
                    console.log(error)
                }
            })
        }
        return () => {
            isMounted.current = false;
        }
    }, [id, cliente])



    /*   const { citas, consultar, guardarConsultar,state,dispatch } = useContext(UserContext)
      async function show (id) {
          const paciente = await state;
          setProm( await paciente.find(async res=>await res._id===id))
          console.log(prom)
          return await paciente.find(async res=>await res._id===id)
      
      }
      show(id);  */
    /*   if(isMounted.current){
          guardarCita(props.cita)
      } */
    /*     console.log(citas)
        let ci=[]
        ci = citas?.find(ci=>ci._id===props.cita._id) || [];
        console.log(ci)
     */
    /*    function mostrar(){
           if(props.cita){
               return props.cita
           }
           return []
       } */
    /*  useEffect(() => {
        return () =>{
     isMounted.current =props.cita;
          
        }
         
     }, []) */

    const history = useHistory();

    /*  useEffect(() => {
 
         cliente.then((res) => {
             const perro = res.data;
             guardarCita(perro);
         })
 
     }, [id]); */


    // let guardado = obtenerUserById(id)
    // console.log(guardado)
    //  console.log(user.then(res=>console.log(res)))
    //  const us = useMemo( () => obtenerUserById(id), [id])
    // const { _id, nombre, hora, fecha, propietario, sintomas, telefono } = citas;
    //le los datos del form
    function actualizarState(e) {
        setProm({
            ...prom,
            [e.target.name]: e.target.value,
        })
    }

    // Enviar una peticion a la Api
    const editarCita = e => {
        e.preventDefault();
        clienteAxios.put(`/pacientes/${id}`, prom)
            .then(respuesta => {
                console.log(respuesta)
                //estos props es enviado desde el componente padre app.js
                //se hace para que la pag se refresque automaticamente
                props.guardarConsultar(true);
                //redireccionar
                history.push('/');
            })
    }
    return (
        <>
            <h1 className="my-5">Editar Cita</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className=" btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Volver </Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <form
                            onSubmit={editarCita}
                            className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre Mascota</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nombre"
                                    name="nombre"
                                    value={prom.nombre}
                                    placeholder="Nombre Mascota"
                                    onChange={actualizarState}

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Nombre Propietario</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="propietario"
                                    name="propietario"
                                    value={prom.propietario}
                                    placeholder="Nombre Propietario"
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="tel"
                                    className="form-control form-control-lg"
                                    id="telefono"
                                    name="telefono"
                                    value={prom.telefono}
                                    placeholder="Teléfono"
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="fecha">Fecha Alta</label>
                                <input
                                    type="date"
                                    className="form-control form-control-lg"
                                    id="fecha"
                                    name="fecha"
                                    value={prom.fecha}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="hora">Hora Alta</label>
                                <input
                                    type="time"
                                    className="form-control form-control-lg"
                                    id="hora"
                                    name="hora"
                                    value={prom.hora}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Síntomas</label>
                                <textarea
                                    className="form-control"
                                    name="sintomas"
                                    value={prom.sintomas}
                                    rows="6"
                                    onChange={actualizarState}
                                ></textarea>
                            </div>
                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Guardar Cita" />
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default withRouter(EditarCita);