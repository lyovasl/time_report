import Container from "./UI/Container.tsx";
import { Timer as TimerProps } from "../store/timer-context.tsx";

const Timer = ({ name, duration }: TimerProps) => {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
};

export default Timer;
