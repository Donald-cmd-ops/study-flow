import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import ColorPicker from 'react-pick-color';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#fff');
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const getBtnName = () => {
    if (openColorPicker) {
        return "Close Color Picker"
    }
    return "Open Color Picker"
  }

  const handleExportImage = async () => {
    if (canvasRef.current) {
      try {
        const dataUrl = await canvasRef.current.exportImage("png"); // Can be "jpeg" or "svg"
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "sketch.png";
        link.click();
      } catch (error) {
        console.error("Export failed", error);
      }
    }
  };

  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <h2>Doddle Wall</h2>
      <button onClick={()=>{
        if (openColorPicker == false) {
            setOpenColorPicker(true);
        }else{
            setOpenColorPicker(false);
        }
      }}>{getBtnName()}</button>
      {openColorPicker && (
        <ColorPicker color={color} onChange={color => setColor(color.hex)} />
      )}
      <ReactSketchCanvas 
        ref={canvasRef}
        strokeWidth={4} 
        strokeColor={color}
        width="100%"
        height="80%"
      />
      <button onClick={handleExportImage}>Export as PNG</button>
    </div>
  );
};

export default Canvas;
