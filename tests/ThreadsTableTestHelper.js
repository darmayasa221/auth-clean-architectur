/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-0001',
    title = 'title thread',
    body = 'body thread',
    owner = 'user-0001',
  }) {
    const query = {
      text: `INSERT INTO threads
       VALUES ($1, $2, $3, $4)`,
      values: [id, title, body, owner],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async findThreadById(id) {
    const query = {
      text: `SELECT * FROM 
      threads WHERE id = $1`,
      values: [id],
    };

    const { rows } = await pool.query(query);

    return rows;
  },

  async cleanTable() {
    await pool.query('TRUNCATE TABLE users, authentications, threads');
  },
};

module.exports = ThreadsTableTestHelper;
