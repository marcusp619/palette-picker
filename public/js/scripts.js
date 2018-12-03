const saveProjectBtn = document.querySelector('.save-project-btn');
const colorPalette = [];

const getColors = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexNum = ['#'];
  let totalArr = [];
  for (let i = 0; i < 6; i++) {
    let randomItem = arr[Math.floor(Math.random() * arr.length)];
    hexNum.push(randomItem);
  }

  return hexNum.join('');
};

const findNewColors = () => {
  const activeColors = document.querySelectorAll('.palette-squares');

  for (let i = 0; i < activeColors.length; i++) {
    colorPalette.push(getColors());
  }

  activeColors.forEach((color, i) => {
    color.setAttribute('style', `background-color:${colorPalette[i]}`);
    color.childNodes[1].innerText = colorPalette[i];
  });
  return colorPalette;
};

const addProject = event => {
  event.preventDefault();
  const name = document.querySelector('.project-name').value;
  const newProject = {
    name,
  };
  postProject(newProject);
  //fix duplications
  getProjects();
};

const postProject = project => {
  return fetch('/api/v1/projects', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(project),
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getProjects = () => {
  return fetch('/api/v1/projects')
    .then(response => response.json())
    .then(data => cleanProjectData(data))
    .catch(error => console.log(error));
};

const cleanProjectData = projects => {
  const options = document.querySelector('.project-options');
  projects.forEach((project, i) => {
    const opt = document.createElement('option');
    opt.value = project.id;
    opt.innerHTML = project.name;
    options.appendChild(opt);
  });
};

const addPalette = event => {
  event.preventDefault();
  const htmlCollection = document.querySelector('.project-options').children;
  const projectOptions = Array.from(htmlCollection)
  const selectedProject = projectOptions.filter(project => project.selected === true);
  const projectId = selectedProject[0].value;
  // make a foreach for new obj hex1-5;
  const paletteObj = {
    name: '',
    hex_1: colorPalette[0],
    hex_2: colorPalette[1],
    hex_3: colorPalette[2],
    hex_4: colorPalette[3],
    hex_5: colorPalette[4]
  }
  console.log(paletteObj)
  postPalette(projectId, paletteObj);
};

const postPalette = (projectId, paletteObj) => {
  console.log(projectId)
  const url = `/api/v1/projects/${projectId}/palettes`
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(paletteObj),
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

const deletePalette = palette => {};

const toggleFreeze = event => {
  //toggle class active or disable
};

findNewColors();
getProjects();
