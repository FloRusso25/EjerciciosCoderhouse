//import
const fs = require('fs')

// Definicion de clase Contenedor
class Contenedor {
    constructor() {
        this.listaProductos = []
        this.id = 1
    }

    getAll() {
        return this.listaProductos
    }

    save(object, id=null){
        if (id == null) {
            object.id = this.id ++
            this.listaProductos.push(object)

            return object.id
        }
        else {
            let producto = this.listaProductos.find(contenido => contenido.id == id)
            this.deleteById(id)
            if (object.title != undefined) { producto.title = object.title }
            if (object.price != undefined) { producto.price = object.price }
            if (object.thumbnail != undefined) { producto.thumbnail = object.thumbnail }

            this.listaProductos.push(producto)

            return producto.id
        }
    }

    getById(id) {
        let producto = this.listaProductos.filter(contenido => contenido.id == id)

        return ((producto.length) ? producto : null)
    }

    deleteById(id) {
        this.listaProductos = this.listaProductos.filter(contenido => contenido.id != id)
    }

    updateById(object, id) {

        let producto = this.getById(id)

        if (producto != null) {
            let newItemId = this.save(object, id)

            return (this.getById(newItemId))
        }
        else {
            return null
        }
    }

    deleteAll() {
        this.listaProductos = []

    }
}

module.exports = Contenedor

