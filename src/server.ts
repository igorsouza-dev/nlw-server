import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.send('hello world');
});

app.listen(3333, () => {
  console.log('🚀 Starting server');
});
