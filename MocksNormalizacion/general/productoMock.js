
const ContenedorMemoria = require("./contenedorMemoria.js")
const faker = require('faker')
faker.locale = 'es'

// Definicion de clase ProductoMock
class ProductoMock extends ContenedorMemoria {

    constructor(){
        super()
    }

    generarProducto(){
        return {
            nombre: faker.name.findName(),
            precio: faker.commerce, 
            foto: faker.image.avatar()
        }
    }

    crearListaProductos(cantidad = 5){
        for (let i = 0; i <= cantidad; i++) {
            const nuevoProducto = this.generarProducto()
        }
    }

}

