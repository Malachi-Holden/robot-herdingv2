
const makeGoalConf = ()=>{
  let squaresLocal = [];
  for (let i=0;i<configuration.dimensions.height;i++)
  {
    for (let j=0;j<configuration.dimensions.width;j++)
    {
      squaresLocal.push([i,j]);
    }
  }
  let squaresLeft = configuration.dimensions.height*configuration.dimensions.width;
  for (let key in configuration.robots)
  {
    let oldRobot = configuration.robots[key]
    let randIndex = Math.floor(Math.random()*squaresLeft);
    squaresLeft--;
    let newRow = squaresLocal[randIndex][0];
    let newCol = squaresLocal[randIndex][1];
    let replaceSquare = squaresLocal.pop();
    squaresLocal[randIndex] = replaceSquare;

    newRobot = {
      color: oldRobot.color,
      number: oldRobot.number,
      direction: Math.floor(Math.random()*4)*90,
      row: newRow,
      column: newCol
    };
    configuration.goal[`${newRobot.color[0]}${newRobot.number}`]=newRobot;

  }
  console.log(configuration.goal);
}


const setGoalBlanks = ()=>{
  let board = document.getElementById("goal");
  let rows = board.getElementsByClassName("row");
  [].forEach.call(rows, row=>{
    let cols = row.getElementsByClassName("column");


    [].forEach.call(cols, col=>{
      let content = document.createElement('img');
      content.style.width='100%';
      content.src = "images/blank.jpg";

      while (col.hasChildNodes()) {
          col.removeChild(col.lastChild);
      }
      col.appendChild(content);
    });
  });
}


const addGoalbot = (color, num, direction, rownum, colnum)=>{
  //the direction is some number of degrees clockwise from the starting direction, which is facing right
  let board = document.getElementById("goal");
  let row =board.getElementsByClassName("row")[rownum];
  let col = row.getElementsByClassName("column")[colnum];
  let robot = document.createElement('img');
  robot.style.width="100%";
  robot.src = "images/" + color + `${direction}.jpg`;

  while (col.hasChildNodes()) {
      col.removeChild(col.lastChild);
  }
  col.appendChild(robot);

  let info = document.createElement('h1');
  let numtext = document.createTextNode(`${num}`);
  info.appendChild(numtext);
  col.appendChild(info);

}


const loadGoalbots = ()=>{
  for (let key in configuration.goal)
  {
    let robot = configuration.goal[key];
    addGoalbot(robot.color,robot.number,robot.direction,robot.row,robot.column);
  }
}

const getScore = ()=>{
  let total = 0;
  for (let key in configuration.robots)
  {
    let actualBot = configuration.robots[key];
    let goalBot = configuration.goal[key];
    total += botDistance(actualBot.row, actualBot.column, actualBot.direction, goalBot.row, goalBot.column, goalBot.direction);
  }
  return total;
}

const botDistance = (actualBotRow, actualBotColumn, actualBotDirection, goalBotRow, goalBotColumn, goalBotDirection) =>{
  return Math.abs(actualBotRow - goalBotRow) + Math.abs(actualBotColumn - goalBotColumn) + Math.floor(Math.abs(actualBotDirection - goalBotDirection)/90);
}
