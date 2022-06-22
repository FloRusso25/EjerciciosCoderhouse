const fs = require('fs')
const knex = require('knex')(mysqlconntection)

// Definicion de clase Contenedor
class Contenedor {
    constructor(nombreTabla) {
        this.listaProductos = []
        this.id = 1
        this.nombreTabla = nombreTabla
    }

    // getAll() {
    //     return knex.from(this.nombreTabla).select("*")
    // }

    // save(object, id=null){
    //     if (id == null) {
    //         object.id = this.id ++
    //         knex(this.nombreTabla).insert(object)
            
    //         return object.id
    //     }
    //     else {
    //         let producto = this.listaProductos.find(contenido => contenido.id == id)
    //         this.deleteById(id)
    //         if (object.title != undefined) { producto.title = object.title }
    //         if (object.price != undefined) { producto.price = object.price }
    //         if (object.thumbnail != undefined) { producto.thumbnail = object.thumbnail }

    //         this.listaProductos.push(producto)

    //         return producto.id
    //     }
    // }

    // getById(id) {
    //     let producto = this.listaProductos.filter(contenido => contenido.id == id)

    //     return ((producto.length) ? producto : null)
    // }

    // deleteById(id) {
    //     this.listaProductos = this.listaProductos.filter(contenido => contenido.id != id)
    // }

    // updateById(object, id) {

    //     let producto = this.getById(id)

    //     if (producto != null) {
    //         let newItemId = this.save(object, id)

    //         return (this.getById(newItemId))
    //     }
    //     else {
    //         return null
    //     }
    // }

    // deleteAll() {
    //     this.listaProductos = []

    // }
}

module.exports = Contenedor