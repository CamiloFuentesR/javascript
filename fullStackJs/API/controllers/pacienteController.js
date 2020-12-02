const { response } = require('express');
const Paciente = require('../models/Paciente.js');

//cuando se crea un nueve cliente 
exports.nuevoCliente = async (req, res = response, next) => {
    const paciente = new Paciente(req.body);
    try {

        await paciente.save();

        res.status(201).json({
            ok: true,
            msg: 'registro'
            /*  nombre,
              propietario,
             fecha,
             hora,
             sintomas  */
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        next();

    }

    // console.log(req.body);
    //Todo insertar a la bdd

    // const {}

    // res.json({mensaje: 'El cliente se agrego coretamente'}); 
    // const {nombre,propietario,fecha,hora,sintomas} = req.body;
}

exports.show = (req, res, next) => {

    res.json({ mensaje: 'estas en la vista' })
}

exports.obtenerPacientes = async (req, res, next) => {

    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.obtenerPorId = async (req, res, next) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);

    } catch (error) {

        console.log(error);
        next();

    }
}

exports.actualizarPaciente = async (req, res, next) => {
    try {
        const paciente = await Paciente.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true //para qjue nos traiga el nuevo registro y no el antiguo
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPaciente = async (req, res, next) => {

    try {
        const paciente = await Paciente.findByIdAndDelete({ _id: req.params.id });
        res.json({ mensaje: `El Paciente:${paciente.nombre} fue eliminado` });
    } catch (error) {
        console.log(error);
        next();

    }

}