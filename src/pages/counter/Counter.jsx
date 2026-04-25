import React, { useState } from "react";
import { decrementfn, incrementfn } from "./helper";
import "./Counter.css";
import Button from "../../components/button/Button";

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

      <Button onClick={() => incrementfn(count, setCount)} disabled={count >= 10}>
        Increment
      </Button>
      <Button onClick={() => decrementfn(count, setCount)} disabled={count <= 0} variant="outlined">
        Decrement
      </Button>
      {/* Inline Styling */}
      {count === 5 && <p style={{ color: "blue", fontSize: "24px" }} >Count is Five!</p>}
    </div>
  );
};

export default Counter;
