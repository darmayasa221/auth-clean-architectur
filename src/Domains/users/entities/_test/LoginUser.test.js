const LoginUser = require('../LoginUser');

describe('LoginUser', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const requestPayload = {
      username: 'user1',
    };
    // Action and Assert
    expect(() => new LoginUser(requestPayload)).toThrowError('LOGIN_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const requestPayload = {
      username: 'user1',
      password: 123,
    };
    // Action and Assert
    expect(() => new LoginUser(requestPayload)).toThrowError('LOGIN_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create LoginUser correctly', () => {
    // Arrange
    const requestPayload = {
      username: 'user1',
      password: 'user1',
    };
    // Action
    const loginUser = new LoginUser(requestPayload);
    // Assert
    const { username, password } = loginUser;

    expect(loginUser).toBeInstanceOf(LoginUser);
    expect(username).toEqual(requestPayload.username);
    expect(password).toEqual(requestPayload.password);
  });
});
