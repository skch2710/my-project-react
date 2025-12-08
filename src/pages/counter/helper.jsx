
export const incrementfn = (count, setCount) => {
  if (count < 10) {
    setCount(count + 1);
  }
};

export const decrementfn = (count, setCount) => {
  if (count > 0) {
    setCount(count - 1);
  }
};
