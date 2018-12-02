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
  console.log(colorPalette);

  activeColors.forEach((color, i) => {
    color.setAttribute('style', `background-color:${colorPalette[i]}`);
    color.childNodes[1].innerText = colorPalette[i];
  });
  return colorPalette;
};

const addProject = event => {
  event.preventDefault();
  //get project name
  const projectName = document.querySelector('.project-name').value;
  //get pallete color
  console.log(colorPalette);
  //make new obj to store all in
  const newProject = {
    projectName,
  };
  console.log(newProject);
  //POST to server
  postProject(newProject);
  //Validation for Post
  //Return status msg
};

const postProject = project => {
  return fetch('/api/v1/projects', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(project),
  }).then(response => response.json());
};
const addPalette = palette => {};

const deletePalette = palette => {};

const toggleFreeze = event => {
  //toggle class active or disable
};

findNewColors();
