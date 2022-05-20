const RegisterUser = require('../RegisterUser');

describe('a RegisterUser entitirs', () => {
  it('should throw an error when payload did\'t contain needed property', () => {
    // Arrange
    const payload = {
      username: 'user1',
      password: 'user1',
    };

    // Action dan Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw an error when payload did\'t meet data type specification', () => {
    // Arrange
    const payload = {
      username: 'user1',
      password: 123,
      fullname: 'user1 Test',
    };

    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should throw error when username contains more then 50 character', () => {
    // Arrange
    const payload = {
      username: 'user1sdwashdwasdhiwausjdnwjahsjdwjasdhwaijshdijwahsjdhwakjhdiw',
      password: 'user1',
      fullname: 'user1 Test',
    };
    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LIMIT_CHAR');
  });
  it('should throw error when username contains restricted character', () => {
    // Arrange
    const payload = {
      username: 'user 12',
      password: 'user1',
      fullname: 'user1 test',
    };
    // Action and Assert
    expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });
  it('should create RegisterUser object correctly', () => {
    // Arrange
    const payload = {
      username: 'user',
      password: 'user1',
      fullname: 'user1 test',
    };
    // Action
    const { username, password, fullname } = new RegisterUser(payload);

    // Assert
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
    expect(fullname).toEqual(payload.fullname);
  });
});
