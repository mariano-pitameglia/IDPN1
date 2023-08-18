/** @format */
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState("");

  const getColors = () => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  };
  return (
    <div>
      {colors.map((color, index) => (
        <button
          key={index}
          onClick={() => setActiveColor(color)}
          style={{
            backgroundColor: color,
            margin: "10px",
            width: "50px",
            height: "50px",
            border: activeColor === color ? "2px solid black" : "none",
          }}
        ></button>
      ))}
      <button onClick={getColors}>Refresh</button>
      <div
        className="color-box"
        style={{
          backgroundColor: activeColor,
          border: activeColor ? "2px solid black" : "none",
          margin: "10px",
          width: "50px",
          height: "50px",
        }}
      ></div>
    </div>
  );
}
