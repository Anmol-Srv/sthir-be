const server = require('./app')(undefined, {
    logger: true
});
  
server.then((fastify) => {
    fastify.listen({ port: process.env.PORT || 3000}, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      process.send('ready');
    });
  });
  