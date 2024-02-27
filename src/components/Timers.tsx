import { useTimerContext } from "../store/timer-context";
import Timer from "./Timer";

const Timers = () => {
  const { timers } = useTimerContext();
  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.name}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
};

export default Timers;
