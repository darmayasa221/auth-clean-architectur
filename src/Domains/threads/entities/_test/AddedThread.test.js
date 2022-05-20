const AddedThread = require('../AddedThread');

describe('AddedThread', () => {
  it('should throw error when did\'t contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-001',
      title: 'thread title',
    };
    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when did\'t meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'thread title',
      owner: 'user-0001',
    };
    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedThread correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-0001',
      title: 'thread title',
      owner: 'user-0001',
    };
    // action
    const {
      id,
      title,
      owner,
    } = new AddedThread(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.owner);
  });
});
