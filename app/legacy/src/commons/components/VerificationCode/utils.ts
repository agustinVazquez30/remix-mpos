import {createRef} from 'react';

export const inputRefs: React.RefObject<HTMLInputElement>[] = [];

export const getInputRef = (
  index: number,
): React.RefObject<HTMLInputElement> => {
  const inputRef = inputRefs[index];

  if (inputRef) {
    return inputRef;
  } else {
    inputRefs[index] = createRef<HTMLInputElement>();
    return inputRefs[index];
  }
};

export const moveCursorToEnd = (el: React.RefObject<HTMLInputElement>) => {
  const tempValue = el.current?.value || '';

  if (el.current) {
    el.current.value = '';
    el.current.focus();

    setTimeout(() => {
      if (el.current) el.current.value = tempValue;
    }, 0.2);
  }
};
