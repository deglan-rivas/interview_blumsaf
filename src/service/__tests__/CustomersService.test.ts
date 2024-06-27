import { Customer } from '../../domain/Customer';
import { CustomersServiceImpl } from '../CustomersServiceImpl';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return customers', async () => {
      // ARRANGE
      const customer = new Customer({ name: 'A' });
      const mockRepository = {
        findByFilter: jest.fn().mockResolvedValue([customer]),
      };
      const customerService = new CustomersServiceImpl(mockRepository);

      // ACT
      const response = await customerService.findByFilter(customer);

      // ASSERT
      expect(response).toEqual([customer]);
      expect(mockRepository.findByFilter).toHaveBeenCalledWith(customer);
    });
  });
});
