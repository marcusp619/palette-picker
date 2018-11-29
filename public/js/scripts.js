const colorGenerator = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let hexNum = ['#'];
  let totalArr = []
  for(let i = 0; i < 6; i++) {
    let randomItem = arr[Math.floor(Math.random() * arr.length)];
    hexNum.push(randomItem)
  }
  
  return hexNum.join('');
}

const findNewColor = () => {
  const activeColors = document.querySelectorAll('active')
  let newColors = [];

  for(let i = 1; i < activeColors.length; i++) {
    newColors.push(hexGenerator())
  }
  return newColors
}

class ColorPicker {
  constructor() {
    this.projects = [],
  }

  getColors = () => {
  
  }

  addProject = project => {
  
  }

  
}
