//imports
import mongoose from 'mongoose'
import * as carrito from "../models/carrito.js"
import * as producto from "../models/producto.js"
import connectionStringMDb from "../mongoDbConnection.json" assert {type: "json"}

// Definicion de clase Contenedor
export default class ContenedorMongoDB {
    constructor() {
    }

    async connectMongoose() {
        const conexion = await mongoose.connect(connectionStringMDb.connectionString)
        console.log(`Conectado a la base de datos`)
    }

    async getAll(coleccion) {
        let todos = []
        if (coleccion == 'carrito') {
            todos = await carrito.carrito.find({})
        }
        if (coleccion == 'producto') {
            todos = await producto.producto.find({})
        }

        return todos
    }

    async save(object, coleccion, id=null){

        if (id == null) {
            let modelo = ''
            if (coleccion == 'carrito') {
                modelo = await carrito.carrito(object)
            }
            if (coleccion == 'producto') {
                modelo = await producto.producto(object)
            }
            const savedObject = await modelo.save()

            console.log(`ID: ${JSON.stringify(savedObject)}`)
            return savedObject.insertedId
        }
        else {
            let productoActualizar = ''
            if (coleccion == 'carrito') {
                productoActualizar = await carrito.carrito.findOneAndUpdate({_id: `ObjectId('${id}')`}, object)
            }
            if (coleccion == 'producto') {
                productoActualizar = await producto.producto.findOneAndUpdate({_id: `ObjectId('${id}')`}, object)
            }
            
            return productoActualizar.insertedId
        }
    }

    async getById(id, coleccion) {

        let productoId = []
        if (coleccion == 'carrito') {
            productoId = await carrito.carrito.find({_id: `ObjectId('${id}')`})
        }
        if (coleccion == 'producto') {
            productoId = await producto.producto.find({_id: `ObjectId('${id}')`})
        }

        return ((productoId.length) ? productoId : null)
    }

    async deleteById(id, coleccion) {
        let productoBorrar = ''
        if (coleccion == 'carrito') {
            productoBorrar = await carrito.carrito.deleteOne({_id: `ObjectId('${id}')`})
        }
        if (coleccion == 'producto') {
            productoBorrar = await producto.producto.deleteOne({_id: `ObjectId('${id}')`})
        }
    }

    // async updateById(object, id) {

    //     let producto = await this.getById(id)

    //     if (producto != null) {
    //         let newItemId = await this.save(object, id)

    //         return (await this.getById(newItemId))
    //     }
    //     else {
    //         return null
    //     }
    // }

    async deleteAll(coleccion) {
        let borrarTodos = ''
        if (coleccion == 'carrito') {
            borrarTodos = await carrito.carrito.deleteMany({})
        }
        if (coleccion == 'producto') {
            borrarTodos = await producto.producto.deleteMany({})
        }
    }
}
