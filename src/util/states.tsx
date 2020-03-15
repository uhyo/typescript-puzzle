import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type StateUpdater<State> = (state: State) => State;
type SetStateFunction<State> = (updater: StateUpdater<State>) => void;

interface GenerateStateManagementToolsOptions<State, I, Actions> {
  getInitialState: (option: I) => State;
  getActions: (setState: SetStateFunction<State>, option: I) => Actions;
}

type ManagedState<State> = [State, FC];
type UseManagedState<State, I> = undefined extends I
  ? (options?: I) => ManagedState<State>
  : (options: I) => ManagedState<State>;

interface StateManagementTools<State, I, Actions> {
  useManagedState: UseManagedState<State, I>;
  useActions: () => Actions;
}

/**
 * Generate hooks for state management.
 */
export function generateStateManagenentTools<State, I, Actions>({
  getInitialState,
  getActions,
}: GenerateStateManagementToolsOptions<
  State,
  I,
  Actions
>): StateManagementTools<State, I, Actions> {
  type ContextValue = {
    setState: SetStateFunction<State>;
    actions: Actions;
  };
  const Context = createContext<ContextValue>({
    setState() {},
    actions: (undefined as unknown) as Actions,
  });

  const useManagedState = ((initArg: I) => {
    const [state, setState] = useState<State>(() => getInitialState(initArg));
    const contextValue = useMemo<ContextValue>(() => {
      const actions = getActions(setState, initArg);
      return {
        setState,
        actions,
      };
    }, []);

    const Provider = useCallback<FC>(
      ({ children }) => (
        <Context.Provider value={contextValue}>{children}</Context.Provider>
      ),
      [setState],
    );

    return [state, Provider];
  }) as UseManagedState<State, I>;

  const useActions = () => {
    const { actions } = useContext(Context);
    return actions;
  };

  return {
    useManagedState,
    useActions,
  };
}
