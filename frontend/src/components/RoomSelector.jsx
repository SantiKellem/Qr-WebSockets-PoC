import { useState } from "react";
import Chat from "./Chat";

const btnStyle = {
    backgroundColor: '#c2071aff', 
    color: 'white',             
    padding: '10px 20px',       
    border: 'none',            
    borderRadius: '8px',     
    cursor: 'pointer',          
    fontSize: '16px',           
};

export default function RoomSelector() {
    const [room, setRoom] = useState(null)

    return (
        <>
            <section style={
                {
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }>
                <button onClick={() => setRoom("dsw")} style={btnStyle}>Grupo DSW</button>
                <button onClick={() => setRoom("dsi")} style={btnStyle}>Grupo DSI</button>
            </section>
            {room && <Chat room={room} />}
        </>
    )
}