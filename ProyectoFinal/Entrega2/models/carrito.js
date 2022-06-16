import mongoose from "mongoose"

const carritoCollection = "carrito"

const CarritoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: {}, required: true },
    id: {type: Number, required: true},
})

export const carrito = mongoose.model(carritoCollection, CarritoSchema)