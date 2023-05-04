/**
 * This file create a hook `useAppContext`, used to share states globally.
 */
import { Dispatch, Reducer, ReducerAction, createContext, useContext } from "react";

/** Global variable states are defined here */
export const globalState = {
  authInfo: {
    authed: true,
    account: "cauchy@gmail.com",
  },
  bookPage: 1
};

export const AppContext = createContext<AppLabContextType | undefined>(undefined);

/** The reducer provided a tricky way to set global states */
export const globalReducer: Reducer<GlobalState, ActionType> = (state, action) => {
  for (const [target, fn] of Object.entries(action)) {
    state[target as keyof GlobalState] = fn(state[target as keyof GlobalState] as never) as never;
  }
  return state;
}

/** Remember to use this hook in the App component */
export default function useAppContext() {
  const res = useContext(AppContext);
  if (res === undefined) {
    throw "Unexpected error occurs!";
  }
  return res;
}

type GlobalState = typeof globalState;

type ActionType = {
  [T in keyof GlobalState]?: (state: GlobalState[T]) => GlobalState[T];
}

type AppLabContextType = [GlobalState, Dispatch<ReducerAction<typeof globalReducer>>];

