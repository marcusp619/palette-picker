const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('./public'));

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects/palettes', (request, response) => {
  database('palettes')
    .select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const {project_id} = request.params;

  database('palettes')
    .where('project_id', project_id)
    .select()
    .then(palettes => response.status(200).json(palettes))
    .catch(error => console.log(`Error fetching project: ${error}`));
});

app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
  const palette = request.body;
  const {project_id} = request.params;

  database('palettes')
    .insert({...palette, project_id}, 'id')
    .then(palette => {
      response.status(201).json({id: palette[0]});
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.delete('/api/v1/projects/:project_id/palettes/:id', (request, response) => {
  const {id, project_id} = request.params;

  database('palettes')
    .where('project_id', project_id)
    .where('id', id)
    .del()
    .then(palette => response.status(200).json(palette))
    .catch(error => console.log(`Error deleting palette: ${error}`));
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
  const project = request.body;

  database('projects')
    .insert(project, 'id')
    .then(project => {
      response.status(201).json({id: project[0]});
    })
    .catch(error => {
      response.status(500).json({error});
    });
});

app.listen(app.get('port'), () => {
  console.log(`is running on ${app.get('port')}.`);
});
