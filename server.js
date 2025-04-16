

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('api/api.json'); // Path to your data file
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Handle errors gracefully
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

server.use(router);

// Vercel assigns the port dynamically, so we use process.env.PORT
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});
