import { ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimerState = {
  isRunning: true,
  timers: [],
};

type TimerContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  startTimer: () => void;
  stopTimer: () => void;
};

type StopTimersAction = {
  type: "STOP_TIMERS";
};

type StartTimersAction = {
  type: "START_TIMERS";
};

type AddTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = AddTimersAction | StartTimersAction | StopTimersAction;
export const TimerContext = createContext<TimerContextValue | null>(null);

export function useTimerContext() {
  const timerCtx = useContext(TimerContext);

  if (timerCtx === null) {
    throw new Error("Timer Context is - null that should not be the case!");
  }
  return timerCtx;
}

type TimerContextProviderProps = {
  children: ReactNode;
};

const timersReducer = (state: TimerState, action: Action): TimerState => {
  if (action.type === "START_TIMERS") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMERS") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }

  return state;
};

const TimerContextProvider = ({ children }: TimerContextProviderProps) => {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimerContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };
  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
};

export default TimerContextProvider;
