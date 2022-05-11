//import clase contenedor
const Contenedor = require("./contenedor.js")
const productos = new Contenedor('productos') 

//Carga de tres productos en memoria
productos.save({title: "escuadra", price: 5.65, thumbnail: "www.escuadra.com"})
productos.save({title: "tijera", price: 3, thumbnail: "www.tijera.com"})
productos.save({title: "regla", price: 2.5, thumbnail: "www.regla.com"})

//import express y definiciones
const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const router = new Router()

const PORT = 8080

const errorObject = {error: 'Producto no encontrado'}


//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

router.get('/', (req, res) => {
    console.log("GET todos los productos")
    res.json(productos.getAll())
})

router.get('/:id', (req, res) => {
    console.log(`GET un producto por id ${req.params.id}`)

    const  { id }  =  req.params.id 

    let producto = productos.getById(Number(id))
    
    res.json( (producto != null ? producto : errorObject))
})

router.post('/', (req, res) => { 
    console.log(`POST producto ${req.body}`)

    newProductId = productos.save(req.body)
    res.json(productos.getById(newProductId))
})

router.put('/:id', (req, res) => {
    console.log(`PUT del producto ${req.body} con id ${req.params.id}`)
    let productoActualizado = productos.updateById(req.body, Number(req.params.id))

    productoActualizado != null ? res.json(productoActualizado) : res.json(errorObject)
})

router.delete('/:id', (req, res) => {
    console.log(`DELETE producto con id ${req.params.id}`)
    
    res.json(productos.deleteById(Number(req.params.id)))
})

app.use('/api/productos', router)