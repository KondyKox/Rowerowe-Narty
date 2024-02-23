import { useEffect, useRef, useState } from "react";

const GameCanvas = ({ gameOver }) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    const resizeCanvas = () => {
      setCanvasWidth(window.innerWidth);
      setCanvasHeight(window.innerHeight);
    };

    window.addEventListener("resize", resizeCanvas);
  });

  return (
    <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>
  );
};

export default GameCanvas;
