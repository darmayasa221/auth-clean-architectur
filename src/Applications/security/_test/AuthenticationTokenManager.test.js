const AuthenticationTokenManager = require('../AuthenticationTokenManager');

describe('AuthenticationTokenManager', () => {
  it('should throw error when invoked abstract', async () => {
    // Arrange
    const authenticationTokenManager = new AuthenticationTokenManager();
    // Action and Assert
    await expect(authenticationTokenManager.createAccessToken(''))
      .rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.createRefreshToken(''))
      .rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.verifyRefreshToken(''))
      .rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationTokenManager.decodePayload(''))
      .rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
