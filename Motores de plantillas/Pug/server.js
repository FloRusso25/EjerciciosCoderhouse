//import clase contenedor
const Contenedor = require("./contenedor.js")
const productos = new Contenedor('productos') 

//Carga de tres productos en memoria
// productos.save({title: "escuadra", price: 5.65, thumbnail: "www.escuadra.com"})
// productos.save({title: "tijera", price: 3, thumbnail: "www.tijera.com"})
// productos.save({title: "regla", price: 2.5, thumbnail: "www.regla.com"})

//import express y definiciones
const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


const router = new Router()

const PORT = 8080

//handlebars
app.set('views', './views')
app.set('view engine', 'pug')



//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//llamadas
app.get('/', (req, res) => {
    res.render('main.pug', {} )
})
app.get('/productos', (req, res) => {
    const data = productos.getAll()
    console.log("GET todos los productos")
    console.log(data)
    res.render('get.pug', { getData: data })
})

app.post('/productos', (req, res) => { 
    console.log(`POST producto ${req.body}`)

    let newProductId = productos.save(req.body)
    const data = productos.getById(newProductId)
    res.render('post.pug', {layout: 'index', postData: data, getStatus: false, postStatus: true, mainStatus : true})
})


