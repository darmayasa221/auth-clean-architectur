const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');
const container = require('../../container');

describe('/authentications endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
  });

  describe('when POST /authentications', () => {
    it('should response 201 and new authentication', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1',
        password: 'user1',
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'user1',
          password: 'user1',
          fullname: 'Dicoding Indonesia',
        },
      });

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.accessToken).toBeDefined();
      expect(responseJson.data.refreshToken).toBeDefined();
    });

    it('should response 400 if username not found', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1',
        password: 'user1',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      // Arrange
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('not found username');
    });

    it('should response 401 if password wrong', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1',
        password: 'user1',
      };
      const server = await createServer(container);
      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'user1',
          password: 'user',
          fullname: 'user test1',
        },
      });
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('wrong password !');
    });

    it('should response 400 if login not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      // Arrange
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('dont\'t be empty');
    });

    it('should response 400 if login wrong data type', async () => {
      // Arrange
      const requestPayload = {
        username: 123,
        password: 'user1',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: requestPayload,
      });
      // Arrange
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('data of type is not a string');
    });
  });
});
