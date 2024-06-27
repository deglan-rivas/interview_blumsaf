interface CustomerOptions {
  id?: string | null;
  name: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export class Customer {
  private readonly id: string | null;

  private readonly name: string;

  private readonly lastName: string;

  private readonly email: string;

  private readonly phone: string;

  constructor({
    id = '',
    name,
    lastName = '',
    email = '',
    phone = '',
  }: CustomerOptions) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }

  getName(): string {
    return this.name;
  }
}
