
const setup = ()=>{

  let oldConfig = getCookie("config");
  if (oldConfig)
  {
    configuration = JSON.parse(oldConfig);
  }
  else
  {
    configuration = JSON.parse(JSON.stringify(startConf));
    makeGoalConf();
    for(let i=0;i<configuration.dimensions.height;i++)
      {
        let row = [];
        for(let j=0;j<configuration.dimensions.width;j++)
        {
          row.push(0);
        }
        configuration.squares.push(row);
      }
  }

  setBlanks();
  loadRobots();

  setGoalBlanks();
  loadGoalbots();

  document.getElementById("score").innerHTML = `${getScore()}`;
}

const setBlanks = ()=>{
  let board = document.getElementById("board");
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


const addRobot = (color, num, direction, rownum, colnum)=>{
  //the direction is some number of degrees clockwise from the starting direction, which is facing right
  let board = document.getElementById("board");
  let row =board.getElementsByClassName("row")[rownum];
  let col = row.getElementsByClassName("column")[colnum];
  let robot = document.createElement('img');
  robot.style.width="100%";
  robot.src = "images/" + color +`${direction}.jpg`;

  while (col.hasChildNodes()) {
      col.removeChild(col.lastChild);
  }
  col.appendChild(robot);

  let info = document.createElement('h1');
  let numtext = document.createTextNode(`${num}`);
  info.appendChild(numtext);
  col.appendChild(info);

  configuration.squares[rownum][colnum] = 1;

}

const loadRobots = ()=>{
  for (let key in configuration.robots)
  {
    let robot = configuration.robots[key];
    addRobot(robot.color,robot.number,robot.direction,robot.row,robot.column);
  }

  let save = JSON.stringify(configuration)
  setCookie("config",save);
}

const rotateRobots = (color, num, degrees)=>{
  for (let key in configuration.robots)
  {
    let robot = configuration.robots[key];
    if ((robot.color === color)||robot.number===num)
    {
      robot.direction=(robot.direction+degrees)%360;
    }
  }

  setBlanks();
  loadRobots();
};

const findSquareToMove = (currentrow, currentcol, direction, squares)=>{
  let rowstep;
  let colstep;
  switch(direction%360)
  {
    case 0:
      rowstep=0;
      colstep=1;
      break;
    case 90:
      rowstep=1;
      colstep=0;
      break;
    case 180:
      rowstep=0;
      colstep=-1;
      break;
    case 270:
      rowstep=-1;
      colstep=0;
  }
  do
  {
    currentcol += colstep;
    currentrow += rowstep;
    if ((currentcol<0)||(currentcol>=configuration.dimensions.width)||(currentrow<0)||(currentrow>=configuration.dimensions.height))
    {
      break;
    }
    squares--;
  }while ((configuration.squares[currentrow][currentcol]===0)&&(squares>0));
  return [currentrow-rowstep, currentcol-colstep];
}

const moveRobots = (color, num, squares)=>{
  for (let key in configuration.robots)
  {
    let robot = configuration.robots[key];
    if ((robot.color !== color)&&(robot.number!==num))
    {
      continue;
    }
    let locationPair = findSquareToMove(robot.row, robot.column,robot.direction,squares+1);
    configuration.squares[robot.row][robot.column]=0;
    configuration.robots[key].row = locationPair[0];
    configuration.robots[key].column = locationPair[1];
    configuration.squares[robot.row][robot.column]=1;
  }
  setBlanks("board");
  loadRobots("board");
}

const setCookie = (cname, cvalue, exdays)=> {
  //taken from w3schools
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";path=/";
}

const getCookie= (cname)=> {
  //taken from w3schools
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
