//import
const fs = require('fs')

// Definicion de clase Contenedor
class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
    }

    async getAll() {
        try {
            let filePath = process.cwd()
            let contenido = await fs.promises.readFile(`${filePath}/${this.nombreArchivo}.txt`)

            return contenido.length > 0 ? JSON.parse(contenido): []
        }
        catch (error) {
            console.log(`ERROR: No se pudo leer ${this.nombreArchivo}. Mensaje: ${error}`)
        }   
    }

    async setId() {
        try {
            let id = 1
            const contenido = await this.getAll()
            if (contenido.length > 0) {
                id = (Math.max(...contenido.map(contenido => contenido.id))) + 1
            }        

            return id
        }
        catch (error) {
            console.log(`ERROR: ${error}`)
        }
    }

    async save(object){
        try {
            let id = await this.setId()
            object.id = id
            const contenido = await this.getAll()
            contenido.push(object)

            let filePath = process.cwd()
            await fs.promises.writeFile(`${filePath}/${this.nombreArchivo}.txt`, JSON.stringify(contenido)) 
            console.log(`${object.title} agregado a ${this.nombreArchivo}`)

            return id
        }
        catch (error) {
            console.log(`ERROR: No se pudo agregar ${object.title} a ${this.nombreArchivo}. Mensaje: ${error}`)
        }        
    }

    async getById(id) {
        try {
            const contenido = await this.getAll()
            let item = contenido.filter(contenido => contenido.id == id)

            return ((item.length) ? item : null)
        }
        catch (error){
            console.log(`ERROR: No se pudo obtener el item con id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const contenido = await this.getAll()
            let newContent = contenido.filter(contenido => contenido.id != id)

            let filePath = process.cwd()
            await fs.promises.writeFile(`${filePath}/${this.nombreArchivo}.txt`, JSON.stringify(newContent)) 
            console.log(`ID ${id} eliminado de ${this.nombreArchivo}`)
        }
        catch (error){
            console.log(`ERROR: No se pudo eliminar id ${id}. Mensaje: ${error}`)
        }
    }

    async deleteAll() {
        try {
            
            let filePath = process.cwd()
            await fs.promises.writeFile(`${filePath}/${this.nombreArchivo}.txt`, '') 
            console.log(`Todas las entradas borradas en ${this.nombreArchivo}`)
        }
        catch (error) {
            console.log(`ERROR: No se pudo borrar el contenido de ${this.nombreArchivo}. Mensaje: ${error}`)
        }

    }
}

module.exports = Contenedor

