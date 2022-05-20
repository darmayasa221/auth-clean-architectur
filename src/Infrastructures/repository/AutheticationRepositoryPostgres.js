const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthenticationRepository = require('../../Domains/authentications/AuthenticationRepository');

class AuthenticationRepositoryPostgres extends AuthenticationRepository {
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async addToken(token) {
    const query = {
      text: `INSERT INTO authentications
      VALUES ($1)`,
      values: [token],
    };
    await this._pool.query(query);
  }

  async checkAvailableToken(refreshToken) {
    const query = {
      text: `SELECT * FROM authentications
      WHERE token = $1`,
      values: [refreshToken],
    };
    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new InvariantError('refresh token not found!');
    }
  }

  async deleteToken(token) {
    const query = {
      text: `DELETE FROM authentications
      WHERE token = $1`,
      values: [token],
    };
    await this._pool.query(query);
  }
}

module.exports = AuthenticationRepositoryPostgres;
