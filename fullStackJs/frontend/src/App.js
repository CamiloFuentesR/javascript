import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cita from './components/Cita';
import NuevaCita from './components/NuevaCita';
import Pacientes from './components/Paciente';
import clienteAxios from './config/axios';

function App() {

    //State de la app
    const [citas, guardarCitas] = useState([]);  //en citas se guarda la info creada en la funcion guardar citas
    const [consultar, guardarConsultar] = useState(true);

    useEffect(() => {

        if (consultar) {
            const consultarApi = () => {
                clienteAxios.get('/pacientes')
                    .then(respuesta => {
                        // colocar el resultado en el state
                        guardarCitas(respuesta.data)
                        //deshabilitar la consulta
                        guardarConsultar(false);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            consultarApi();
        }
        
    }, [consultar]);

    console.log(process.env.REACT_APP_BACKEND_URL)
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={() => <Pacientes citas={citas} />}
                />
                <Route
                    exact
                    path="/nueva"
                    component={() => <NuevaCita guardarConsultar= {guardarConsultar} />}
                />
                <Route
                    exact
                    path="/cita/:id"
                    component={Cita}
                />
            </Switch>
        </Router>
    );
}

export default App;
