let predefinedVisited = false; // predefined를 방문했는지 여부를 저장하는 변수
let rows;
let cols;
const createTable = () => {
    // 행 열 입력
    rows = document.getElementById('rowInput').value;
    cols = document.getElementById('colInput').value;

    // 맵 생성
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    // 테이블을 div 태그 추가
    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(table);
}

const setRobotPosition = () => {
    let robot = document.getElementById('robot');
    let position = document.getElementById('robotPositionInput').value.split(',');

    // 좌표 픽셀로 파싱
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;
 
    // 초기 위치 픽셀로 찍기
    robot.style.top = top + 'px';
    robot.style.left = left + 'px';
    robot.style.display = 'block';
}

let colorblobs = []; // colorblobs array

const placeColorblob = () => {
    let position = document.getElementById('colorblobInput').value.split(',');

    // colorblob 생성
    let newColorblob = document.createElement('img');
    newColorblob.className = 'item';
    newColorblob.src = './includes/color.png';

    // 좌표 픽셀로 파싱
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // colorblob의 위치 설정
    newColorblob.style.top = top + 'px';
    newColorblob.style.left = left + 'px';

    // colorblob image 추가
    document.getElementById('tableContainer').appendChild(newColorblob);
    colorblobs.push(newColorblob);
}

let hazards = []; // hazards array

const placeHazard = () => {
    let position = document.getElementById('hazardInput').value.split(',');

    // hazard 생성
    let newHazard = document.createElement('img');
    newHazard.className = 'item';
    newHazard.src = './includes/hazard.png';

    // 좌표를 픽셀로 파싱
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // hazard의 위치를 설정
    newHazard.style.top = top + 'px';
    newHazard.style.left = left + 'px';

    // hazard image 추가
    document.getElementById('tableContainer').appendChild(newHazard);
    hazards.push(newHazard);
}
let predefindeds =[];
const placePredefined = () => {
    let position = document.getElementById('predefinedInput').value.split(',');

    // predefined 생성
    let newPredefined = document.createElement('img');
    newPredefined.className = 'item';
    newPredefined.src = './includes/predefined.png';

    // 좌표 픽셀로 파싱
    let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
    let left = parseInt(position[0]) * 78 + 30;

    // predefined의 위치를 설정
    newPredefined.style.top = top + 'px';
    newPredefined.style.left = left + 'px';

    // 지나갔는지 확인
    newPredefined.dataset.visited = 'false';

    // predefined image 추가
    document.getElementById('tableContainer').appendChild(newPredefined);
    predefindeds.push(newPredefined);
}

let currentDirection = 'E';
const direction = ['N', 'E', 'S', 'W'];
const moveRobot = () => {
    // console.log(currentDirection);
    let robot = document.getElementById('robot');
    let targetDirection = document.getElementById('directionInput').value.toUpperCase();
    let top = parseInt(robot.style.top) || 50;
    let left = parseInt(robot.style.left) || 30;
    let toMove = (direction.indexOf(targetDirection) - direction.indexOf(currentDirection) + 4) % 4;
    // changeImage();
    // function changeImage() {
    //     robot.src = `./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`;
    //     console.log(`./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`);
    // }
    
    for(let i = 1; i <= toMove; i++) {
        setTimeout(function() {
            robot.src = `./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`;
        }, 500 * i);
        console.log(`./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`);
    }
    // await rotateRobot(toMove * 90); // 비동기로 회전 적용

    switch (targetDirection) {
        case 'N':
            robot.style.top = (top - 78) + 'px';
            // robot.src = './includes/robot_N.png';
            break;
        case 'E':
            robot.style.left = (left + 78) + 'px';
            // robot.src = './includes/robot_E.png';
            break;
        case 'W':
            robot.style.left = (left - 78) + 'px';
            // robot.src = './includes/robot_W.png';
            break;
        case 'S':
            robot.style.top = (top + 78) + 'px';
            // robot.src = './includes/robot_S.png';
            break;
    }

    currentDirection = targetDirection;
    console.log(currentDirection);
    isVisitedPredefined();

    if (!predefinedVisited && isVisitedAllPredefindeds()) {
        alert('탐색 완료!');
        predefinedVisited = true;
    }
};

// const rotateRobot = (totalAngle) => {
    // return new Promise((resolve) => {
    //     let robot = document.getElementById('robot');
    //     let currentAngle = 0;

    //     const rotateStep = () => {
    //         if (currentAngle < totalAngle) {
    //             currentAngle += 10; // 10도씩 회전
    //             robot.style.transform = `rotate(${currentAngle}deg)`;
    //             setTimeout(rotateStep, 10); // 10ms 간격으로 회전
    //         } else {
    //             resolve();
    //         }
    //     };

    //     rotateStep();
    // });
// };

const isVisitedAllPredefindeds = () => {
  // 모든 predefined 방문
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