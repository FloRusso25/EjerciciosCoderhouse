const fs = require('fs')
const { mysqlconnection } = require('../mysql/mysql.js')
const knex = require('knex')(mysqlconnection) 

// Definicion de clase Contenedor
class Contenedor {
    constructor(nombreTabla) {
        this.listaProductos = []
        this.nombreTabla = nombreTabla
    }

    getAll() {
        return knex.from(this.nombreTabla).select("*")
    }

    async save(object, id=null){
        if (id == null) {
            await knex(this.nombreTabla).insert(object)
                    
            return await knex.from(this.nombreTabla).select("*").where({nombre: object.nombre}, {precio: object.precio}, {urlFoto: object.urlFoto})
        }
        else {
            let producto = knex.from(this.nombreTabla).select("*").where('id','=', id)

            if (object.nombre != undefined) { producto.nombre = object.nombre }
            if (object.precio != undefined) { producto.precio = object.precio }
            if (object.urlFoto != undefined) { producto.urlFoto = object.urlFoto }

            await knex.from(this.nombreTabla).where('id', id).update(producto)

            return producto.id
        }
    }

    getById(id) {
        let producto = knex.from(this.nombreTabla).select("*").where('id','=', id)

        return ((producto.length) ? producto : null)
    }

    deleteById(id) {
        knex.from(this.nombreTabla).where('id', id).del()
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
        knex.from(this.nombreTabla).del()

    }
}

module.exports = Contenedor