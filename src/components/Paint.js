/** @format */
import React, { useState, useEffect, useCallback, useRef } from "react";
import Name from "../components/Name";
import useWindowSize from "../components/useWindowSize";
import Canvas from "../components/Canvas";
import randomColor from "randomcolor";

export default function Paint(props) {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState("");

  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);
  useEffect(getColors, []);

  const [visible, setVisible] = useState(false);
  let timeoutId = useRef();
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setVisible(false), 500);
  });

  return (
    <div className="app">
      <header style={{ borderTop: `10px solid ${activeColor}` }}>
        <div>
          <Name></Name>
        </div>
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
      </header>
      {activeColor && (
        <Canvas color={activeColor} height={window.innerHeight} />
      )}
      <div className={`window-size ${visible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div>
    </div>
  );
}
