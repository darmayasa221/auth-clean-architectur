class LogoutUserUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(payload) {
    this._verifyPayload(payload);
    await this._authenticationRepository.checkAvailableToken(payload.refreshToken);
    await this._authenticationRepository.deleteToken(payload.refreshToken);
  }

  _verifyPayload({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
    if (typeof refreshToken !== 'string') {
      throw new Error('DELETE_AUTHENTICATION_USE_CASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = LogoutUserUseCase;
