import { Customer } from '../../domain/Customer';
import { CustomersRepositoryImpl } from '../../repository/CustomersRepositoryImpl';
import { CustomersServiceImpl } from '../../service/CustomersServiceImpl';
import { CustomersController } from '../CustomersController';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return customers', async () => {
      // ARRANGE
      const name = {
        name: 'A',
      };
      const customer = new Customer(name);
      // const mockService: CustomersServiceImpl = {
      //   findByFilter: jest.fn().mockResolvedValue([customer]),
      //   repository: {},
      // };
      const mockService = new CustomersServiceImpl(
        new CustomersRepositoryImpl()
      );
      jest.spyOn(mockService, 'findByFilter').mockResolvedValue([customer]);
      const controller = new CustomersController(mockService);

      // ACT
      const response = await controller.findByFilter(name);

      // ASSERT
      expect(response).toEqual([customer]);
      expect(mockService.findByFilter).toHaveBeenCalledWith(customer);
    });
  });
});
