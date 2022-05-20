/* eslint-disable camelcase */
const CommentRepository = require('../../Domains/comments/CommentRepository');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(payload) {
    const {
      thread_id,
      content,
      user_id,
      is_delete,
    } = payload;

    const id = `comment-${this._idGenerator()}`;
    const query = {
      text: `INSERT INTO comments
      VALUES($1, $2, $3, $4, $5)`,
      values: [id, thread_id, user_id, content, is_delete],
    };

    await this._pool.query(query);
  }
}

module.exports = CommentRepositoryPostgres;
