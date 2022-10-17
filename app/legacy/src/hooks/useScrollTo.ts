import {useCallback} from 'react';

export function useScrollTo(threshold = 0) {
  const scroll = useCallback(
    (elementId: string) => {
      const offsetTop = document.getElementById(elementId)?.offsetTop;
      if (window !== undefined) {
        window.scrollTo({
          top: (offsetTop as number) - threshold,
          behavior: 'smooth',
        });
      }
    },
    [threshold],
  );

  return scroll;
}
