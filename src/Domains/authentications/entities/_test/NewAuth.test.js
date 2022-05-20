const NewAuth = require('../NewAuth');

describe('NewAuth Entities', () => {
  it('shoul throw error when payload not contain needed property', () => {
    // Arrange
    const requestPayload = {
      accessToken: 'accessToken',
    };
    // Action and Assert
    expect(() => new NewAuth(requestPayload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const requestPayload = {
      accessToken: 123,
      refreshToken: 'refreshToken',
    };
    // Action and Assert
    expect(() => new NewAuth(requestPayload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('shoul create NewAuth correctly', () => {
    // Arrange
    const requestPayload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };
    // Acction
    const newAuth = new NewAuth(requestPayload);
    const { accessToken, refreshToken } = newAuth;
    // Assert
    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(accessToken).toEqual(requestPayload.accessToken);
    expect(refreshToken).toEqual(requestPayload.refreshToken);
  });
});
