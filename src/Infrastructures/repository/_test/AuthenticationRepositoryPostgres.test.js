const pool = require('../../database/postgres/pool');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const AuthenticationRepositoryPostgres = require('../AutheticationRepositoryPostgres');

describe('AuthenticationRepositoryPostgres', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
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
});
