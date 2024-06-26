import { Customer } from '../domain/Customer';
import { CustomersServiceImpl } from '../service/CustomersServiceImpl';

interface FindByFilterOptions {
  name: string;
}

export class CustomersController {
  constructor(private service: CustomersServiceImpl) { }

  async findByFilter({ name }: FindByFilterOptions): Promise<Customer[]> {
    return this.service.findByFilter(new Customer({ name }));
  }
}
