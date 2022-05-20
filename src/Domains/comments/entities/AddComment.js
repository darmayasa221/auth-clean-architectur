class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      threadId,
      userId,
      content,
    } = payload;

    this.thread_id = threadId;
    this.user_id = userId;
    this.content = content;
    this.is_delete = false;
  }

  _verifyPayload({
    threadId,
    userId,
    content,
  }) {
    if (
      !threadId
      || !userId
      || !content
    ) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (
      typeof threadId !== 'string'
      || typeof userId !== 'string'
      || typeof content !== 'string'
    ) {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
