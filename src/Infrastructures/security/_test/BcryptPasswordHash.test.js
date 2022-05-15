const bcrypt = require('bcrypt');
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError');
const BcryptPasswordHash = require('../BcryptPasswordHash');

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      // Arrange
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      // Action
      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');
      // Assert
      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10);
    });
  });
  describe('comparePassword function', () => {
    it('should throw AuthenticationError if password not match', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      // Acction and Assert
      await expect(bcryptPasswordHash.comparePassword('plain_password', 'encrypted_password'))
        .rejects.toThrow(AuthenticationError);
    });
    it('should not throw error if password match', async () => {
      // Arrange
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const plainPassword = 'password';
      const hashedPassword = await bcryptPasswordHash.hash(plainPassword);
      // Action and Assert
      await expect(bcryptPasswordHash.comparePassword(plainPassword, hashedPassword))
        .resolves.not.toThrow(AuthenticationError);
    });
  });
});
