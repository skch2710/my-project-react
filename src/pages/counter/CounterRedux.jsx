import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../store/slices/counterSlice';
import Button from "../../components/button/Button";

export default function CounterRedux() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button onClick={() => dispatch(decrement())} variant="outlined">-</Button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button onClick={() => dispatch(incrementByAmount(amount))}>
        Add Amount
      </Button>
    </div>
  );
}
