import mongoose from "mongoose"

const usuarioCollection = "usuario"

const usuarioSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    username: { type: String, required: true },
    password: { type: String, required: true },
})

export const usuario = mongoose.model(usuarioCollection, usuarioSchema)