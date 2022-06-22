// Definicion de clase Contenedor
class ContenedorMemoria {
    constructor() {
        this.listaItems = []
        this.id = 0
    }

    getAll() {
        return this.listaItems
    }

    save(object, id=null){
        if (id == null) {
            object.id = this.id ++
            this.listaItems.push(object)

            return object.id
        }
        else {
            let item = this.listaItems.find(contenido => contenido.id == id)
            this.deleteById(id)

            this.listaItems.push(item)

            return item.id
        }
    }

    getById(id) {
        let item = this.listaItems.filter(contenido => contenido.id == id)

        return ((item.length) ? item : null)
    }

    deleteById(id) {
        this.listaItems = this.listaItems.filter(contenido => contenido.id != id)
    }

    updateById(object, id) {

        let item = this.getById(id)

        if (item != null) {
            let newItemId = this.save(object, id)

            return (this.getById(newItemId))
        }
        else {
            return null
        }
    }

    deleteAll() {
        this.listaItems = []

    }
}

module.exports = ContenedorMemoria