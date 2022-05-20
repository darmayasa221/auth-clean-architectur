/* eslint-disable camelcase */
const AddedComment = require('../AddedComment');

describe('AddedComment', () => {
  it('should throw error when did\'t contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-0001',
      content: 'comment test',
    };
    // Acction and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error when did\'t meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-0001',
      content: 'comment test',
      user_id: 123,
    };
    // Acction and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should create AddedComment correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-0001',
      content: 'comment test',
      user_id: 'user-0001',
    };
    // Acction
    const {
      id,
      content,
      owner,
    } = new AddedComment(payload);
    // Assert
    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.content);
    expect(owner).toEqual(payload.user_id);
  });
});
