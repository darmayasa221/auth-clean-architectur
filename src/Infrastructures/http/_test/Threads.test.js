const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('Threads', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });
  describe('when POST /threads', () => {
    it('should response 201 and persisted threads', async () => {
      // Arrange
      const server = await createServer(container);
      // register
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'user1',
          password: 'user1',
          fullname: 'user1 test',
        },
      });
      // login
      const responseLoginUser = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'user1',
          password: 'user1',
        },
      });
      const { data: { accessToken } } = JSON.parse(responseLoginUser.payload);
      // Action
      const responseThreads = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: {
          title: 'thread title',
          body: 'thread body',
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Assert
      const responseThreadsJson = JSON.parse(responseThreads.payload);
      expect(responseThreads.statusCode).toEqual(201);
      expect(responseThreadsJson.status).toEqual('success');
      expect(responseThreadsJson.data.addedThread).toBeDefined();
    });
  });
});
