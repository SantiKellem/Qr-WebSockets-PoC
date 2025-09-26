import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const btnStyle = {
  backgroundColor: '#c2071aff', 
  color: 'white',             
  padding: '10px 20px',       
  border: 'none',            
  borderRadius: '8px',     
  cursor: 'pointer',          
  fontSize: '16px',           
};

export default function MesaQR() {
  const [qrValue, setQrValue] = useState("");

  const generarQR = () => {
    // Se setea el QR con la url a la que queremos redirigir
    setQrValue("https://frontend-production-efe2.up.railway.app/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "75px", justifyContent: "center", padding: "100px", backgroundColor: "white" }}>
      <button
        onClick={() => generarQR()}
        style={btnStyle}
      >
        Generar QR
      </button>

      {qrValue && (
        // Puede usarse el componente <QRCodeCanvas /> para renderizarlo en un canvas en lugar de un SVG
        <QRCodeSVG
          value={qrValue}
          size={360}
          level="H"     // alta tolerancia a errores, puede ser (L, M, Q, H)
        />
      )}
    </div>
  );
}
