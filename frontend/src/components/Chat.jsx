import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
import { useEffect, useRef } from 'react'

export default function Chat({ room }) {
    const messagesRef = useRef(null)
    const formRef = useRef(null)
    const inputRef = useRef(null)
    const socketRef = useRef(null)

    const getUsername = () => {
        const username = localStorage.getItem('username')
        console.log(`User existed ${username}`)
        return username
    }

    const handleMessage = (msg, username) => {
        const messages = messagesRef.current
        const item = document.createElement('li')
        item.innerHTML = `<p>${msg}</p><small>${username}</small>`
        messages.appendChild(item)
        socket.auth.serverOffset = serverOffset
        messages.scrollTop = messages.scrollHeight
    }

    useEffect(() => {
        // Limpiar mensajes al cambiar de sala
        if (messagesRef.current) {
            messagesRef.current.innerHTML = ''
        }

        // Se conecta al servidor de WebSocket
        socketRef.current = io('http://localhost:3000', {
            auth: {
                username: getUsername(),
                room,
                serverOffset: 0
            }
        })

        const socket = socketRef.current
        const form = formRef.current
        const input = inputRef.current

        // Escuchar mensajes entrantes
        socket.on('chat message', handleMessage)

        // Manejar envío de formulario
        const handleSubmit = (e) => {
            e.preventDefault()
            if (input.value.trim()) {
                socket.emit('chat message', input.value.trim())
                input.value = ''
            }
        }
        form.addEventListener('submit', handleSubmit)

        return () => {
            form.removeEventListener('submit', handleSubmit)

            socket.off('chat message', handleMessage)

            socket.disconnect()
        }
    }, [room])

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{room == "dsw" ? "Grupo DSW" : "Grupo DSI"}</h1>
            <section id="chat">
                <ul id="messages" ref={messagesRef}></ul>
                <form id="form" ref={formRef}>
                    <input
                        type="text"
                        name="message"
                        id="input"
                        placeholder="Escriba un mensaje"
                        autoComplete="off"
                        ref={inputRef}
                    />
                    <button type="submit">Enviar</button>
                </form>
            </section>
        </>
    )
}