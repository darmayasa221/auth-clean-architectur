const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({
    commentRepository,
    threadRepository,
  }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(payload) {
    const addComment = new AddComment(payload);
    await this._threadRepository.verifyAvailableThreadById(addComment.thread_id);
    return this._commentRepository.addComment(addComment);
  }
}

module.exports = AddCommentUseCase;
