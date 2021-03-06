const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });
  describe('verifyAvailableUsername function', () => {
    it('should throw InvariantError when username not available', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'user1' });
      // dumy
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action and Assert
      await expect(userRepositoryPostgres.verifyAvailableUsername('user1')).rejects.toThrowError(InvariantError);
    });
    it('should not throw InvariantError when username available', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      // Action and Asssert
      await expect(userRepositoryPostgres.verifyAvailableUsername('user1')).resolves.not.toThrowError(InvariantError);
    });
  });
  describe('addUser function', () => {
    it('should persist register user', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'user1',
        password: 'user1',
        fullname: 'user1 test',
      });
      const fakeIdGenerator = () => '0001'; // stub
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      await userRepositoryPostgres.addUser(registerUser);
      // Assert
      const users = await UsersTableTestHelper.findUserById('user-0001');
      expect(users).toHaveLength(1);
    });
    it('should return registerd user correctly', async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: 'user1',
        password: 'user1',
        fullname: 'user1 test',
      });
      const fakeIdGenerator = () => '0001'; // stub
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      const registeredUser = await userRepositoryPostgres.addUser(registerUser);
      // Assert
      expect(registeredUser).toStrictEqual(new RegisteredUser({
        id: 'user-0001',
        username: 'user1',
        fullname: 'user1 test',
      }));
    });
  });
  describe('getPasswordByUsername Function', () => {
    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      // Action and Assert
      await expect(userRepositoryPostgres.getPasswordByUsername('user'))
        .rejects.toThrowError(InvariantError);
    });
    it('should return username password when user is found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
      await UsersTableTestHelper.addUser({
        username: 'user1',
        password: 'user1',
      });

      // Action & Assert
      const password = await userRepositoryPostgres.getPasswordByUsername('user1');
      expect(password).toBe('user1');
    });
  });
  describe('getIdByUsername', () => {
    it('should throw InvariantError when user not found', async () => {
      // Arrange
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(userRepositoryPostgres.getIdByUsername('user1'))
        .rejects
        .toThrowError(InvariantError);
    });

    it('should return user id correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-0001', username: 'user1' });
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

      // Action
      const userId = await userRepositoryPostgres.getIdByUsername('user1');

      // Assert
      expect(userId).toEqual('user-0001');
    });
  });
});
