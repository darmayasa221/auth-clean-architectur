const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler({ payload }, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const auth = await loginUserUseCase.execute(payload);
    const response = h.response({
      status: 'success',
      data: {
        ...auth,
      },
    });
    response.code(201);
    return response;
  }

  async deleteAuthenticationHandler({ payload }, h) {
    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(payload);
    return h.response({
      status: 'success',
    });
  }

  async putAuthenticationHandler({ payload }, h) {
    const refreshAuthenticationUseCase = this._container
      .getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(payload);
    return h.response({
      status: 'success',
      data: {
        accessToken,
      },
    });
  }
}

module.exports = AuthenticationsHandler;
