//import clase contenedor
const Contenedor = require("./contenedor.js")
const productos = new Contenedor('productos') 

//Carga de tres productos en memoria
// productos.save({title: "escuadra", price: 5.65, thumbnail: "www.escuadra.com"})
// productos.save({title: "tijera", price: 3, thumbnail: "www.tijera.com"})
// productos.save({title: "regla", price: 2.5, thumbnail: "www.regla.com"})

//import express y definiciones
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const handlebars = require('express-handlebars')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080

const messages = [
    { author: 'Test', message: 'TEST'}
]

const listaProductos = [ 
    { nombre: 'No', precio: 'hay', foto: "productos"}
]

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./Public'))

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', 'views')
app.set('view engine', 'handlebars')

//instancia de servidor y uso de funciones con express
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${httpServer.address().port}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))


//llamadas
app.get('/', (req, res) => {
    res.render('main', {layout: 'index'} )
})
app.get('/productos', (req, res) => {
    const data = productos.getAll()
    console.log("GET todos los productos")
    console.log(data)
    res.render('main', {layout: 'index'} )
})

app.post('/productos', (req, res) => { 
    console.log(`POST producto ${req.body}`)

    let newProductId = productos.save(req.body)
    const data = productos.getById(newProductId)
    res.render('main', {layout: 'index'})
})

io.on('connection', (socket) => {

    console.log("Nuevo usuario conectado")
    
    socket.emit('messages', messages)
    socket.emit('listaProductos', listaProductos)

    socket.on('new-message', dataMensajes => {
        messages.push(dataMensajes)

        io.sockets.emit('messages', messages)
    })

    socket.on('new-product', dataProducto => {
        listaProductos.push(dataProducto)

        io.sockets.emit('listaProductos', listaProductos)
    })
})
