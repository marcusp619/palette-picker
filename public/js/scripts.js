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
    opt.value = i;
    opt.innerHTML = project.name;
    options.appendChild(opt);
  });
};

const addPalette = palette => {};

const deletePalette = palette => {};

const toggleFreeze = event => {
  //toggle class active or disable
};

findNewColors();
getProjects();
