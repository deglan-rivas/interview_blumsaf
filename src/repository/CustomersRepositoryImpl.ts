import axios from 'axios';
import { Customer } from '../domain/Customer';
import { RandomUsersSchema } from '../schemas';
import { RandomUser } from '../types';
import { CustomersRepository } from './CustomersRepository';

export class CustomersRepositoryImpl implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const result = await axios.get('https://randomuser.me/api/?results=100');

    const validatedUsers = RandomUsersSchema.safeParse(result.data?.results);
    if (!validatedUsers.success) {
      throw new Error(validatedUsers.error.message);
    }
    // if (!result.data.results) {
    //   return [];
    // }

    return validatedUsers.data
      .filter((item: RandomUser) =>
        item.name.first
          .toLowerCase()
          .startsWith(customer.getName().toLowerCase())
      )
      .map(
        (item: RandomUser) =>
          new Customer({
            id: item.id.value,
            name: item.name.first,
            lastName: item.name.last,
            email: `${item.name.first.charAt(0)}${item.name.last}@miblum.com`,
            phone: item.phone,
          })
      );
  }
}
