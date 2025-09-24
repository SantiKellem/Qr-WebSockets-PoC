import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: { origin: '*' },
    connectionStateRecovery: 1000 * 60 * 30
})

io.on('connection', (socket) => {
    const room = socket.handshake.auth.room
    socket.join(room)
    console.log(`a user has connected to the room "${room}"!`)

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on('chat message', (msg) => {
        const username = socket.handshake.auth.username ?? 'anonymous'
        console.log({ username })

        io.to(room).emit('chat message', msg, username)
    })
})

app.use(logger('dev'))

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
