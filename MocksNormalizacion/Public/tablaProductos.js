const socket = io.connect("http://localhost:8080", { forceNew: true })

function addProduct(e) {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        foto: document.getElementById("foto").value,
    }

    socket.emit("new-product", producto)
    return false
}

function render(dataProducto) {
    const html = dataProducto.map((item, index) => {
        return(`<tr>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td>${item.foto}</td>
        </tr>`)
    }).join(" ")

    document.getElementById("listaProductos").innerHTML = html
}

socket.on("listaProductos", function(dataProducto) {render(dataProducto)})