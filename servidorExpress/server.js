//import clase contenedor
const Contenedor = require("./contenedor.js")
const productos = new Contenedor('productos') 

//import express y definiciones
const express = require('express')
const app = express()

const PORT = 8080

//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send('Productos')
})

app.get('/productos', async (req, res) => {
    res.send(await productos.getAll())
})

app.get('/productosRandom', async (req, res) => {
    let id = await productos.setId()
    id = Math.floor(Math.random() * (id - 1)) + 1
    
    res.send(await productos.getById(id))
})