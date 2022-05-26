//import
const fs = require('fs')
const Contenedor = require("./contenedor.js")

// Definicion de clase Contenedor
class Carrito extends Contenedor {
    constructor(nombreArchivo) {
        super(nombreArchivo)
        this.timestamp = Date.now()
    }

    async getAll() {
        try {
            return await super.getAll()
        }
        catch (error) {
            console.log(`ERROR: No se pudo listar todos los carritos. Mensaje: ${error}`)
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
            object.productos = []
            return await super.save(object)
        }
        else {
            let carrito = await this.getById(id)
            await super.deleteById(id)

            if (object.productos != undefined) { carrito.productos = carrito.productos }
            
            return await super.save(carrito, carrito.id)
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

module.exports = Carrito

