const AuthenticationRepository = require('../AuthenticationRepository');

describe('AutheticationRepository', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // arrange
    const authenticationRepository = new AuthenticationRepository();
    // Action and Assert
    await expect(authenticationRepository.addToken(''))
      .rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.checkAvailableToken(''))
      .rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(authenticationRepository.deleteToken(''))
      .rejects.toThrowError('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
