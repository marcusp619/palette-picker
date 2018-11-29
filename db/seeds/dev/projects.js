const createProject = (knex, project) => {
  return knex('projects').insert({
    name: project.name
  }, 'id')
  .then(projectId => {
    let palettePromises = [];
    
    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalette(knex, {
          name,
          hex_1: palette.hex_1,
          hex_2: palette.hex_2,
          hex_3: palette.hex_3,
          hex_4: palette.hex_4,
          hex_5: palette.hex_5,
          project_id: projectId[0]
        })
      )
    })
    return Promise.all(palettePromises);
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({name: 'Test project'}, 'id')
          .then(project => {
            return knex('palettes').insert([
              { name: 'Test Palette', hex_1: '#123456', hex_2: '#123656', hex_3: '#123656', hex_4: '#123656', hex_5: '#123656', project_id: project[0]},
              { name: 'Test Palette 2', hex_1: '#123456', project_id: project[0]},
            ])
          })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
