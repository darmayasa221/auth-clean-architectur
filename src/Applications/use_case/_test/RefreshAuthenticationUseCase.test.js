const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const RefreshAuthenticationUseCase = require('../RefreshAuthenticationUseCase');

describe('RefreshTokenAuthentication', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const requestPayload = {};
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(requestPayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const requestPayload = {
      refreshToken: 1,
    };
    const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(requestPayload))
      .rejects
      .toThrowError('REFRESH_AUTHENTICATION_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should orchestrating refresh token authentication action correctly', async () => {
    // Assert
    const requestPayload = {
      refreshToken: 'some_refresh_token',
    };
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // mocking
    mockAuthenticationRepository.checkAvailableToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'user', id: 'user-0001' }));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('some_new_access_token'));
    // instance
    const refreshTokenAuthentication = new RefreshAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });
    // action
    const accessToken = await refreshTokenAuthentication.execute(requestPayload);
    // Assert
    // Assert
    expect(mockAuthenticationRepository.checkAvailableToken)
      .toBeCalledWith(requestPayload.refreshToken);
    expect(mockAuthenticationTokenManager.verifyRefreshToken)
      .toBeCalledWith(requestPayload.refreshToken);
    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(requestPayload.refreshToken);
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'user', id: 'user-0001' });
    expect(accessToken).toEqual('some_new_access_token');
  });
});
