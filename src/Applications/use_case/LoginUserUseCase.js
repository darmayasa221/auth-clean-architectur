const NewAuth = require('../../Domains/authentications/entities/NewAuth');
const LoginUser = require('../../Domains/users/entities/LoginUser');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(payload) {
    const { username, password } = new LoginUser(payload);
    const hashedPassword = await this._userRepository.getPasswordByUsername(username);
    await this._passwordHash.comparePassword(password, hashedPassword);
    const id = await this._userRepository.getIdByUsername(username);
    const accessToken = await this._authenticationTokenManager
      .createAccessToken({ username, id });
    const refreshToken = await this._authenticationTokenManager
      .createRefreshToken({ username, id });
    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });
    await this._authenticationRepository.addToken(newAuthentication.refreshToken);
    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
