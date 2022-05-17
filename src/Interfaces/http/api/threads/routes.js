const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'formapp_jwt',
    },
  },
]);

module.exports = routes;
