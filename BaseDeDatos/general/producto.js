//import
const fs = require('fs')
const Contenedor = require("./contenedor.js")
const { mysqlconnection } = require('../mysql/mysql.js')
const knex = require('knex')(mysqlconnection)
// Definicion de clase Contenedor
class Producto extends Contenedor {
    constructor(nombreTabla) {
        super(nombreTabla)
        this.timestamp = Date.now()
    }

    async getAll() {
        try {
            return await super.getAll()
        }
        catch (error) {
            console.log(`ERROR: No se pudo listar todos los productos. Mensaje: ${error}`)
        }   
    }

    async setId() {
        try {
            return await super.setId()
        }
        catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async save(object, id=null){
        object.timestamp = this.timestamp

        if (id == null) {
            return await super.save(object)
        }
        else {
            let producto = await this.getById(id)

            if (object.nombre != undefined) { producto.nombre = object.nombre }
            if (object.descripcion != undefined) { producto.descripcion = object.descripcion }
            if (object.codigo != undefined) { producto.codigo = object.codigo }
            if (object.precio != undefined) { producto.precio = object.precio }
            if (object.foto != undefined) { producto.foto = object.foto }
            if (object.stock != undefined) { producto.stock = object.stock }
            
            return await super.save(producto, producto.id)
        }
    }

    async getById(id) {
        try {
            return await super.getById(id)
        }
        catch (error){
            console.log(`ERROR: Producto con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            await super.deleteById(id)
        }
        catch (error){
            console.log(`ERROR: No se pudo eliminar id ${id}. Mensaje: ${error}`)
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

export default Producto