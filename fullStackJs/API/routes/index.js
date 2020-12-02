const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController.js');

module.exports = () => {

    router.get('/pacientes',
        pacienteController.obtenerPacientes
    );
    //agrega nuevos pacientes via post
    router.post('/pacientes',
        pacienteController.nuevoCliente
    );

    router.get('/pacientes/:id',
        pacienteController.obtenerPorId
    );

    router.put('/pacientes/:id',
        pacienteController.actualizarPaciente
    );

    router.delete('/pacientes/:id',
        pacienteController.eliminarPaciente
        );
    return router;
}