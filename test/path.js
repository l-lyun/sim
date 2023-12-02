
import { globalData } from "./globalData.js";
export let findPathInterval;

export function findPath(finalInfo) {
  let i = 0;
  
  findPathInterval = setInterval(() => {
    if (i < finalInfo.length) {
      let row = finalInfo[i][0];
      let col = finalInfo[i][1];
      // console.log(parseInt(col));
      let cu_direction = finalInfo[i][2];
      let locateColor = finalInfo[i][3];
      let locateHazard = finalInfo[i][4];
      let fin = finalInfo[i][5];

      findHazard(locateHazard);
      findColor(locateColor);
      rotate(cu_direction);
      move(row, col);
      visitied(fin);
      i++;
    } else {
      alert("탐색 완료!");
      clearInterval(findPathInterval); // 모든 동작이 완료되면 interval 정지
    }
  }, 1500);
}


function move(next_row, next_col) {
  let top = parseInt(robot.style.top);
  let left = parseInt(robot.style.left);
  top = top - 78 * (parseInt(next_col) - parseInt(globalData.current_y)) + "px";
  left = left + 78 * (parseInt(next_row) - parseInt(globalData.current_x)) + "px";
  robot.style.left = left;
  robot.style.top = top;
  globalData.current_x = parseInt(next_row);
  globalData.current_y = parseInt(next_col);
}
function rotate(direction) {
  globalData.currentDirection = direction;
  robot.src = `./includes/robot_${direction}.jpeg`;
}

function findColor(locateColor) {
  if (locateColor.length !== 0) {
    for (let i = 0; i < locateColor.length; i += 5) {
      let newColor = document.createElement("img");
      newColor.className = "item";
      newColor.src = "./includes/color.png";
      let top = 50 + globalData.rows * 78 - parseInt(locateColor[i + 2]) * 78;
      let left = parseInt(locateColor[i]) * 78 + 30;
      newColor.style.top = top + "px";
      newColor.style.left = left + "px";
      document.getElementById("tableContainer").appendChild(newColor);
    }
  }
}

function findHazard(locateHazard) {
  if (locateHazard.length !== 0) {
    let newHazard = document.createElement("img");
    newHazard.className = "item";
    newHazard.src = "./includes/hazard.png";
    let top = 50 + globalData.rows * 78 - parseInt(locateHazard[2]) * 78;
    let left = parseInt(locateHazard[0]) * 78 + 30;

    newHazard.style.top = top + "px";
    newHazard.style.left = left + "px";
    document.getElementById("tableContainer").appendChild(newHazard);
  }
}

function visitied(fin) {
  // console.log(fin);
  if (fin === "Yes") {
    let newpredefined = document.createElement("img");
    newpredefined.className = "item";
    newpredefined.src = "./includes/predefined.png";
    let top = 50 + globalData.rows * 78 - parseInt(globalData.current_y) * 78;
    let left = parseInt(globalData.current_x) * 78 + 30;
    newpredefined.style.top = top + "px";
    newpredefined.style.left = left + "px";
    document.getElementById("tableContainer").appendChild(newpredefined);
  }
}