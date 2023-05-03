import React, { Dispatch, Reducer, ReducerAction, createContext, useContext } from "react";
React.useReducer

export const AppContext = createContext<AppContextType | undefined>(undefined);


export default function useAppContext() {
  const res = useContext(AppContext);
  if (res === undefined) {
    throw "Unexpected error occurs!";
  }
  return res;
}

export const globalState = {
  showPleaseLogin: false,
  count: 1,
};

type GlobalState = typeof globalState;

type ActionType = {
  [T in keyof GlobalState]?: (state: GlobalState[T]) => GlobalState[T];
}

// global variable reducer
export const globalReducer: Reducer<GlobalState, ActionType> = (state, action) => {
  for (const [target, fn] of Object.entries(action)) {
    state[target as keyof GlobalState] = fn(state[target as keyof GlobalState] as never) as never;
  }
  return state;
}
// React.useReducer

type AppLabContextType = [GlobalState, Dispatch<ReducerAction<typeof globalReducer>>];

export const AppLabContext = createContext<AppLabContextType | undefined>(undefined);
