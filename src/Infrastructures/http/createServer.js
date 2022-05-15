const Hapi = require('@hapi/hapi');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const authentications = require('../../Interfaces/http/api/authentications');
const users = require('../../Interfaces/http/api/users');

const createServer = async (container) => {
  const server = Hapi.Server({
    host: process.env.HOST,
    port: process.env.PORT,
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
