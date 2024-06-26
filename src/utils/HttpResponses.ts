// src/utils/httpResponses.ts

export type StatusCode = 200 | 400 | 500;

export interface ApiResponse {
  statusCode: StatusCode;
  isBase64Encoded: boolean;
  body: string;
}

export class HttpResponse {
  // constructor() { }

  apiResponseOk(response: string): ApiResponse {
    return {
      statusCode: 200,
      isBase64Encoded: false,
      body: response,
    };
  }

  apiResponseBadRequestError(message: string = ''): ApiResponse {
    return {
      statusCode: 400,
      isBase64Encoded: false,
      body: message,
    };
  }

  apiResponseInternalServerError(message: string = ''): ApiResponse {
    return {
      statusCode: 500,
      isBase64Encoded: false,
      body: message,
    };
  }
}
