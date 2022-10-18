import { ServiceStatus, ServiceTypes } from "~/legacy/src/constants";
import { rest } from "msw";

export const TREINTA_API_URL = window.ENV?.REACT_APP_TREINTA_API_URL;
export const ORCHESTRATOR_URL = window.ENV?.REACT_APP_ORCHESTRATOR_URL;
export const PAYMENTS_URL = window.ENV?.REACT_APP_PAYMENTS_URL;

export const handlers = [
  rest.get(`${PAYMENTS_URL}/parameters`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        message: "Parameters requested successfully",
        data: [
          {
            id: 86,
            key: "MPOS_ITEM_NAME_CO",
            value: "MPOS Treinta",
          },
          {
            id: 87,
            key: "MPOS_ITEM_PRICE_CO",
            value: "50000",
          },
          {
            id: 88,
            key: "MPOS_ITEM_TAX_VALUE_CO",
            value: "19",
          },
          {
            id: 89,
            key: "MPOS_ITEM_SHIPPING_COST_CO",
            value: "5000",
          },
        ],
      })
    )
  ),
  rest.get(`${ORCHESTRATOR_URL}/users/info/:uid`, (req, res, ctx) => {
    const { uid } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        uid: uid,
        name: "User",
      })
    );
  }),
  rest.get(`${PAYMENTS_URL}/extra-income/stores`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          stores: [
            {
              id: "789",
              name: "My Store",
              userType: 1,
            },
            {
              id: "456",
              name: "My Other Store",
              userType: 1,
            },
            {
              id: "789",
              name: "My Last Store",
              userType: 2,
            },
          ],
        },
      })
    );
  }),
  rest.get(`${ORCHESTRATOR_URL}/users/phone/validation`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json("true"));
  }),
  rest.get(`${TREINTA_API_URL}/service`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          service_status_id: ServiceStatus.ACTIVE,
          service_type_id: ServiceTypes.PAYMENT_LINKS,
        },
      ])
    )
  ),
  rest.post(`${ORCHESTRATOR_URL}/service/create`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        serviceStatusId: ServiceStatus.ACTIVE,
        serviceTypeId: ServiceTypes.PAYMENT_LINKS,
      })
    )
  ),
  rest.post(`${ORCHESTRATOR_URL}/validations/id`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(""))
  ),
  rest.get(`${ORCHESTRATOR_URL}/validations/:storeId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        reviewStatus: 2,
      })
    )
  ),
  rest.put(`${ORCHESTRATOR_URL}/transaction/update-multiple`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          id: "123abc",
        },
      ])
    )
  ),
  rest.post(`${ORCHESTRATOR_URL}/mpos/tmp-transactions`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json("123abc"))
  ),
  rest.get(`${ORCHESTRATOR_URL}/users/:userId`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: "123abc",
        firstName: "User firstName",
        lastName: "User Lastname",
        email: "user@gmail.com",
        phone: "+573101233223",
      })
    )
  ),
  rest.put(`${ORCHESTRATOR_URL}/users/update`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
  rest.get(`${ORCHESTRATOR_URL}/store/find`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        {
          firstName: "Store Firstname",
          lastName: "Store Lastname",
          email: "store@gmail.com",
          phone: "+573133211232",
        },
      ])
    )
  ),
  rest.put(`${ORCHESTRATOR_URL}/store/update`, (req, res, ctx) =>
    res(ctx.status(200))
  ),
  rest.post(`${ORCHESTRATOR_URL}/mpos/accounts`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        store: {
          id: "testStoreId",
        },
        user: {
          id: "testUserId",
        },
      })
    )
  ),
  rest.post(`${ORCHESTRATOR_URL}/service/create-by-key`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
  rest.put(`${ORCHESTRATOR_URL}/service/update`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
  rest.put(`${ORCHESTRATOR_URL}/service/update-by-key`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({}))
  ),
  rest.get(
    `${ORCHESTRATOR_URL}/mpos/enrollment/check-availability/:phoneNumber`,
    (req, res, ctx) => res(ctx.status(200), ctx.json("true"))
  ),
  rest.get(`${ORCHESTRATOR_URL}/users/user/zendesk`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(""))
  ),
  rest.get(
    `${ORCHESTRATOR_URL}/transaction/by-store/:storeId`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          transactions: [
            {
              paymentsData:
                '{"purchaseSummary":{"mposProduct":"Datáfono Treinta","mposUnits":4,"mposValue":50000,"mposTax":19,"mposCalculatedTax":38000,"mposCostShipping":0,"mposTotal":238000,"isComplete":true,"mposQuantity":4,"tax":19,"taxValue":38000,"costOfShipping":0,"total":238000}}',
            },
          ],
        })
      )
  ),
  rest.get(
    `${ORCHESTRATOR_URL}/users/hunters/:spreadsheetId`,
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json([["3040123451"]]));
    }
  ),
];
