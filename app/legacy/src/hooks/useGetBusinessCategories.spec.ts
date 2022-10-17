import * as useQueryHook from './useQuery';
import {renderHook} from '../utils/tests';
import {useGetBusinessCategories} from './useGetBusinessCategories';

describe('useGetBusinessCategories', () => {
  it('should call', () => {
    jest.spyOn(useQueryHook, 'useQuery').mockReturnValue({
      isLoading: false,
      data: {
        categories: ['foo'],
      },
    } as any);

    const {result} = renderHook(() => useGetBusinessCategories());

    expect(result.current).toEqual({
      businessCategories: ['foo'],
      isLoadingBusinessCategories: false,
    });
  });
});
