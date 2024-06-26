import { APIGatewayProxyEvent } from 'aws-lambda';
import { customersHandler } from './handlers/customers';

const event: Partial<APIGatewayProxyEvent> = {
  resource: '/customers',
  httpMethod: 'GET',
  queryStringParameters: {
    name: 'Mike',
  },
  path: '/customers',
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  pathParameters: null,
  stageVariables: null,
  requestContext: {} as any,
  multiValueQueryStringParameters: null,
  body: null,
};

customersHandler(event as APIGatewayProxyEvent);
