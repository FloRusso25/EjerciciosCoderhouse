import mongoose from "mongoose"

const productoCollection = "producto"

const productoSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    fotoUrl: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    id: {type: Number, required: true},
})

export const producto = mongoose.model(productoCollection, productoSchema)