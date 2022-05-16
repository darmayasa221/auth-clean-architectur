const pool = require('../../database/postgres/pool');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const AuthenticationRepositoryPostgres = require('../AutheticationRepositoryPostgres');
const InvariantError = require('../../../Commons/exceptions/InvariantError');

describe('AuthenticationRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });
  describe('addToken', () => {
    it('should add token to database', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';
      // Action
      await authenticationRepository.addToken(token);
      // Assert
      const results = await AuthenticationsTableTestHelper.findToken(token);
      expect(results).toHaveLength(1);
      expect(results[0].token).toBe(token);
    });
  });
  describe('checkAvailableToken', () => {
    it('should throw InvariantError if token not available', async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      const token = 'token';

      // Action and Assert
      await expect(authenticationRepository.checkAvailableToken(token))
        .rejects.toThrow(InvariantError);
    });
    it('should not throw Invariant error if token availbale', async () => {
      // Arrange
      const token = 'token';
      await AuthenticationsTableTestHelper.addToken(token);
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      // Acction and Assert
      await expect(authenticationRepository.checkAvailableToken(token))
        .resolves.not.toThrow(InvariantError);
    });
  });
  describe('deleteToken', () => {
    it('should delete token form database', async () => {
      // Arrange
      const token = 'token';
      await AuthenticationsTableTestHelper.addToken(token);
      const authenticationRepository = new AuthenticationRepositoryPostgres(pool);
      // action
      await authenticationRepository.deleteToken(token);
      // Assert
      const result = await AuthenticationsTableTestHelper.findToken(token);
      expect(result).toHaveLength(0);
    });
  });
});
