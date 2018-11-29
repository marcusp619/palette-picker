class ColorPicker {
  constructor() {
    this.projects = [];
  }

  getColors() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexNum = ['#'];
    let totalArr = [];
    for (let i = 0; i < 6; i++) {
      let randomItem = arr[Math.floor(Math.random() * arr.length)];
      hexNum.push(randomItem);
    }

    return hexNum.join('');
  }

  findNewColor() {
    const activeColors = document.querySelectorAll('.palette-squares');
    let newColors = [];

    for (let i = 0; i < activeColors.length; i++) {
      newColors.push(this.getColors());
    }
    console.log(newColors);

    activeColors.forEach((color, i) => {
      color.setAttribute('style', `background-color:${newColors[i]}`);
      color.childNodes[1].innerText = newColors[i];
    });
    return newColors;
  }

  addProject(project) {}

  addPalette(palette) {}

  deletePalette(palette) {}

  toggleFreeze(event) {
    //toggle class active or disable
  }
}

const newUser = new ColorPicker();
newUser.findNewColor();
