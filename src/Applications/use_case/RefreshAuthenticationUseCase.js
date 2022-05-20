class RefreshAuthenticationUseCase {
  constructor({
    authenticationRepository,
    authenticationTokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(payload) {
    this._verifyPayload(payload);
    await this._authenticationRepository.checkAvailableToken(payload.refreshToken);
    await this._authenticationTokenManager.verifyRefreshToken(payload.refreshToken);

    const {
      username,
      id,
    } = await this._authenticationTokenManager.decodePayload(payload.refreshToken);

    return this._authenticationTokenManager.createAccessToken({ username, id });
  }

  _verifyPayload({
    refreshToken,
  }) {
    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
