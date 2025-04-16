const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('api/api.json'); // Adjust the path to your db file
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Vercel assigns the port dynamically, so we use process.env.PORT
server.listen(process.env.PORT || 8000, () => {
  console.log('JSON Server is running');
});
