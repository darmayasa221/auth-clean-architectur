const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const authentications = require('../../Interfaces/http/api/authentications');
const threads = require('../../Interfaces/http/api/threads');
const users = require('../../Interfaces/http/api/users');

const createServer = async (container) => {
  const server = Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register({ plugin: Jwt });

  server.auth.strategy('formapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: threads,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', ({ response }, h) => {
    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }
      if (!translatedError.isServer) {
        return h.continue;
      }
      const newResponse = h.response({
        status: 'error',
        message: 'server error',
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  return server;
};

module.exports = createServer;
