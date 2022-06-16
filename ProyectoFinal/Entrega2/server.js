//imports MongoDB
import mongoose from "mongoose"
import CarritoMongoDB from "./daos/carrito/carritoMongoDb.js"
import ProductosMongoDB from "./daos/productos/productosMongoDb.js"

const carritoMDB = new CarritoMongoDB('carrito')
const productosMDB = new ProductosMongoDB('producto')


//imports Firebase
import admin from "firebase-admin"
import serviceAccount from "./firebaseConnection.json" assert {type: "json"}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-9953a.firebaseio.com"
})

import CarritoFB from "./daos/carrito/carritoFirebase.js"
import ProductoFB from "./daos/productos/productosFirebase.js"

const carritoFB = new CarritoFB(admin, 'carrito')
const productoFB = new ProductoFB(admin, 'productos')

//imports express y router y definicion constantes
import express from 'express'
const { Router } = express

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080

const routerProductos = new Router()
const routerCarrito = new Router()

const errorProducto = {error: 'Producto no encontrado'}
const errorCarrito = {error: 'Carrito no encontrado'}

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//-------------------------------------------------------------------------------------------------

//llamadas producto con Mongoose

productosMDB.connectMongoose()

routerProductos.get('/', async (req, res) => {
    console.log(`GET all`)
    res.json( await productosMDB.getAll())
    
})

routerProductos.get('/:id', async (req, res) => {
    console.log(`GET un producto por id ${req.params.id}`)

    const  id  =  req.params.id 

    console.log(`GET id ${id}`)
    const producto = await productosMDB.getById(Number(id))

    res.json( (producto != null ? producto : errorProducto))
    
})

routerProductos.post('/', async (req, res) => {

    const  user  =  req.query.user

    if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
        console.log(`POST producto ${JSON.stringify(req.body)}`)

        const newProductId = await productosMDB.save(req.body)
        res.json(await productosMDB.getById(newProductId))

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
        
        let productoActualizado = await productosMDB.save(body, Number(id))

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

        res.json(productosMDB.deleteById(Number(req.params.id)))

    }
    else {
        res.json({error: -1, descripcion: 'ruta / metodo DELETE no autorizado para usuarios no admins'})
    }
})

//llamadas carrito con Mongoose

routerCarrito.get('/:id/productos', async (req, res) => {
    const  id  =  req.params.id 
    console.log(`GET productos del carrito ${id}`)

    let productosCarrito = await carritoMDB.getById(Number(id))
    let listaProductos = []

    console.log(JSON.stringify(productosCarrito))

    if (productosCarrito != null) {
        (productosCarrito[0].productos).forEach(async idProducto => {
            console.log(`PRODTEST: ${JSON.stringify(idProducto)}`)
            console.log(`PRODTEST1: ${JSON.stringify(await productosMDB.getById(idProducto.id))}`)
            listaProductos.push(JSON.stringify(await productosMDB.getById(idProducto.id)))
        })
        console.log(`LISTAPROD: ${listaProductos}  blabla`)
    } 
    
    res.json( (listaProductos != [] ? listaProductos : errorCarrito))
})

routerCarrito.post('/', async (req, res) => {

    const  user  =  req.query.user

    if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
        console.log(`POST carrito ${req.body}`)

        const newCarritoId = await carritoMDB.save(req.body)
        console.log(`IDSERVER: ${newCarritoId}`)
        res.json(await carritoMDB.getById(newCarritoId))
carritoMDB.getById()
    }
    else {
        res.json({error: -1, descripcion: 'ruta / metodo POST no autorizado para usuarios no admins'})
    }
})

routerCarrito.post('/:id/productos', async (req, res) => {
    const idCarrito = req.params.id
    const productosCarrito = req.body.productos
    let listaProductos = []

    console.log(`POST productos en carrito ${idCarrito}`)

    let carritoId = await carritoMDB.getById(Number(idCarrito))

    if (carritoId != null) {
        for (let producto in productosCarrito) {
            producto = await productosMDB.getById(Number(producto))
            if (producto != null) {
                listaProductos.push(producto)
            }
        }
        res.json(await carritoMDB.save({productos: listaProductos}, idCarrito))
    }
    else {
        res.json(errorCarrito)
    }    
})

routerCarrito.delete('/:id', (req, res) => {
    const id = req.params.id

    console.log(`DELETE carrito ${id}`)

    res.json(carritoMDB.deleteById(Number(id)))
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

    const idCarrito = req.params.id
    const idProducto = req.params.id_prod

    console.log(`DELETE producto ${idProducto} en carrito ${idCarrito}`)

    let carritoId = await carritoMDB.getById(Number(idCarrito))
    
    if (carritoId != null) {
        let productosCarrito = carritoId.productos
        if (productosCarrito != []) {
            let producto = await productosMDB.getById(Number(idProducto))
            if (producto != null) {
                productosCarrito = productosCarrito.filter(prod => prod.id != idProducto)
            }
        }

        console.log (`productosCarrito: ${productosCarrito}`)

        res.json(await carritoMDB.save({productos: productosCarrito}, idCarrito))
    }
    else {
        res.json(errorCarrito)
    }    
    
})

