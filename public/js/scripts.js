let colorPalette = [];
let projectsArray = [];
const generateBtn = document.getElementById("generate-btn");
const savePaletteBtn = document.getElementById("save-palette-btn");
let saveProjectBtn = document.getElementById("save-project-btn");

const getColors = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let hexNum = ["#"];
  let totalArr = [];
  for (let i = 0; i < 6; i++) {
    let randomItem = arr[Math.floor(Math.random() * arr.length)];
    hexNum.push(randomItem);
  }

  return hexNum.join("");
};

const findNewColors = () => {
  console.log("hey");
  colorPalette = [];
  let activeColors = document.querySelectorAll(".palette-squares");

  for (let i = 0; i < activeColors.length; i++) {
    colorPalette.push(getColors());
  }
  activeColors.forEach((color, i) => {
    color.setAttribute("style", `background-color:${colorPalette[i]}`);
    color.childNodes[1].textContent = colorPalette[i];
  });

  return colorPalette;
};

const addProject = event => {
  event.preventDefault();
  let name = document.querySelector(".project-name").value;
  let newProject = { name };

  postProject(newProject);
  //fix duplications
  getProjects();
  displayProjects();
};

const postProject = project => {
  return fetch("/api/v1/projects", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(project)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const getProjects = () => {
  return fetch("/api/v1/projects")
    .then(response => response.json())
    .then(data => cleanProjectData(data))
    .catch(error => console.log(error));
};

const mergeProjectsAndPalettes = async () => {
  let projectResponse = await fetch("/api/v1/projects");
  let paletteResponse = await fetch("/api/v1/projects/palettes");
  let projects = await projectResponse.json();
  let addArrayProjects = await projects.map(project => {
    return (project.palettes = []);
  });
  let palettes = await paletteResponse.json();
  let mergedData = palettes.reduce((acc, palette) => {
    projects.forEach(project => {
      if (project.id === palette.project_id) {
        project.palettes.push(palette);
      }
    });
    acc = [...projects];
    projectsArray = [...acc];
    let displayData = cleanAllData();
    acc = displayData;

    return acc;
  }, []);
  displayProjects(mergedData);
};

const cleanProjectData = projects => {
  let options = document.querySelector(".project-options");
  projects.forEach((project, i) => {
    let opt = document.createElement("option");
    opt.value = project.id;
    opt.innerHTML = project.name;
    options.appendChild(opt);
  });
};

const displayProjects = html => {
  console.log("display");
  if (html === undefined) {
    return;
  }
  let projectSection = document.querySelector(".projects");
  html.forEach(project => {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = project.name + project.palettes;
    projectSection.appendChild(newDiv);
  });
};

const getPalettes = projectIds => {
  let promises = projectIds.map(id => {
    return fetch(`/api/v1/projects/${id}/palettes`).then(response =>
      response.json()
    );
  });
  return Promise.all(promises);
};

const cleanedPalettes = unformattedPalettes => {
  let cleanData = unformattedPalettes.map(palette => {
    let html = `
      <div class="project">
        <h3 class="palette-title">${palette.name}</h3
        <section class="gradient-palette-section">
          <div class="gradient-palette">${palette.id}</div>
        </section>
        <section class="color-palette">
          <div class="palette-squares--sm">${palette.hex_1}</div>
          <div class="palette-squares--sm">${palette.hex_2}</div>
          <div class="palette-squares--sm">${palette.hex_3}</div>
          <div class="palette-squares--sm">${palette.hex_4}</div>
          <div class="palette-squares--sm">${palette.hex_5}</div>
        </section>
        <button onclick='deletePalette(${palette.project_id},${
      palette.id
    })'>Delete</button>
      </div>
    `;

    return html;
  });

  return cleanData.join("");
};

const cleanAllData = () => {
  let projectsData = projectsArray.map(project => {
    let cleanPalettes = cleanedPalettes(project.palettes);
    let cleanedProject = {
      name: `<h1>${project.name}</h1>`,
      palettes: cleanPalettes
    };
    return cleanedProject;
  });
  return projectsData;
};

const addPalette = event => {
  event.preventDefault();
  let htmlCollection = document.querySelector(".project-options").children;

  let projectOptions = Array.from(htmlCollection);
  let selectedProject = projectOptions.filter(
    project => project.selected === true
  );
  let projectId = selectedProject[0].value;
  let name = document.getElementById("palette-name").value;
  let paletteObj = {
    name,
    hex_1: colorPalette[0],
    hex_2: colorPalette[1],
    hex_3: colorPalette[2],
    hex_4: colorPalette[3],
    hex_5: colorPalette[4]
  };
  postPalette(projectId, paletteObj);
  displayProjects();
};

const postPalette = (projectId, paletteObj) => {
  let url = `/api/v1/projects/${projectId}/palettes`;

  return fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(paletteObj)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

const deletePalette = (projectId, paletteId) => {
  let url = `/api/v1/projects/${projectId}/palettes/${paletteId}`;
  console.log(url);
  fetch(url, {
    method: "DELETE",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
  removePalette(event);
};

const removePalette = event => {
  let child = event.currentTarget.parentElement;
  child.remove();
};

const toggleFreeze = event => {
  //toggle class active or disable
};

findNewColors();
getProjects();
displayProjects();
mergeProjectsAndPalettes();

generateBtn.addEventListener("click", findNewColors);
savePaletteBtn.addEventListener("click", addPalette);
saveProjectBtn.addEventListener("click", addProject);
