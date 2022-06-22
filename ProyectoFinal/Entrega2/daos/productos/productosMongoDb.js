//import
import ContenedorMongoDB from "../../contenedores/contenedorMongoDb.js"


// Definicion de clase Contenedor
export default class ProductoMongoDB extends ContenedorMongoDB {
    constructor(coleccion) {
        super()
        this.timestamp = Date.now()
        this.coleccion = coleccion
    }

    async getAll() {
        try {
            return await super.getAll(this.coleccion)
        }
        catch (error) {
            console.log(`ERROR: No se pudo listar todos los productos. Mensaje: ${error}`)
        }   
    }

    async save(object, id=null){
        object.timestamp = this.timestamp

        try {
            return await super.save(object, this.coleccion, id)
        }
        catch (error) {
            console.log(`ERROR: No se pudo guardar el producto ${object}. Mensaje: ${error}`)
        } 
    }

    async getById(id) {
        try {
            return await super.getById(id, this.coleccion)
        }
        catch (error){
            console.log(`ERROR: Producto con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await super.deleteById(id, this.coleccion)
        }
        catch (error){
            console.log(`ERROR: No se pudo eliminar el producto con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await super.deleteAll(this.coleccion)
        }
        catch (error) {
            console.log(`ERROR: No se pudo borrar el contenido de ${this.nombreArchivo}. Mensaje: ${error}`)
        }

    }

    // async updateById(object, id) {       
    //     let producto = await super.getById(id)

    //     if (producto != null) {
    //         let newItemId = await this.save(object, id)

    //         return (await super.getById(newItemId))
    //     }
    //     else {
    //         return null
    //     }
    // }
}
