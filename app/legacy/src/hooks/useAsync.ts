import {useCallback, useReducer, useRef} from 'react';

interface State<T = any> {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  data: T;
  error: Error | null;
}

interface Options<T> {
  onError?: (error: Error) => void;
  onSuccess?: (data: T) => void;
}

const defaultInitialState: State = {
  status: 'idle',
  data: null,
  error: null,
};

export function useAsync<T = any>(initialState: T, opts: Options<T> = {}) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{status, data, error}, setState] = useReducer(
    (s: State<T>, a: Partial<State<T>>) => ({...s, ...a}),
    initialStateRef.current,
  );

  const setData = useCallback(
    (data: T) => setState({data, status: 'resolved'}),
    [setState],
  );
  const setError = useCallback(
    (error: Error) => setState({error, status: 'rejected'}),
    [setState],
  );
  const reset = useCallback(
    () => setState(initialStateRef.current),
    [setState],
  );

  const run = useCallback(
    (promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(`The argument passed must be a promise.`);
      }
      setState({status: 'pending'});
      return promise.then(
        (data: T) => {
          setData(data);
          opts.onSuccess?.(data);
          return data;
        },
        (error: Error) => {
          setError(error);
          opts.onError?.(error);
        },
      );
    },
    [setState, setData, setError, opts],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
