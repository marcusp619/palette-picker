const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker API';
app.locals.palettes = [{id: 1, color: '#000000'}, {id: 2, color: '#F5F5F5'}];
app.locals.projects = [{id: 1}];

app.get('/api/v1/projects/palettes', (request, response) => {
  response.send('Testing Colors GET End Point');
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const palette = app.locals.palettes.find(palette => palette.id === id);

  return response.status(200).json(palette);
});


app.post('/api/v1/projects', (request, response) => {
  const id = Date.now();
  const { project } = request.body;
  app.locals.projects.push(project)


  return response.status(201).json({ id, project});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
