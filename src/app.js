const container = require('./Infrastructures/container');
const createServer = require('./Infrastructures/http/createServer');
require('dotenv').config();

const start = async () => {
  const server = await createServer(container);
  await server.start();
  // eslint-disable-next-line no-console
  console.log(`${server.info.uri}`);
};

start();
