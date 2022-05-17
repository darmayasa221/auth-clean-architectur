/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-0001',
    threadId,
    userId,
    content = 'comment content',
    isDelete = false,
  }) {
    const query = {
      text: `INSERT INTO comments
      VALUES ($1, $2, $3, $4, $5)`,
      values: [id, threadId, userId, content, isDelete],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async findCommentById(id) {
    const query = {
      text: `SELECET * FROM comments
      WHERE id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows;
  },

  async deleteCommentById(id) {
    const query = {
      text: `UPDATE comments
      SET is_delete = true
      WHERE id = $1`,
      values: [id],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE users, authentications, threads, comments');
  },
};

module.exports = CommentsTableTestHelper;
