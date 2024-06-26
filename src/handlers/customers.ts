import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import { controller } from '../controller';
import { httpResponse } from '../utils';
import { ApiResponse } from '../utils/HttpResponses';

export const customersHandler = async (
  event: APIGatewayProxyEvent
): Promise<ApiResponse> => {
  try {
    switch (event.resource) {
      case '/customers': {
        if (event.httpMethod !== 'GET') {
          return httpResponse.apiResponseBadRequestError(
            'http method not allowed. Only GET method is available'
          );
        }

        if (!event.queryStringParameters?.name) {
          return httpResponse.apiResponseBadRequestError(
            'name is not provided as query parameter'
          );
        }

        const { name } = event.queryStringParameters;
        const data = await controller.findByFilter({ name });
        return httpResponse.apiResponseOk(JSON.stringify(data));
      }
      default: {
        return httpResponse.apiResponseBadRequestError(
          'route not found. Try again using /customers'
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return httpResponse.apiResponseInternalServerError(error.message);
    }
    return httpResponse.apiResponseInternalServerError(
      'An unknown error occurred'
    );
  }
};
