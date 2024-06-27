import { Customer } from '../../domain/Customer';
import { CustomersRepository } from '../../repository/CustomersRepository';
import { CustomersServiceImpl } from '../CustomersServiceImpl';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'nlastName@miblum.com',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      const service = new CustomersServiceImpl(repository);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@miblum.com',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith(
        expect.objectContaining({
          name: 'A',
        })
      );
    });
  });
});
