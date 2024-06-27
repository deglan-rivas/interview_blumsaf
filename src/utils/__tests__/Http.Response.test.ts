import { httpResponse } from '..';

describe('HttpResponse', () => {
  it('should return 200 OK response', () => {
    // Arrange
    const responseString = 'Success';

    // Act
    const response = httpResponse.apiResponseOk(responseString);

    // Assert
    expect(response).toEqual({
      statusCode: 200,
      isBase64Encoded: false,
      body: responseString,
    });
  });

  it('should return 400 Bad Request response with default message', () => {
    // Act
    const response = httpResponse.apiResponseBadRequestError();

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      isBase64Encoded: false,
      body: '',
    });
  });

  it('should return 400 Bad Request response with custom message', () => {
    // Arrange
    const message = 'Bad request';

    // Act
    const response = httpResponse.apiResponseBadRequestError(message);

    // Assert
    expect(response).toEqual({
      statusCode: 400,
      isBase64Encoded: false,
      body: message,
    });
  });

  it('should return 500 Internal Server Error response with default message', () => {
    // Act
    const response = httpResponse.apiResponseInternalServerError();

    // Assert
    expect(response).toEqual({
      statusCode: 500,
      isBase64Encoded: false,
      body: '',
    });
  });

  it('should return 500 Internal Server Error response with custom message', () => {
    // Arrange
    const message = 'Internal server error';

    // Act
    const response = httpResponse.apiResponseInternalServerError(message);

    // Assert
    expect(response).toEqual({
      statusCode: 500,
      isBase64Encoded: false,
      body: message,
    });
  });
});
