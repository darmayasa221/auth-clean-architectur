const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(payload) {
    const {
      title,
      body,
      owner,
    } = payload;
    const id = `thread-${this._idGenerator()}`;
    const query = {
      text: `INSERT INTO threads
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, owner`,
      values: [id, title, body, owner],
    };
    const { rows } = await this._pool.query(query);
    return new AddedThread(rows[0]);
  }

  async verifyAvailableThreadById(id) {
    const query = {
      text: `SELECT id FROM threads
      WHERE id = $1`,
      values: [id],
    };

    const { rowCount } = await this._pool.query(query);
    if (!rowCount) {
      throw new NotFoundError('thread not found');
    }
  }
}

module.exports = ThreadRepositoryPostgres;
