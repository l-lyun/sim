let predefinedVisited = false; // predefined를 방문했는지 여부를 저장하는 변수
let rows;
let cols;
const createTable = () => {
    // 사용자가 입력한 행과 열의 수를 가져옵니다.
    rows = document.getElementById('rowInput').value;
    cols = document.getElementById('colInput').value;

    // 표를 생성합니다.
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // 생성된 표를 'tableContainer' div에 추가합니다.
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(table);
}

const setRobotPosition = () => {
    let robot = document.getElementById('robot');
    let position = document.getElementById('robotPositionInput').value.split(',');

    // 좌표를 픽셀 단위로 변환합니다.
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;
 
    // 로봇의 위치를 설정합니다.
    robot.style.top = top + 'px';
    robot.style.left = left + 'px';
    robot.style.display = 'block';
}

let predefindeds = []; // predefined들을 저장하는 배열

const placeColorblob = () => {
    let position = document.getElementById('colorblobInput').value.split(',');

    // colorblob 이미지를 새로 생성합니다.
    let newColorblob = document.createElement('img');
    newColorblob.className = 'item';
    newColorblob.src = './includes/color.png';

    // 좌표를 픽셀 단위로 변환합니다.
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // colorblob의 위치를 설정합니다.
    newColorblob.style.top = top + 'px';
    newColorblob.style.left = left + 'px';

    // 생성된 colorblob 이미지를 추가합니다.
    document.getElementById('tableContainer').appendChild(newColorblob);
}

const placeHazard = () => {
    let position = document.getElementById('hazardInput').value.split(',');

    // hazard 이미지를 새로 생성합니다.
    let newHazard = document.createElement('img');
    newHazard.className = 'item';
    newHazard.src = './includes/hazard.png';

    // 좌표를 픽셀 단위로 변환합니다.
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // hazard의 위치를 설정합니다.
    newHazard.style.top = top + 'px';
    newHazard.style.left = left + 'px';

    // 생성된 hazard 이미지를 추가합니다.
    document.getElementById('tableContainer').appendChild(newHazard);
}

const placePredefined = () => {
    let position = document.getElementById('predefinedInput').value.split(',');

    // predefined 이미지를 새로 생성합니다.
    let newPredefined = document.createElement('img');
    newPredefined.className = 'item';
    newPredefined.src = './includes/predefined.png';

    // 좌표를 픽셀 단위로 변환합니다.
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // predefined의 위치를 설정합니다.
    newPredefined.style.top = top + 'px';
    newPredefined.style.left = left + 'px';

    // 방문 여부를 저장하는 속성을 추가합니다.
    newPredefined.dataset.visited = 'false';

    // 생성된 predefined 이미지를 추가합니다.
    document.getElementById('tableContainer').appendChild(newPredefined);

    // predefindeds 배열에 추가합니다.
    predefindeds.push(newPredefined);
}

let currentDirection = 90;
const moveRobot = () => {
    // 로봇 이미지를 선택합니다.
    let robot = document.getElementById('robot');

    // 사용자가 입력한 방향을 가져옵니다.
    let targetDirection = document.getElementById('directionInput').value.toUpperCase();

    // 현재 로봇의 위치를 가져옵니다.
    let top = parseInt(robot.style.top) || 50;
    let left = parseInt(robot.style.left) || 30;

    // 방향에 따라 로봇을 이동시킵니다.
    // 여기서는 한번에 30픽셀 이동하도록 설정했습니다.
    switch (targetDirection) {
        case 'N':
            // // while(currentDirection % 360 != 0) {
            // //   robot.style.transform = `rotate(90deg)`;
            //   currentDirection += 90;
            // }
            robot.style.top = (top - 78) + 'px';
            break;
        case 'E':
            robot.style.left = (left + 78) + 'px';
            break;
        case 'W':
            robot.style.left = (left - 78) + 'px';
            break;
        case 'S':
            robot.style.top = (top + 78) + 'px';
            break;
    }

   // 움직인 후에 predefined를 방문했는지 확인합니다.
   isVisitedPredefined();

   // predefined를 방문했는지 확인하고, 모두 방문했다면 알림을 띄웁니다.
   if (!predefinedVisited && isVisitedAllPredefindeds()) {
       alert('탐색 완료!');
       predefinedVisited = true;
   }
}

const isVisitedAllPredefindeds = () => {
  // 모든 predefined가 방문되었는지 검사합니다.
  for (let predefined of predefindeds) {
      if (predefined.dataset.visited === 'false') {
          return false;
      }
  }
  return true;
}

const isVisitedPredefined = () => {
  let robot = document.getElementById('robot');

  // 로봇과 모든 predefined의 위치가 겹치는지 확인합니다.
  let robotTop = parseInt(robot.style.top) || 0;
  let robotLeft = parseInt(robot.style.left) || 0;

  for (let predefined of predefindeds) {
      let predefinedTop = parseInt(predefined.style.top) || 0;
      let predefinedLeft = parseInt(predefined.style.left) || 0;

      if (robotTop === predefinedTop && robotLeft === predefinedLeft) {
          // 방문한 predefined의 방문 여부를 true로 설정합니다.
          predefined.dataset.visited = 'true';
          return true;
      }
  }
  return false;
}