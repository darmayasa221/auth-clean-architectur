const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const LogoutUserUseCase = require('../LogoutUserUseCase');

describe('LogoutUserUseCase', () => {
  it('shpuld throw error if payload not contain refreshToken', async () => {
    // Arrange
    const requestPayload = {};
    const logoutUserUseCase = new LogoutUserUseCase({});
    // Action and Assert
    await expect(logoutUserUseCase.execute(requestPayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });
  it('should throw error if refresh token not string', async () => {
    // Arrange
    const requestPayload = {
      refreshToken: 123,
    };
    const logoutUserUseCase = new LogoutUserUseCase({});
    // Action and Assert
    await expect(logoutUserUseCase.execute(requestPayload))
      .rejects
      .toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should orchestrating the LogoutUserUseCase action correctly', async () => {
    // Arrange
    const requestPayload = {
      refreshToken: 'refreshToken',
    };
    const mockAuthenticationRepository = new AuthenticationRepository();
    mockAuthenticationRepository.checkAvailableToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });
    // action
    await logoutUserUseCase.execute(requestPayload);
    // Assert
    expect(mockAuthenticationRepository.checkAvailableToken)
      .toHaveBeenCalledWith(requestPayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken)
      .toHaveBeenCalledWith(requestPayload.refreshToken);
  });
});
