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

routes.post('/spots', async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  try {
    const ids = await knex('spots').insert({
      image: 'fake',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    });
    const spot_id = ids[0];

    const spotItems = items.map((item_id: number) => ({
      item_id,
      spot_id,
    }));
    const result = await knex('spot_items').insert(spotItems);
  } catch (e) {
    return response.status(400).json({ error: 'Insert error' });
  }

  return response.json({ message: 'success' });
});
export default routes;
