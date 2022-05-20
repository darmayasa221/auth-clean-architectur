const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const AddComment = require('../../../Domains/comments/entities/AddComment');

describe('CommentRepositoryPostgres', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });
  describe('AddComment', () => {
    it('should persist AddComment', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-0001', username: 'user1' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-0001' });
      await UsersTableTestHelper.addUser({ id: 'user-1000', username: 'user comment' });
      const comment = new AddComment({
        threadId: 'thread-0001',
        content: 'comment',
        userId: 'user-1000',
      });
      const idGenerator = () => '0001';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, idGenerator);
      // Action
      await commentRepositoryPostgres.addComment(comment);
      // Assert
      const comments = await CommentsTableTestHelper.findCommentById('comment-0001');
      expect(comments).toHaveLength(1);
    });
  });
});
