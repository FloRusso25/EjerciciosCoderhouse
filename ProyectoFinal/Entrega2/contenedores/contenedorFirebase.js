//imports

// Definicion de clase Contenedor
export default class ContenedorFB {
    constructor(admin, coleccion) {
        this.admin = admin
        this.coleccion = coleccion
        this.id = 0
    }
    
    async connectFirebase() {
        const db = await this.admin.firestore()
        const query = await db.collection(this.coleccion)

        return query
    }

    async getAll() {
        const query = await this.connectFirebase()
        const querySnapshot = await query.get()

        return await querySnapshot.docs
    }

    async save(object, id=null){
        let ultimoId = await this.getAll()
        const query = await this.connectFirebase()
        console.log(`QUERY: ${query}`)
        let test = ((JSON.stringify(ultimoId) == '[]') ? "def:" : "undef:")
        console.log(`IF defund: ${test}`)
        console.log(`IF length: ${ultimoId.length}`)
        console.log(`IF string: ${JSON.stringify(ultimoId)}`)

        if (id == null) {
            console.log(`ULTID: ${this.id}`)
            console.log(`ULTIlength: ${ultimoId.length}`)
            object.id = ((JSON.stringify(ultimoId) == '[]') ? this.id : Math.max(...ultimoId.map(objeto => objeto.id)))
            console.log(`ULTIMO ID1: ${object.id}`)
            object.id++
            let nuevoObjeto = query.doc(`${object.id}`)
            await nuevoObjeto.create(object)

            console.log(`ULTIMO ID: ${object.id}`)

            return object.id
        }
        else {
            const doc = query.doc(`${id}`)
            const nuevoObjeto = await doc.update(object)

            return nuevoObjeto.data().id
        }
    }

    async getById(id) {
        const query = await this.connectFirebase()
        const doc = query.doc(`${id}`)
        const nuevoObjeto = await doc.get()

        console.log(`CTnuevObjeto: ${JSON.stringify(nuevoObjeto)}`)
        console.log(`CTnuevObjetoDATA: ${JSON.stringify(nuevoObjeto.data())}`)

        return ((nuevoObjeto.data()) ? nuevoObjeto.data(): null )
    }

    async deleteById(id) {
        const query = await this.connectFirebase()
        const doc = query.doc(`${id}`)
        const nuevoObjeto = await doc.delete()
    }
    // async updateById(object, id) {

    //     let producto = await this.getById(id)

    //     if (producto != null) {
    //         let newItemId = await this.save(object, id)

    //         return (await this.getById(newItemId))
    //     }
    //     else {
    //         return null
    //     }
    // }

    async deleteAll() {
        let datos = this.getAll()
        const query = this.connectFirebase()
        datos.forEach(async (dato) => {
            const doc = query.doc(`${dato.id}`)
            await doc.delete()
        })
    }
}
