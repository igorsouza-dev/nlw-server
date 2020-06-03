import { Router } from 'express';
import knex from './database/connection';

const routes = Router();

routes.get('/items', async (request, response) => {
  const items = await knex('items').select('*');
  const serializedItems = items.map(item => ({
    id: item.id,
    title: item.title,
    image_url: `http://localhost:3333/assets/${item.image}`,
  }));
  return response.json(serializedItems);
});

export default routes;
