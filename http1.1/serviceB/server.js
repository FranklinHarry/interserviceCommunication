const Hapi = require('hapi');
const Good = require('good');

const options = {
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }],
      }, {
        module: 'good-console',
      }, 'stdout',
    ],
  },
};

const server = Hapi.server({
  host: '0.0.0.0',
  port: 8001,
});

server.route({
  method: 'GET',
  path: '/id',
  handler: async (request, h) => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
        });
      }, 10);
    });
    return h.response(response);
  },
});

server.route({
  method: 'GET',
  path: '/name',
  handler: async (request, h) => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Abhinav Dhasmana',
        });
      }, 10);
    });
    return h.response(response);
  },
});

server.route({
  method: 'GET',
  path: '/passion',
  handler: async (request, h) => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          enjoy_coding: true,
        });
      }, 10);
    });
    return h.response(response);
  },
});


const start = async () => {
  try {
    if (!module.parent) {
      await server.register({
        plugin: Good,
        options,
      });
      await server.start();
    }
    console.log('server started');
  } catch (err) {
    console.log('failed to start the server', err);
  }
};

start();
