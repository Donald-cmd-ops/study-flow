import React, { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Canvas = () => {
  const canvasRef = useRef(null);

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
      <h2>Sketch Canvas</h2>
      <ReactSketchCanvas 
        ref={canvasRef}
        strokeWidth={4} 
        strokeColor="black"
        width="100%"
        height="80%"
      />
      <button onClick={handleExportImage}>Export as PNG</button>
    </div>
  );
};

export default Canvas;
