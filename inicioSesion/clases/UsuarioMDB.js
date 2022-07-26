//imports
import mongoose from 'mongoose'
import * as usuario from "../models/usuario.js"
import connectionStringMDb from "../connectionStrings/mongoDbConnection.json" assert {type: "json"}
import bcrypt from 'bcrypt'

// Definicion de clase Contenedor
export default class UsuarioMongoDB {
    constructor() {
        this.id = 0
    }

    async connectMongoose() {
        const conexion = await mongoose.connect(connectionStringMDb.connectionString)
        console.log(`Conectado a la base de datos`)
    }

    async getAll() {
        return await usuario.usuario.find({})
    }

    async save(object){
        const user = await this.getByUsername(object.username)
        if (user == null) {
            object.password = await this.encryptPassword(object.password)
            const usrModel = await usuario.usuario(object)
            const savedUsr = await usrModel.save()

            return savedUsr._id.toString()
        }
        else{
            throw new Error('User already exists')
        }       
    }

    async getByUsername(usrnm) {
        const user = await usuario.usuario.findOne({username: usrnm})
        return user
    }

    async encryptPassword(password) {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }

    async validatePassword(password, hashPass) {
        const pass = await bcrypt.compare(password, hashPass)

        if (!pass) {
            throw new Error('Invalid Password')
        }
        return pass
    }

    async validateUser(username, passEntered) {
        const user = await this.getByUsername(username)
        if(user != null) {
            return await this.validatePassword(passEntered, user.password)
        }
        else {
            throw new Error('Username not found')
        }
    }
}