export {Citas}

class Citas {
    constructor() {
        this.citas = [];

    }

    agregarCita(citas) {
        this.citas = [...this.citas, citas]

    }
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
    editarCita(citaActualizada){

        this.citas = this.citas.map(cita=> cita.id ===citaActualizada.id ? citaActualizada : cita)
    }
}