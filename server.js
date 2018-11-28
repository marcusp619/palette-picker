const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('./public'));

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const palettes = app.locals.palettes;

  return response.json({palettes});
});

app.get('/api/v1/projects/:project_id/palettes/:id', (request, response) => {
  const {id} = request.params;
  const palette = app.locals.palettes.find(palette => palette.id === id);

  return response.status(200).json(palette);
});

app.delete('/api/v1/projects/:project_id/palettes/:id', (request, response) => {
  const {id} = request.params;
  const palettes = app.locals.palettes.filter(palette => palette.id !== id);

  return response.status(200).json(palettes);
});

app.get('/api/v1/projects', (request, response) => {
  database('projects')
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.post('/api/v1/projects', (request, response) => {
  const id = Date.now();
  const {project} = request.body;
  app.locals.projects.push(project);

  return response.status(201).json({id, project});
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
