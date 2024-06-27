import { CustomersServiceImpl } from '../../service/CustomersServiceImpl';
import { CustomersController } from '../CustomersController';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone',
            },
          ])
        ),
      } as unknown as CustomersServiceImpl;

      const controller = new CustomersController(service);

      // Execute
      // const response = await controller.findByFilter({
      //   httpMethod: 'GET',
      //   resource: '/customers',
      //   queryStringParameters: {
      //     name: 'A',
      //   },
      // } as unknown as APIGatewayProxyEvent);
      const response = await controller.findByFilter({
        name: 'A',
      });

      // Validate
      // expect(response).toEqual({
      //   statusCode: 200,
      //   isBase64Encoded: false,
      //   body: '[{"id":"customerId","name":"name","lastName":"lastName","email":"email"}]',
      // });
      // expect(response).toBe([
      // expect(response).toStrictEqual([
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
          phone: 'phone',
        },
      ]);
      expect(service.findByFilter).toBeCalledWith(
        expect.objectContaining({
          name: 'A',
        })
      );
    });
  });
});
