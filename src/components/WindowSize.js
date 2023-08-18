import React, { useState, useEffect } from "react";

export default function WindowSize() {
  const [[windowWidth, windowHeight], setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [visible, setVisible] = useState(false);
  let timeoutId;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      setVisible(true);
      clearTimeout(timeoutId); // Clear the previous timeout
      timeoutId = setTimeout(() => setVisible(false), 500); // Set a new timeout
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId); // Clear the timeout on component unmount
    };
  }, []); // Dependency array is empty to ensure the effect runs only once

  return (
    <div className={`window-size ${visible ? "" : "hidden"}`}>
      {windowWidth} x {windowHeight}
    </div>
  );
}
