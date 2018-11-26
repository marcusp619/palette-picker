const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker API';
app.locals.colors = [{id: 1, color: '#000000'}, {id: 2, color: '#F5F5F5'}];

app.get('/', (request, response) => {
  response.send('Testing Palette Picker API');
});

app.get('/api/v1/colors', (request, response) => {
  response.send('Testing Colors GET End Point');
});

app.post('/api/v1/colors', (request, response) => {
  const id = Date.now();
  const {color} = request.body;

  app.locals.colors.push(color);

  return response.status(201).json({ id, color});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
