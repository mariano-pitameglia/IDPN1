/** @format */

import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "./useWindowSize";

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const ctx = useRef();

  useEffect(() => {
    // Set up the 2D rendering context for the canvas
    ctx.current = canvasRef.current.getContext("2d");
  }, []);

  // useWindowSize is a custom hook that updates when the window is resized
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  // Function to handle mouse movement over the canvas
  function handleMouseMove(e) {
    // Get the actual coordinates relative to the canvas
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop,
    ];

    // If drawing, continue the line and stroke the canvas
    if (drawing) {
      ctx.current.lineTo(...coords);
      ctx.current.stroke();
    }

    // If there's a custom handleMouseMove prop, call it with the coordinates
    if (props.handleMouseMove) {
      props.handleMouseMove(...coords);
    }
  }

  // Function to start drawing when the mouse is pressed down
  function startDrawing(e) {
    ctx.current.lineJoin = "round";
    ctx.current.lineCap = "round";
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = props.color;
    ctx.current.beginPath();
    // Set the starting point for the drawing
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    );
    setDrawing(true); // Start drawing
  }

  // Function to stop drawing when the mouse is released
  function stopDrawing() {
    ctx.current.closePath(); // Close the current path
    setDrawing(false); // Stop drawing
  }

  return (
    <canvas
      ref={canvasRef}
      width={props.width || width} // Set canvas width
      height={props.height || height} // Set canvas height
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      onMouseMove={handleMouseMove}
    />
  );
}
