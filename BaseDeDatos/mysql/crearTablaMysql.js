const { mysqlconntection } = require('./mysql.js')
const knex = require('knex')(mysqlconntection)

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('nombre')
    table.float('precio')
    table.string('urlFoto')
})
    .then(() => (concole.log("Tabla productos creada")))
    .catch((error) => { console.log(`ERROR: ${error}`); throw(error)})
    .finally(() => {
        knex.destroy()
    })