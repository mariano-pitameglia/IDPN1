/** @format */

import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import Paint from "../components/Paint";

export default function Playground() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(randomColor());
  }, [count]);

  return (
    <div>
      <div style={{ borderTop: `10px solid ${color}` }}>
        {count}
        <button onClick={() => setCount((currentCount) => currentCount - 1)}>
          -
        </button>
        <button onClick={() => setCount((currentCount) => currentCount + 1)}>
          +
        </button>
      </div>
      <Paint />
    </div>
  );
}
