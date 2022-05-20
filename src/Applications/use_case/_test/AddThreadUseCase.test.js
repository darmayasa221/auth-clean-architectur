const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    // Arrange
    const requestPayload = {
      title: 'thread title',
      body: 'thread body',
      owner: 'user-001',
    };

    const expectedAddThread = new AddedThread({
      id: 'thread-0001',
      title: requestPayload.title,
      owner: requestPayload.owner,
    });
    const mockThreadRepository = new ThreadRepository();
    // mocking
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedThread({
        id: 'thread-0001',
        title: requestPayload.title,
        owner: requestPayload.owner,
      })));
    // instance
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });
    // Action
    const addedThread = await addThreadUseCase.execute(requestPayload);
    // Assert
    expect(addedThread).toStrictEqual(expectedAddThread);
    expect(mockThreadRepository.addThread)
      .toBeCalledWith(new AddThread({
        title: requestPayload.title,
        body: requestPayload.body,
        owner: requestPayload.owner,
      }));
  });
});
