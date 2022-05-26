//import clase contenedor

const Producto = require("./producto.js")
const Carrito = require("./carrito.js")
const productos = new Producto('productos') 
const carrito = new Carrito('carrito') 

//import express y definiciones
const express = require('express')
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080

const routerProductos = new Router()
const routerCarrito = new Router()

const errorProducto = {error: 'Producto no encontrado'}
const errorCarrito = {error: 'Carrito no encontrado'}

//instancia de servidor y uso de funciones con express
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//llamadas producto
routerProductos.get('/', async (req, res) => {
    console.log(`GET all`)
    res.json( await productos.getAll())
    
})

routerProductos.get('/:id', async (req, res) => {
    console.log(`GET un producto por id ${req.params.id}`)

    const  id  =  req.params.id 


    console.log(`GET id ${id}`)
    let producto = await productos.getById(Number(id))

    res.json( (producto != null ? producto : errorProducto))
    
})

routerProductos.post('/', async (req, res) => {

    const  user  =  req.query.user

    if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
        console.log(`POST producto ${req.body}`)

        newProductId = await productos.save(req.body)
        res.json(await productos.getById(newProductId))

    }
    else {
        res.json({error: -1, descripcion: 'ruta / metodo POST no autorizado para usuarios no admins'})
    }

})

routerProductos.put('/:id', async (req, res) => {
    const  user  =  req.query.user
    const id = req.params.id
    const body = req.body 

    if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
        console.log(`PUT del producto ${body} con id ${id}`)
        
        let productoActualizado = await productos.updateById(body, Number(id))

        console.log(`PUT prod actual: ${productoActualizado}`)
    
        productoActualizado != null ? res.json(productoActualizado) : res.json(errorProducto)

    }
    else {
        res.json({error: -1, descripcion: 'ruta / metodo PUT no autorizado para usuarios no admins'})
    }
})

routerProductos.delete('/:id', (req, res) => {
    const  user  =  req.query.user
    const id = req.params.id

    if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
        console.log(`DELETE del id ${id}`)

        res.json(productos.deleteById(Number(req.params.id)))

    }
    else {
        res.json({error: -1, descripcion: 'ruta / metodo DELETE no autorizado para usuarios no admins'})
    }
})

//llamadas carrito
routerCarrito.get('/:id/productos', async (req, res) => {
    const  id  =  req.params.id 
    console.log(`GET productos del carrito ${id}`)

    let productosCarrito = await carrito.getById(Number(id))
    
    res.json( (productosCarrito != null ? productosCarrito.productos : errorCarrito))
})

routerCarrito.post('/', async (req, res) => {
    
    console.log(`POST carrito ${req.body}`)

    newCarritoId = await carrito.save(req.body)
    res.json(await carrito.getById(newCarritoId))

})

routerCarrito.post('/:id/productos', async (req, res) => {
    const idCarrito = req.params.id
    const productosCarrito = req.body.productos
    let listaProductos = []

    console.log(`POST productos en carrito ${idCarrito}`)

    let carritoId = await carrito.getById(Number(idCarrito))

    if (carritoId != null) {
        for (let producto in productosCarrito) {
            producto = await productos.getById(Number(producto))
            if (producto != null) {
                listaProductos.push(producto)
            }
        }
        res.json(await carrito.updateById({productos: listaProductos}, idCarrito))
    }
    else {
        res.json(errorCarrito)
    }    
})

routerCarrito.delete('/:id', (req, res) => {
    const id = req.params.id

    console.log(`DELETE carrito ${id}`)

    res.json(carrito.deleteById(Number(id)))
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

    const idCarrito = req.params.id
    const idProducto = req.params.id_prod

    console.log(`DELETE producto ${idProducto} en carrito ${idCarrito}`)

    let carritoId = await carrito.getById(Number(idCarrito))
    
    if (carritoId != null) {
        let productosCarrito = carritoId.productos
        if (productosCarrito != []) {
            let producto = await productos.getById(Number(idProducto))
            if (producto != null) {
                productosCarrito = productosCarrito.filter(prod => prod.id != idProducto)
            }
        }

        console.log (`productosCarrito: ${productosCarrito}`)

        res.json(await carrito.updateById({productos: productosCarrito}, idCarrito))
    }
    else {
        res.json(errorCarrito)
    }    
    
})

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)