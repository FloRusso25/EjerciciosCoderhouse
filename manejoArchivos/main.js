//import
const Contenedor = require("./contenedor.js")


// Definicion de objeto y pruebas
async function main(){
    let productos = new Contenedor('productos')    
    let contenido = await productos.getAll()
    console.log(`\nContenido del archivo\n------------------------------\n${JSON.stringify(contenido)}\n------------------------------\n`)

    await productos.save({title: 'Escuadra', price: 123.45, thumbnail: 'https://www.google.com/search?q=escuadra' })

    contenido = await productos.getAll()
    console.log(`\nContenido del archivo\n------------------------------\n${JSON.stringify(contenido)}\n------------------------------\n`)

    await productos.save({title: 'Calculadora', price: 234.56, thumbnail: 'https://www.google.com/search?q=calculadora' })
    await productos.save({title: 'Globo terráqueo', price: 5, thumbnail: 'https://www.google.com/search?q=globo+terraqueo' })

    contenido = await productos.getAll()
    console.log(`\nContenido del archivo\n------------------------------\n${JSON.stringify(contenido)}\n------------------------------\n`)

    let item = await productos.getById(2)
    console.log(`El item con ID 2 es: ${JSON.stringify(item)}`)

    await productos.deleteById(2)

    contenido = await productos.getAll()
    console.log(`\nContenido del archivo\n------------------------------\n${JSON.stringify(contenido)}\n------------------------------\n`)

    await productos.deleteAll()

    contenido = await productos.getAll()
    console.log(`\nContenido del archivo\n------------------------------\n${JSON.stringify(contenido)}\n------------------------------\n`)
}

main()


