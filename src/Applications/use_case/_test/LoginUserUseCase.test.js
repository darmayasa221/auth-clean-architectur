const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const LoginUserUseCase = require('../LoginUserUseCase');
const LoginUser = require('../../../Domains/users/entities/LoginUser');

describe('LoginUserUseCase', () => {
  it('should orchestrating the LoginUserUsecase action correctly', async () => {
    // Arrange
    const requestPayload = new LoginUser({
      username: 'user1',
      password: 'user1',
    });
    const expectedAuthentication = new NewAuth({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockUserRepository = new UserRepository();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();
    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.comparePassword = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockUserRepository.getIdByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('user-0001'));
    mockAuthenticationTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('accessToken'));
    mockAuthenticationTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('refreshToken'));
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    // instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
      passwordHash: mockPasswordHash,
    });
    // Acction
    const auth = await loginUserUseCase.execute(requestPayload);
    // Assert
    expect(auth).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith('user1');
    expect(mockPasswordHash.comparePassword).toBeCalledWith('user1', 'encrypted_password');
    expect(mockUserRepository.getIdByUsername).toBeCalledWith('user1');
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'user1', id: 'user-0001' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'user1', id: 'user-0001' });
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith('refreshToken');
  });
});
