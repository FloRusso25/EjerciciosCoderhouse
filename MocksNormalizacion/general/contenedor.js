const knex = require('knex')

// Definicion de clase Contenedor
class Contenedor {
    constructor(nombreTabla, conexion) {
        this.listaProductos = []
        this.nombreTabla = nombreTabla
        this.knex = knex(conexion)
    }

    getAll() {
        return this.knex.from(this.nombreTabla).select("*")
    }

    async save(object, id=null){
        if (id == null) {
            await this.knex(this.nombreTabla).insert(object)
                    
            return await this.knex.from(this.nombreTabla).select("*").where({nombre: object.nombre}, {precio: object.precio}, {urlFoto: object.urlFoto})
        }
        else {
            let producto = this.knex.from(this.nombreTabla).select("*").where('id','=', id)

            if (object.nombre != undefined) { producto.nombre = object.nombre }
            if (object.precio != undefined) { producto.precio = object.precio }
            if (object.urlFoto != undefined) { producto.urlFoto = object.urlFoto }

            await this.knex.from(this.nombreTabla).where('id', id).update(producto)

            return producto.id
        }
    }

    getById(id) {
        let producto = this.knex.from(this.nombreTabla).select("*").where('id','=', id)

        return ((producto.length) ? producto : null)
    }

    deleteById(id) {
        this.knex.from(this.nombreTabla).where('id', id).del()
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
        this.knex.from(this.nombreTabla).del()

    }
}

module.exports = Contenedor