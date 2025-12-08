import React, { useState } from "react";
import { decrementfn, incrementfn } from "./helper";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  //   const handleIncrement = () => {
  //     incrementfn(count, setCount);
  //   };
  //   const handleDecrement = () => {
  //     decrementfn(count, setCount);
  //   };

  return (
    <div>
      <p className="counter-title">Counter Page</p>
      <p className="counter-value">Count: {count}</p>

      <button
        onClick={() => incrementfn(count, setCount)}
        disabled={count >= 10}
      >
        Increment
      </button>
      <button
        onClick={() => decrementfn(count, setCount)}
        disabled={count <= 0}
      >
        Decrement
      </button>
      {/* Inline Styling */}
      {count === 5 && <p style={{ color: "blue", fontSize: "24px" }} >Count is Five!</p>}
    </div>
  );
};

export default Counter;
