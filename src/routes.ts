import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  return response.send('hello world');
});

export default routes;
