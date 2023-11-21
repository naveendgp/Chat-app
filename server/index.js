const express = require('express')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')

const app = express()

app.use(express.json())
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        method:["GET","POST"]
    },
    })

io.on('connection', (socket) => { 
    
    socket.on("join_room",(data) =>{
        socket.join(data)
        console.log(`${socket.id} joined ${data}`)
    })

    socket.on("send_msg",(message) => {
        socket.to(message.room).emit("recieve_msg",message)
    })
    console.log(socket.id) 
})


server.listen(3000,() => console.log("SERVER STARTED"))
