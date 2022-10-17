import {renderHook} from '@testing-library/react-hooks';
import {useGetValueRemoteConfig} from './useGetValueRemoteConfig';

const mockValue =
  '[{"id":1,"name":"Colombia","acronym":"CO","code":"+57","digits":[10],"support":"+14327413593","pagosSupport":"+17866059699","label":"3507136328","locale":"es-CO","currency":"COP","decimals":false,"timeZone":"America/Bogota","community":{"telegram":"https://t.me/joinchat/a4URwm7iuAcyZGUx","facebook":"https://www.facebook.com/groups/treintaco","whatsapp":""},"payments":{"maxValueLink":17000000,"extraIncomeEnable":false,"minimumPaymentLinkAmount":5000,"minimumRechargeMoneyBagAmount":5000,"treintaCommission":0},"enable":true}]';

jest.mock('@firebase/remote-config', () => ({
  getRemoteConfig: jest.fn(),
  getValue: () => ({
    _source: 'remote',
    asString: () => mockValue.toString(),
    _value: mockValue,
  }),
}));

describe('useGetValueRemoteConfig', () => {
  test('should get payments info', () => {
    const {result} = renderHook(() => useGetValueRemoteConfig('payments'));

    expect(result.current).toStrictEqual({
      extraIncomeEnable: false,
      maxValueLink: 17000000,
      minimumPaymentLinkAmount: 5000,
      minimumRechargeMoneyBagAmount: 5000,
      treintaCommission: 0,
    });
  });
});
