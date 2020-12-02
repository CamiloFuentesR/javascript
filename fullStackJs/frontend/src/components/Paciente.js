import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Pacientes = ({citas}) => {  //desde props se extraen los atributos 


    if(citas.length === 0) return null;
    console.log(citas)

    return (
        <Fragment>
            <h1 className="my-5">Administrado de Pacientes</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/nueva'} className=" btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Crear Cita</Link>

                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {citas.map(cita => (

                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a key={cita._id} className="p-5 list-group-item list-group-item-action flex-colum align-item-start">
                                    <div className="d-flex w-100 justify-content-between b-4">
                                        <h3  className="mb-3">Mascota: {cita.nombre}</h3> 
                                        <small className="fecha-alta">
                                            {cita.fecha} - {cita.hora}
                                        </small>

                                    </div>
                                    
                                    <p className="mb-0">
                                        {cita.sintomas}
                                    </p>
                                    <div className="contacto py-3">
                                        <p>Dueño: {cita.propietario}</p>
                                        <p>Telefono: {cita.telefono}</p>
                                    </div>
                                    

                                </a>
                               
                            ) )}
                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
      );
}
 
export default Pacientes;