//import
import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"

// Definicion de clase Contenedor
export default class CarritoFB extends ContenedorFirebase {
    constructor(admin, coleccion) {
        super(admin, coleccion)
    }

    async getAll() {
        try {
            return await super.getAll()
        }
        catch (error) {
            console.log(`ERROR: No se pudo listar todos los carritos. Mensaje: ${error}`)
        }   
    }

    async save(object, id=null){
        const today = new Date()
        const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        object.timestamp = date

        if (id == null) {
            return await super.save(object)
        }
        else {            
            return await super.save(object, object.id)
        }
    }

    async getById(id) {
        try {
            return await super.getById(id)
        }
        catch (error){
            console.log(`ERROR: Carrito con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await super.deleteById(id)
        }
        catch (error){
            console.log(`ERROR: No se pudo eliminar carrito con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await super.deleteAll()
        }
        catch (error) {
            console.log(`ERROR: No se pudo borrar el contenido de ${this.nombreArchivo}. Mensaje: ${error}`)
        }

    }

    // async updateById(object, id) {       
    //     let carrito = await super.getById(id)

    //     if (carrito != null) {
    //         let newCarritoId = await this.save(object, id)

    //         return (await super.getById(newCarritoId))
    //     }
    //     else {
    //         return null
    //     }
    // }
}
