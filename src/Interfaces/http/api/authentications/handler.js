const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;
    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
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
}

module.exports = AuthenticationsHandler;