//-------------------------------------------------------------------------------------------------

// //llamadas producto con Firebase

// routerProductos.get('/', async (req, res) => {
//     console.log(`GET all`)
//     res.json( await productoFB.getAll())
    
// })

// routerProductos.get('/:id', async (req, res) => {
//     console.log(`GET un producto por id ${req.params.id}`)

//     const  id  =  req.params.id 

//     console.log(`GET id ${id}`)
//     const producto = await productoFB.getById(Number(id))

//     res.json( (producto != null ? producto : errorProducto))
    
// })

// routerProductos.post('/', async (req, res) => {

//     const  user  =  req.query.user

//     if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
//         console.log(`POST producto ${req.body}`)

//         const newProductId = await productoFB.save(req.body)
//         res.json(await productoFB.getById(newProductId))

//     }
//     else {
//         res.json({error: -1, descripcion: 'ruta / metodo POST no autorizado para usuarios no admins'})
//     }

// })

// routerProductos.put('/:id', async (req, res) => {
//     const  user  =  req.query.user
//     const id = req.params.id
//     const body = req.body 

//     if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
//         console.log(`PUT del producto ${body} con id ${id}`)
        
//         let productoActualizado = await productoFB.save(body, Number(id))

//         console.log(`PUT prod actual: ${productoActualizado}`)
    
//         productoActualizado != null ? res.json(productoActualizado) : res.json(errorProducto)

//     }
//     else {
//         res.json({error: -1, descripcion: 'ruta / metodo PUT no autorizado para usuarios no admins'})
//     }
// })

// routerProductos.delete('/:id', (req, res) => {
//     const  user  =  req.query.user
//     const id = req.params.id

//     if ( (user != undefined) && (user.toLowerCase() == 'admin') ) {
//         console.log(`DELETE del id ${id}`)

//         res.json(productos.deleteById(Number(req.params.id)))

//     }
//     else {
//         res.json({error: -1, descripcion: 'ruta / metodo DELETE no autorizado para usuarios no admins'})
//     }
// })

// //llamadas carrito con Firebase

// routerCarrito.get('/:id/productos', async (req, res) => {
//     const  id  =  req.params.id 
//     console.log(`GET productos del carrito ${id}`)

//     let productosCarrito = await carritoFB.getById(Number(id))
//     let listaProductos = []

//     console.log(JSON.stringify(productosCarrito))

//     if (productosCarrito != null) {
//         (productosCarrito.productos).forEach(async idProducto => {
//             console.log(`PRODTEST: ${JSON.stringify(idProducto)}`)
//             console.log(`PRODTEST1: ${JSON.stringify(await productoFB.getById(idProducto))}`)
//             listaProductos.push(JSON.stringify(await productoFB.getById(idProducto)))
//         })
//         console.log(`LISTAPROD: ${listaProductos}  blabla`)
//     } 
    
//     res.json( (listaProductos != [] ? listaProductos : errorCarrito))
// })

// routerCarrito.post('/', async (req, res) => {
    
//     console.log(`POST carrito ${req.body}`)

//     const newCarritoId = await carritoFB.save(req.body)
//     res.json(await carritoFB.getById(newCarritoId))

// })

// routerCarrito.post('/:id/productos', async (req, res) => {
//     const idCarrito = req.params.id
//     const productosCarrito = req.body.productos
//     let listaProductos = []

//     console.log(`POST productos en carrito ${idCarrito}`)

//     let carritoId = await carritoFB.getById(Number(idCarrito))

//     if (carritoId != null) {
//         for (let producto in productosCarrito) {
//             producto = await productoFB.getById(Number(producto))
//             if (producto != null) {
//                 listaProductos.push(producto)
//             }
//         }
//         res.json(await carritoFB.save({productos: listaProductos}, idCarrito))
//     }
//     else {
//         res.json(errorCarrito)
//     }    
// })

// routerCarrito.delete('/:id', (req, res) => {
//     const id = req.params.id

//     console.log(`DELETE carrito ${id}`)

//     res.json(carritoFB.deleteById(Number(id)))
// })

// routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {

//     const idCarrito = req.params.id
//     const idProducto = req.params.id_prod

//     console.log(`DELETE producto ${idProducto} en carrito ${idCarrito}`)

//     let carritoId = await carritoFB.getById(Number(idCarrito))
    
//     if (carritoId != null) {
//         let productosCarrito = carritoId.productos
//         if (productosCarrito != []) {
//             let producto = await productoFB.getById(Number(idProducto))
//             if (producto != null) {
//                 productosCarrito = productosCarrito.filter(prod => prod.id != idProducto)
//             }
//         }

//         console.log (`productosCarrito: ${productosCarrito}`)

//         res.json(await carritoFB.save({productos: productosCarrito}, idCarrito))
//     }
//     else {
//         res.json(errorCarrito)
//     }    
    
// })

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

