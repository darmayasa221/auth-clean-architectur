const AddThread = require('../AddThread');

describe('AddThread', () => {
  it('should throw error when payload did\'t not contain needed property', () => {
    // Arrange
    const requestPayload = {
      title: 'thread title',
    };
    // Action and Assert
    expect(() => new AddThread(requestPayload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when payload did\'t meet data type specification', () => {
    // Arrange
    const requestPayload = {
      title: 'thread title',
      body: 123,
      owner: 'user-0001',
    };
    // Acction and Assert
    expect(() => new AddThread(requestPayload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddThread correctly', () => {
    // Arrange
    const requestPayload = {
      title: 'thread title',
      body: 'thread body',
      owner: 'user-0001',
    };
    // Action
    const {
      title,
      body,
      owner,
    } = new AddThread(requestPayload);
    // Assert
    expect(title).toEqual(requestPayload.title);
    expect(body).toEqual(requestPayload.body);
    expect(owner).toEqual(requestPayload.owner);
  });
});
