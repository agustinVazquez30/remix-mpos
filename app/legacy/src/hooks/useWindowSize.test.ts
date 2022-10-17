import {act} from 'react-dom/test-utils';
import {renderHook} from '@testing-library/react-hooks';
import {useWindowSize} from './useWindowSize';

describe('useWindowSize', () => {
  test('size changes', async () => {
    const {result} = renderHook(() => useWindowSize());

    const FIRST_DEFINED_WIDTH = 500;
    const FIRST_DEFINED_HEIGHT = 1500;

    global.innerWidth = FIRST_DEFINED_WIDTH;
    global.innerHeight = FIRST_DEFINED_HEIGHT;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toStrictEqual(FIRST_DEFINED_WIDTH);
    expect(result.current.height).toStrictEqual(FIRST_DEFINED_HEIGHT);

    const SECOND_DEFINED_WIDTH = 2000;
    const SECOND_DEFINED_HEIGHT = 400;

    global.innerWidth = SECOND_DEFINED_WIDTH;
    global.innerHeight = SECOND_DEFINED_HEIGHT;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toStrictEqual(SECOND_DEFINED_WIDTH);
    expect(result.current.height).toStrictEqual(SECOND_DEFINED_HEIGHT);
  });
});
