import { useState } from "react";
import RoomSelector from "./RoomSelector";

const btnStyle = {
    backgroundColor: '#c2071aff', 
    color: 'white',             
    padding: '10px 20px',       
    border: 'none',            
    borderRadius: '8px',     
    cursor: 'pointer',          
    fontSize: '16px',           
};

export default function Name() {
    const [username, setUsername] = useState(localStorage.getItem('username'))
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const data = Object.fromEntries(form.entries())
        setUsername(data.username)
        localStorage.setItem('username', data.username)
    }

    return (
        <>
            {!username && 
                <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <label htmlFor="nombre">Nombre de usuario</label>
                    <input type="text" id="nombre" name="username" placeholder="..."/>
                    <button type="submit" style={btnStyle}>Confirmar</button>
                </form>
            }
            {username && <RoomSelector /> }
        </>
    )
}