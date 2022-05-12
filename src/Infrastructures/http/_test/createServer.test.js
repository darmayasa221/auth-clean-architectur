const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('HTTP server', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });
  it('should response 404 when request unregisterd route', async () => {
    // Arrange
    const server = await createServer({});
    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });
    // Assert
    expect(response.statusCode).toEqual(404);
  });
  describe('when POST /users', () => {
    it('should response 201  and persisted user', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1',
        password: 'user1',
        fullname: 'user1 test',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });
    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        fullname: 'user1 test',
        password: 'user1',
      };
      const server = await createServer(container);
      // Acction
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t maked new user because not have needed property');
    });
    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        username: 123,
        password: 'user1',
        fullname: 'user1 test',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t maked user because not meet data type specification');
    });
    it('should response 400 when username more then 50 character', async () => {
      // Arrange
      const requestPayload = {
        username: 'user1sdwashdwasdhiwausjdnwjahsjdwjasdhwaijshdijwahsjdhwakjhdiw',
        password: 'user1',
        fullname: 'user1 Test',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t maked user because length of the username is more than 50 character');
    });
    it('should response 400 when username contain restricted character', async () => {
      // Arrange
      const requestPayload = {
        username: 'user 1',
        password: 'user1',
        fullname: 'user1 Test',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('can\'t maked user because contain dangerous character at username');
    });
    it('should return 400 when username unavailable', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'user1' });
      const requestPayload = {
        username: 'user1',
        password: 'user1',
        fullname: 'user1 Test',
      };
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('username is available!');
    });
  });
  it('should handle server error correctly', async () => {
    // Arrange
    const requestPayload = {
      username: 'user1',
      password: 'user1',
      fullname: 'user1 Test',
    };
    const server = await createServer({}); // fake container
    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: requestPayload,
    });
    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(500);
    expect(responseJson.status).toEqual('error');
    expect(responseJson.message).toEqual('server error');
  });
});
