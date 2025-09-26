import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()

// Se crea el servidor para soportar websockets
// connectionStateRecovery --> permite recuperar los eventos transmitidos durante una desconección 
const server = createServer(app)
const io = new Server(server, {
    cors: { origin: '*' },
    connectionStateRecovery: 1000 * 60 * 30
})

// Se suscribe al server al evento 'connection'
io.on('connection', (socket) => {
    const room = socket.handshake.auth.room

    // Se une al socket (user conectado) a una room particular
    socket.join(room)
    console.log(`Un usuario se conectó a la room "${room}"!`)

    // Se suscribe al socket al evento 'disconnect'
    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    // Se suscribe al socket al evento 'chat message'
    socket.on('chat message', (msg) => {
        const username = socket.handshake.auth.username ?? 'anonymous'
        console.log({ username })

        // Se emite el mensaje recibido al resto de sockets conectados, restringiendo por room
        io.to(room).emit('chat message', msg, username)
    })
})

server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`)
})
