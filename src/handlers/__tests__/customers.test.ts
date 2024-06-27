import { APIGatewayProxyEvent } from 'aws-lambda';
import { controller } from '../../controller';
import { Customer } from '../../domain/Customer';
import { httpResponse } from '../../utils';
import { customersHandler } from '../customers';

describe('customersHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of customers for a valid GET request with a name query parameter', async () => {
    // Arrange
    const event = {
      resource: '/customers',
      httpMethod: 'GET',
      queryStringParameters: { name: 'A' },
      body: null,
    };

    const customer = new Customer({ name: 'A' });
    jest.spyOn(controller, 'findByFilter').mockResolvedValue([customer]);

    // Act
    const response = await customersHandler(event as any);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseOk(JSON.stringify([customer]))
    );
    expect(controller.findByFilter).toHaveBeenCalledWith({ name: 'A' });
  });

  it('should return a bad request error if HTTP method is not GET', async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      resource: '/customers',
      httpMethod: 'POST',
      queryStringParameters: { name: 'A' },
      body: null,
    } as any;

    // Act
    const response = await customersHandler(event);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseBadRequestError(
        'http method not allowed. Only GET method is available'
      )
    );
  });

  it('should return a bad request error if name query parameter is missing', async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      resource: '/customers',
      httpMethod: 'GET',
      queryStringParameters: null,
      body: null,
    } as any;

    // Act
    const response = await customersHandler(event);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseBadRequestError(
        'name is not provided as query parameter'
      )
    );
  });

  it('should return a bad request error for an unknown route', async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      resource: '/unknown',
      httpMethod: 'GET',
      queryStringParameters: { name: 'A' },
      body: null,
    } as any;

    // Act
    const response = await customersHandler(event);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseBadRequestError(
        'route not found. Try again using /customers'
      )
    );
  });

  it('should return an internal server error if an exception is thrown', async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      resource: '/customers',
      httpMethod: 'GET',
      queryStringParameters: { name: 'A' },
      body: null,
    } as any;

    jest
      .spyOn(controller, 'findByFilter')
      .mockRejectedValue(new Error('Something went wrong'));

    // Act
    const response = await customersHandler(event);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseInternalServerError('Something went wrong')
    );
  });

  it('should return an unknown internal server error if a non-error exception is thrown', async () => {
    // Arrange
    const event: APIGatewayProxyEvent = {
      resource: '/customers',
      httpMethod: 'GET',
      queryStringParameters: { name: 'A' },
      body: null,
    } as any;

    jest
      .spyOn(controller, 'findByFilter')
      .mockRejectedValue('Non-error exception');

    // Act
    const response = await customersHandler(event);

    // Assert
    expect(response).toEqual(
      httpResponse.apiResponseInternalServerError('An unknown error occurred')
    );
  });
});
