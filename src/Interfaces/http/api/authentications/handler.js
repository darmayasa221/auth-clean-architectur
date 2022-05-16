const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
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
}

module.exports = AuthenticationsHandler;
