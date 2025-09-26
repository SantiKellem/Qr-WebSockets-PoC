import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
import { useEffect, useRef } from 'react'

export default function Chat({ room }) {
    const messagesRef = useRef(null)
    const formRef = useRef(null)
    const inputRef = useRef(null)
    const socketRef = useRef(null)

    // Recupera el nombre de usuario guardado en localStorage en el componente <Name />
    const getUsername = () => {
        const username = localStorage.getItem('username')
        console.log(`User existed ${username}`)
        return username
    }

    // Se ejecuta al escuchar un evento 'chat message' y crea 
    // un nuevo <li> para mostrar el nuevo mensaje en el chat
    const handleMessage = (msg, username) => {
        const messages = messagesRef.current
        const item = document.createElement('li')
        item.innerHTML = `<p>${msg}</p><small>${username}</small>`
        messages.appendChild(item)
        socket.auth.serverOffset = serverOffset
    }

    useEffect(() => {
        // Limpia mensajes del chat al cambiar de sala
        if (messagesRef.current) {
            messagesRef.current.innerHTML = ''
        }

        // Se conecta al servidor websocket de la url indicada
        socketRef.current = io(`${import.meta.env.VITE_BACKEND_URL}`, {
            // auth --> Permite añadir información al socket para enviar al backend e implementar autenticación
            auth: {
                username: getUsername(),
                room,
                serverOffset: 0
            }
        })

        const socket = socketRef.current
        const form = formRef.current
        const input = inputRef.current

        // Se suscribe al socket al evento 'chat message' para recibir mensajes 
        socket.on('chat message', handleMessage)

        // Manejar envío de formulario
        const handleSubmit = (e) => {
            e.preventDefault()
            if (input.value.trim()) {
                // Se emite el evento 'chat message' --> se envía el mensaje al servidor
                socket.emit('chat message', input.value.trim())
                input.value = ''
            }
        }

        form.addEventListener('submit', handleSubmit)

        return () => {
            form.removeEventListener('submit', handleSubmit)

            // Se desuscribe al socket del evento 'chat message', parte del cleanup del useEffect
            socket.off('chat message', handleMessage)

            // Se finaliza la conección cliente <--> servidor al desconectar al socket
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