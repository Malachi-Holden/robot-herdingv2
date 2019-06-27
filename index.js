
setup();
document.getElementById("counter").innerHTML = ` ${configuration.counter}`;
let inputs = document.getElementsByTagName('input');


const rotateCallback = e=>{
  e.preventDefault();
  let moveForm = document.getElementById("rotate");
  let color = moveForm.getElementsByTagName('select')[0].value;
  let num = parseInt(moveForm.getElementsByTagName('select')[1].value,10);
  let rotate = parseInt(moveForm.getElementsByTagName('select')[2].value, 10);
  configuration.counter ++;
  rotateRobots(color, num, rotate);
  document.getElementById("counter").innerHTML = ` ${configuration.counter}`;
}

const moveCallback = e=>{
  e.preventDefault();
  let moveForm = document.getElementById("move");
  let color = moveForm.getElementsByTagName('select')[0].value;
  let num = parseInt(moveForm.getElementsByTagName('select')[1].value,10);
  let squares = parseInt(moveForm.getElementsByTagName('select')[2].value,10);
  configuration.counter ++;
  moveRobots(color, num, squares);
  document.getElementById("counter").innerHTML = ` ${configuration.counter}`;

}

document.getElementById("move").addEventListener("submit", e=>{moveCallback(e)});
document.getElementById("rotate").addEventListener("submit", e=>{rotateCallback(e)});

const restart = ()=>{
  configuration.robots = JSON.parse(JSON.stringify(startConf.robots));
  configuration.squares = [];
  for(let i=0;i<configuration.dimensions.height;i++)
    {
      let row = [];
      for(let j=0;j<configuration.dimensions.width;j++)
      {
        row.push(0);
      }
      configuration.squares.push(row);
    }
  configuration.counter = 0;
  document.getElementById("counter").innerHTML = ` ${configuration.counter}`;
  setBlanks();
  loadRobots();
}

const newGoal = ()=>{
  configuration.goal = [];
  makeGoalConf();
  setGoalBlanks();
  loadGoalbots();
}

const displayScore = ()=>{
  document.getElementById("score").innerHTML = `${getScore()}`;
}
