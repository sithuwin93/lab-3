export function add(fn,addend) {
  return (props) => fn(props) + addend;
}

export function subtract(fn,subtrahend) {
  return (props) => fn(props) - subtrahend;
}

export function multiply(fn,factor) {
  return (props) => fn(props) * factor;
}

export function divide(fn,divisor) {
  return (props) => fn(props) / divisor;
}
