class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
    }
    countMascotas() {
        return this.mascotas.length
    }

    addBook(nombre, autor) {
        this.libros.push({"Nombre": nombre, "Autor": autor})
    }

    getBookNames() {
        return this.libros.map(libro => libro.Nombre)
    }
}

// Definicion de objeto y pruebas
let usuario1 = new Usuario('Florencia', 'Russo', [{Nombre: "El Señor de los Anillos", Autor: "JRR Tolkien"}, {Nombre: "El Conde de Montrecristo", Autor: "Alejandro Dumas"}], ["Cata", "Stevie"] )

console.log(usuario1.getFullName())
usuario1.addMascota("Numa")
console.log(usuario1.countMascotas())
usuario1.addBook("Crimen y Castigo", "F. Dostoievski")
console.log(usuario1.getBookNames())
