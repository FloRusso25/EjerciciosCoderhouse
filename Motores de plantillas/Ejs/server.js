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

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

const router = new Router()

const PORT = 8080

const errorObject = {error: 'Producto no encontrado'}


//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//llamadas
router.get('/', (req, res) => {
    console.log("GET todos los productos")
    res.json(productos.getAll())
})

router.post('/', (req, res) => { 
    console.log(`POST producto ${req.body}`)

    newProductId = productos.save(req.body)
    res.json(productos.getById(newProductId))
})


app.use('/productos', router)