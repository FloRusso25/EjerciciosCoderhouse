//import
import ContenedorMongoDB from "../../contenedores/contenedorMongoDb.js"

// Definicion de clase Contenedor
export default class CarritoMongoDB extends ContenedorMongoDB {
    constructor(coleccion) {
        super()
        this.coleccion = coleccion
    }

    async getAll() {
        try {
            return await super.getAll(this.coleccion)
        }
        catch (error) {
            console.log(`ERROR: No se pudo listar todos los carritos. Mensaje: ${error}`)
        }   
    }

    async save(object, id=null){
        try {
            return await super.save(object, id, this.coleccion)
        }
        catch (error) {
            console.log(`ERROR: No se pudo guardar el carrito ${object}. Mensaje: ${error}`)
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

    async updateById(object, id) {       
        let producto = await super.getById(id)

        if (producto != null) {
            let newItemId = await this.save(object, id)

            return (await super.getById(newItemId))
        }
        else {
            return null
        }
    }
}
