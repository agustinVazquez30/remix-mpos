import {Listener, createBrowserHistory} from 'history';
import {useLayoutEffect} from 'react';

export type useBackListenerProps = (data: {
  location: string;
  action: string;
}) => void;

export const useBackListener = (onAction: useBackListenerProps) => {
  const history = createBrowserHistory();

  useLayoutEffect(() => {
    const listener: Listener = ({location: {pathname}, action}) => {
      if (action === 'POP') {
        onAction({location: pathname, action});
      }
    };

    return history.listen(listener);
  }, [onAction, history]);
};
