const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });
  describe('addThread', () => {
    it('should persist add thread', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-0001' });
      const thread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-0001',
      });
      const fakeIdGenerator = () => '0001';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      await threadRepositoryPostgres.addThread(thread);
      // Assert
      const threads = await ThreadsTableTestHelper.findThreadById('thread-0001');
      expect(threads).toHaveLength(1);
    });
    it('should return addedThread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-0001' });
      const thread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-0001',
      });
      const fakeIdGenerator = () => '0001';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      // Action
      const threads = await threadRepositoryPostgres.addThread(thread);
      // Assert
      expect(threads).toStrictEqual(new AddedThread({
        id: 'thread-0001',
        title: thread.title,
        owner: thread.owner,
      }));
    });
  });
});
