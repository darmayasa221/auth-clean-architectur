const CommentRepository = require('../../../Domains/comments/CommentRepository');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const requestPayload = {
      threadId: 'thread-0001',
      content: 'comment test',
      userId: 'user-0001',
    };
    const expectedAddComment = new AddedComment({
      id: 'comment-0001',
      content: requestPayload.content,
      user_id: requestPayload.userId,
    });
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    // mocking
    mockThreadRepository.verifyAvailableThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedComment({
        id: 'comment-0001',
        content: requestPayload.content,
        user_id: requestPayload.userId,
      })));
    // instance
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    // action
    const comments = await addCommentUseCase.execute(requestPayload);
    // Assert
    expect(comments).toStrictEqual(expectedAddComment);
    expect(mockThreadRepository.verifyAvailableThreadById)
      .toBeCalledWith(requestPayload.threadId);
    expect(mockCommentRepository.addComment)
      .toBeCalledWith(new AddComment({
        threadId: requestPayload.threadId,
        content: requestPayload.content,
        userId: requestPayload.userId,
      }));
  });
});
