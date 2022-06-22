const { mysqlconnection } = require('../mysql/mysql.js')
const knex = require('knex')(mysqlconnection)

class Tabla {
    constructor() {  
    }

    async crearTabla(nombreTabla, body) {
        await knex.schema.dropTableIfExists('productos')
            
        await knex.schema.createTable('productos', table => {
            table.increments('id')
            table.string('nombre')
            table.float('precio')
            table.string('urlFoto')
        })
            .then(() => (console.log(`Tabla ${'productos'} creada`)))
            .catch((error) => { console.log(`ERROR: ${error}`); throw(error)})
            // .finally(() => {
            //     knex.destroy()
            // })

    }

    async insertararticulo(){
        return await knex('productos').insert({nombre: "escuadra", precio: 5.65, urlFoto: "www.escuadra.com"})
    }

}

module.exports = Tabla



// knex(connection).schema.createTable('productos', table => {
//     table.increments('id')
//     table.string('nombre')
//     table.float('precio')
//     table.string('urlFoto')
// })
//     .then(() => (concole.log("Tabla productos creada")))
//     .catch((error) => { console.log(`ERROR: ${error}`); throw(error)})
//     .finally(() => {
//         knex.destroy()
//     })

