const socket = io.connect("http://localhost:8080", { forceNew: true })

function setCurrentDate() {
    let d = new Date()
    let date = d.getDate()
    let month = d.getMonth()
    let year = d.getFullYear()
    let hour = d.getHours()
    let minutes = d.getMinutes()
    let seconds = d.getSeconds()

    return(`${date}/${month}/${year} ${hour}:${minutes}:${seconds}`)
}

function addMessage(e) {
    const message = {
        author: document.getElementById("email").value,
        message: document.getElementById("mensaje").value,
    }

    socket.emit("new-message", message)
    return false
}

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
        <strong>${elem.author}</strong>
        <em>${elem.message}</em>
        </div>`)
    }).join(" ")

    document.getElementById("messages").innerHTML = html
}

socket.on("messages", function(data) {render(data)})