import Container from "./UI/Container.tsx";
import {
  Timer as TimerProps,
  useTimerContext,
} from "../store/timer-context.tsx";
import { useEffect, useRef, useState } from "react";

const Timer = ({ name, duration }: TimerProps) => {
  const interval = useRef<number | null>(null);
  const [remainingState, setRemainingState] = useState(duration * 1000);
  const { isRunning } = useTimerContext();

  if (remainingState <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timerInterval: number;
    if (isRunning) {
      timerInterval = setInterval(() => {
        setRemainingState((prevTime) => prevTime - 50);
      }, 50);

      interval.current = timerInterval;
    } else if (interval.current) {
      clearInterval(interval.current);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning]);

  const formatedReminingState = (remainingState / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingState} />
      </p>
      <p>{formatedReminingState}</p>
    </Container>
  );
};

export default Timer;
