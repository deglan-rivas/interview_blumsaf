import { Customer } from '../domain/Customer';
import { CustomersRepositoryImpl } from '../repository/CustomersRepositoryImpl';
import { CustomersService } from './CustomersService';

export class CustomersServiceImpl implements CustomersService {
  constructor(private repository: CustomersRepositoryImpl) { }

  async findByFilter(customer: Customer): Promise<Customer[]> {
    return this.repository.findByFilter(customer);
  }
}
