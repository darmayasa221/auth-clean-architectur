/* eslint-disable camelcase */
const AddComment = require('../AddComment');

describe('AddComment', () => {
  it('should throw error when did\'t contain needed property', () => {
    // Arrange
    const requestPayload = {
      threadId: 'thread-0001',
      userId: 'user-0001',
    };
    // Action and Assert
    expect(() => new AddComment(requestPayload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
  it('should throw error whemn did\'t not meet data type specification', () => {
    // Arrange
    const requestPayload = {
      threadId: 'thread-0001',
      userId: 'user-0001',
      content: 123,
    };
    // Action and Assert
    expect(() => new AddComment(requestPayload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
  it('should crate AddComent corretly', () => {
    // Arrange
    const requestPayload = {
      threadId: 'thread-0001',
      userId: 'user-0001',
      content: 'test content',
    };
    // Action
    const {
      thread_id,
      user_id,
      content,
      is_delete,
    } = new AddComment(requestPayload);
    // Arrange
    expect(thread_id).toEqual(requestPayload.threadId);
    expect(user_id).toEqual(requestPayload.userId);
    expect(content).toEqual(requestPayload.content);
    expect(is_delete).toEqual(false);
  });
});
