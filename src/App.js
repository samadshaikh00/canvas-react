import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { FaPlus, FaMinus } from "react-icons/fa";
import { SketchPicker } from "react-color";
import './App.css';  

const App = () => {
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(null);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState("white");
  const [imageDimensions, setImageDimensions] = useState({ width: 400, height: 400 }); 
  const canvasRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
          setImage(e.target.result);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportMask = () => {
    const drawingCanvas = canvasRef.current.canvas.drawing;
    const ctx = drawingCanvas.getContext("2d");

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = drawingCanvas.width;
    maskCanvas.height = drawingCanvas.height;
    const maskCtx = maskCanvas.getContext("2d");

    maskCtx.fillStyle = "black";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.globalCompositeOperation = "source-over";
    maskCtx.drawImage(drawingCanvas, 0, 0);

    const maskDataURL = maskCanvas.toDataURL("image/png");
    setMask(maskDataURL);
  };

  const handleClearCanvas = () => {
    canvasRef.current.clear();
  };

  const handleBrushColorChange = (color) => {
    setBrushColor(color.hex);
  };

  return (
    <div className="container">
      <h1 className="header">Image Inpainting Widget</h1>
      <div className="uploadSection">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="fileInput"
        />
      </div>

      {image && (
        <>
          <div className="imageContainer">
            <h3 className="imageTitle">Original Image</h3>
            <img src={image} alt="Uploaded" className="image" />
          </div>

          <div className="canvasContainer">
            <h3 className="imageTitle">Draw Mask</h3>
            <CanvasDraw
              ref={canvasRef}
              imgSrc={image}
              canvasWidth={imageDimensions.width}
              canvasHeight={imageDimensions.height}
              brushColor={brushColor}
              brushRadius={brushSize}
              lazyRadius={0}
            />
          </div>

          <h4 style={{marginTop : "50px"}}>Brush Control</h4>
          <div className="controls">
            <div className="brushControls">
              <button
                className="iconButton"
                onClick={() => setBrushSize(Math.max(1, brushSize - 1))}
              >
                <FaMinus />
              </button>
              <span className="brushSizeText">{brushSize}px</span>
              <button
                className="iconButton"
                onClick={() => setBrushSize(brushSize + 1)}
              >
                <FaPlus />
              </button>
            </div>

            <div className="colorPicker">
              <SketchPicker
                color={brushColor}
                onChangeComplete={handleBrushColorChange}
              />
            </div>
          </div>

          <div className="actionButtons">
            <button onClick={handleExportMask} className="actionButton">
              Export Mask
            </button>
            <button onClick={handleClearCanvas} className="actionButton">
              Clear Canvas
            </button>
          </div>
        </>
      )}

      {mask && (
        <div className="resultContainer">
          <div>
            <h3 className="imageTitle">Original Image</h3>
            <img src={image} alt="Original" className="image" />
          </div>
          <div>
            <h3 className="imageTitle">Generated Mask</h3>
            <img
              src={mask}
              alt="Mask"
              className="image"
              style={{ backgroundColor: "#000" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
