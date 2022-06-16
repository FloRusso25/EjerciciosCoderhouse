//imports
import mongoose from 'mongoose'
import * as carrito from "../models/carrito.js"
import * as producto from "../models/producto.js"
import connectionStringMDb from "../mongoDbConnection.json" assert {type: "json"}

// Definicion de clase Contenedor
export default class ContenedorMongoDB {
    constructor() {
        this.id = 0
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

    async save(object, coleccion, id1=null){
        let ultimoId = await this.getAll()
        console.log(`VACIA: ${JSON.stringify(ultimoId)}`)

        if (id1 == null) {
            object.id = ((JSON.stringify(ultimoId) == '[]') ? this.id : Math.max(...ultimoId.map(objeto => objeto.id)))
            object.id++
            console.log(`NUEVOID: ${object.id}`)
            let modelo = ''
            if (coleccion == 'carrito') {
                modelo = await carrito.carrito(object)
            }
            if (coleccion == 'producto') {
                modelo = await producto.producto(object)
            }
            const savedObject = await modelo.save()

            console.log(`ID: ${JSON.stringify(savedObject)}`)
            console.log(`IDIDID: ${savedObject.id}`)

            return savedObject.id
        }
        else {
            let productoActualizar = ''
            if (coleccion == 'carrito') {
                productoActualizar = await carrito.carrito.findOneAndUpdate({id: id1}, object)
            }
            if (coleccion == 'producto') {
                productoActualizar = await producto.producto.findOneAndUpdate({id: id1}, object)
            }
            
            return productoActualizar.id
        }
    }

    async getById(id1, coleccion) {

        if (coleccion == 'carrito') {
            console.log(`Entra?`)
            let carritoId = []
            carritoId = await carrito.carrito.find({id: id1})
            console.log(`CARRITOGETID: ${carritoId}`)
            return ((carritoId.length) ? carritoId : null)
        }
        if (coleccion == 'producto') {
            let productoId = []
            productoId = await producto.producto.find({id: id1})
            console.log(`PRODUCTOGETID: ${productoId}`)
            return ((productoId.length) ? productoId : null)
        }
    }

    async deleteById(id, coleccion) {
        let productoBorrar = ''
        if (coleccion == 'carrito') {
            productoBorrar = await carrito.carrito.deleteOne({id: id})
        }
        if (coleccion == 'producto') {
            productoBorrar = await producto.producto.deleteOne({id: id})
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
