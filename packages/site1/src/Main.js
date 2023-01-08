import { useState } from "react";
import "./style.scss";
const Main = () => {
  const [timer, setTimer] = useState(new Date());
  return (
    <>
      <h1>Hello From Site 1</h1>
      <button
        onClick={() => {
          setInterval(() => setTimer(new Date()), 10);
        }}
      >
        Start Timer
      </button>
      <p>{timer.toString()}</p>
    </>
  );
};

export default Main;
