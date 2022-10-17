import {renderHook} from '@testing-library/react-hooks';
import {useQuery} from './useQuery';
import {waitFor} from '@testing-library/react';

const responseParameters = {
  message: 'Parameters requested successfully',
  data: [
    {
      id: 86,
      key: 'MPOS_ITEM_NAME_CO',
      value: 'MPOS Treinta',
    },
    {
      id: 87,
      key: 'MPOS_ITEM_PRICE_CO',
      value: '50000',
    },
    {
      id: 88,
      key: 'MPOS_ITEM_TAX_VALUE_CO',
      value: '19',
    },
    {
      id: 89,
      key: 'MPOS_ITEM_SHIPPING_COST_CO',
      value: '5000',
    },
  ],
};

describe('useQuery', () => {
  test('should not do http request', () => {
    const {result} = renderHook(() =>
      useQuery({
        api: 'payments-api',
        requestData: {
          url: '/parameters',
          method: 'GET',
        },
      }),
    );

    expect(result.current).toStrictEqual({
      data: null,
      isLoading: false,
      hasError: false,
      refetch: result.current.refetch,
      source: result.current.source,
    });
  });

  test('should do http request', async () => {
    const {result} = await waitFor(() =>
      renderHook(() =>
        useQuery({
          api: 'payments-api',
          enableRefetch: true,
          requestData: {
            url: '/parameters',
            method: 'GET',
          },
        }),
      ),
    );

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        data: responseParameters,
        isLoading: false,
        hasError: false,
        refetch: result.current.refetch,
        source: result.current.source,
      });
    });
  });
});
