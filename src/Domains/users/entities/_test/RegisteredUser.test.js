const RegisteredUser = require('../RegisteredUser');

describe('RegisteredUser Entities', () => {
  it('should throw error when payload did\'t contain needed property', () => {
    // Arrange
    const payload = {
      username: 'user1',
      fullname: 'user1',
    };

    // Acction and Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did\'t meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      username: 123,
      fullname: 'user1 test',
    };
    // Action and Assert
    expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create RegisteredUser Correctly', () => {
    // Arrange
    const payload = {
      id: 'user-0001',
      username: 'user1',
      fullname: 'user1 test',
    };
    // Action
    const { id, username, fullname } = new RegisteredUser(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(fullname).toEqual(payload.fullname);
  });
});
