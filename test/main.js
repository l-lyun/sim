let predefinedVisited = false; // predefined를 방문했는지 여부를 저장하는 변수
let rows;
let cols;
let robotStartCol;
let robotStartRow;
let current_x;
let current_y;
const createTable = () => {
  // 행 열 입력
  rows = document.getElementById("colInput").value;
  cols = document.getElementById("rowInput").value;

  // 맵 생성
  let table = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  // 테이블을 div 태그 추가
  document.getElementById("tableContainer").innerHTML = "";
  document.getElementById("tableContainer").appendChild(table);
};

let robotPosition;
let robot = document.getElementById("robot");
const setRobotPosition = () => {
  robotPosition = document
    .getElementById("robotPositionInput")
    .value.split(",");
  // console.log("set_robot");
  current_x = parseInt(robotPosition[0]);
  current_y = parseInt(robotPosition[1]);
  // console.log("1_x: " + current_x);
  // console.log("1_y: " + current_y);
  // 좌표 픽셀로 파싱
  let top = 50 + rows * 78 - parseInt(robotPosition[1]) * 78;
  let left = parseInt(robotPosition[0]) * 78 + 30;
  robotStartCol = top;
  robotStartRow = left;
  // 초기 위치 픽셀로 찍기
  robot.style.top = top + "px";
  robot.style.left = left + "px";
  robot.style.display = "block";
};

let colorblobs = []; // colorblobs array
let colorBlobs_coordinate = [];
let colorBlobsParsed;
const placeColorblob = () => {
  let position = document.getElementById("colorblobInput").value.split(",");
  colorBlobs_coordinate.push(position);
  colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
    colorBlobs_coordinate.join(", ")
  );
  // // colorblob 생성
  // let newColorblob = document.createElement('img');
  // newColorblob.className = 'item';
  // newColorblob.src = './includes/color.png';

  // // 좌표 픽셀로 파싱
  // let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
  // let left = parseInt(position[0]) * 78 + 30;

  // // colorblob의 위치 설정
  // newColorblob.style.top = top + 'px';
  // newColorblob.style.left = left + 'px';

  // // colorblob image 추가
  // document.getElementById('tableContainer').appendChild(newColorblob);
  colorblobs.push(position);
};

let hazards = []; // hazards array
let hazards_coordinate = [];
let hazardsParsed;
const placeHazard = () => {
  let position = document.getElementById("hazardInput").value.split(",");
  hazards_coordinate.push(position);
  hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
    hazards_coordinate.join(", ")
  );
  // hazard 생성
  // let newHazard = document.createElement('img');
  // newHazard.className = 'item';
  // newHazard.src = './includes/hazard.png';

  // // 좌표를 픽셀로 파싱
  // let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
  // let left = parseInt(position[0]) * 78 + 30;

  // // hazard의 위치를 설정
  // newHazard.style.top = top + 'px';
  // newHazard.style.left = left + 'px';

  // hazard image 추가
  // document.getElementById('tableContainer').appendChild(newHazard);
  hazards.push(position);
};
let predefindeds = [];
let predefindeds_coordinate = [];
let predefindedsParsed;
const placePredefined = () => {
  let position = document.getElementById("predefinedInput").value.split(",");
  predefindeds_coordinate.push(position);
  predefindedsParsed = predefindeds_coordinate.map((predefindeds_coordinate) =>
    predefindeds_coordinate.join(", ")
  );
  // .value.split(',')
  // predefined 생성
  // let newPredefined = document.createElement('img');
  // newPredefined.className = 'item';
  // newPredefined.src = './includes/predefined.png';

  // // 좌표 픽셀로 파싱
  // let top =  (50 + ( rows * 78)) - parseInt(position[1]) * 78;
  // let left = parseInt(position[0]) * 78 + 30;

  // // predefined의 위치를 설정
  // newPredefined.style.top = top + 'px';
  // newPredefined.style.left = left + 'px';

  // 지나갔는지 확인
  // newPredefined.dataset.visited = 'false';

  // predefined image 추가
  // document.getElementById('tableContainer').appendChild(newPredefined);
  predefindeds.push(position);
};

let currentDirection = "E";
const direction = ["N", "E", "S", "W"];
document.getElementById("moveButton").addEventListener("click", async () => {
  try {
    const requestPayload = {
      n: parseInt(cols),
      m: parseInt(rows),
      startSpot: `${robotPosition[0]}, ${robotPosition[1]}`, // 여기 수정
      startDirection: "E",
      hazards: hazardsParsed,
      colorBlobs: colorBlobsParsed, // 여기 수정
      endSpot: predefindedsParsed,
      // "n": 6,
      // "m": 5,
      // "startSpot": "0, 0",
      // "startDirection": "N",
      // "hazards": ["3, 3", "3, 2", "1, 2"],
      // "colorBlobs": ["4, 3", "2, 2"],
      // "endSpot": ["3, 4", "0, 1"]
    };
    // {"n":6,"m":5,"startSpot":"0, 0","startDirection":"N","hazards":["3, 3","3, 2","1, 2"],"colorBlobs":["4, 3","2, 2"],"endSpot":["3, 4","0, 1"]} 기찬 양식 복사
    // {"n":4,"m":4,"startSpot":"1, 2","startDirection":"E","hazards":["3, 3"],"colorBlobs":["2, 2"],"endSpot":["4, 4"]} 내가 보낸 값
    // {"n":4,"m":4,"startSpot":"2, 1","startDirection":"E","hazards":["3, 3"],"colorBlobs":["2, 2"],"endSpot":["4, 4"]}
    // {"n":4,"m":4,"startSpot":"2,  1","startDirection":"E","hazards":["3, 3"],"colorBlobs":["2, 2"],"endSpot":["4, 4"]}
    console.log(JSON.stringify(requestPayload));
    // console.log(colorblobs[0]);
    //   console.log(hazards);
    const response = await fetch("http://localhost:8080/robot/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (response.ok) {
      // 서버에서 받은 데이터 활용 예시
      const responseData = await response.json();
      const finalInfo = responseData.finalInfo;
      console.log(finalInfo);
      // 예시: finalInfo 데이터를 콘솔에 출력
      // finalInfo.forEach(info => {
      //   console.log('Info:', info);
      // });

      // 원하는 작업 수행
      // ...
      gogo(finalInfo);
    } else {
      console.error("Error during POST Request. HTTP Status:", response.status);
    }
  } catch (error) {
    console.error("Error during POST Request:", error);
  }
});

function gogo(finalInfo) {
  for (let i = 0; i < finalInfo.length; i++) {
    let row = finalInfo[i][0];
    let col = finalInfo[i][1];
    // console.log(parseInt(col));
    let cu_direction = finalInfo[i][2];
    let locateColor = finalInfo[i][3];
    let locateHazard = finalInfo[i][4];
    let fin = finalInfo[i][5];

    // 각 함수를 일정한 간격으로 실행
    setTimeout(() => {
      findHazard(locateHazard);
      findColor(locateColor);
      rotate(cu_direction);
      move(row, col);
      visitied(fin);
    }, i * 1000); // i번째 함수를 실행하기 전에 1000ms (1초) 간격을 두고 실행
  }
}
// let row = finalInfo[0][0];
// console.log(parseInt(row));
// let col = finalInfo[1];
// let cu_direction = finalInfo[2];
// let locateHazard = finalInfo[4];
// let fin = finalInfo[5];
// visitied(fin);
// findHazard(locateHazard);
// rotate(cu_direction);
// move(row, col);

function move(next_row, next_col) {
  let top = parseInt(robot.style.top);
  let left = parseInt(robot.style.left);
  top = top - 78 * (parseInt(next_col) - parseInt(current_y)) + "px";
  left = left + 78 * (parseInt(next_row) - parseInt(current_x)) + "px";
  robot.style.left = left;
  robot.style.top = top;
  current_x = parseInt(next_row);
  current_y = parseInt(next_col);
}
function rotate(direction) {
  robot.src = `./includes/robot_${direction}.jpeg`;
}

function findColor(locateColor) {
  if (locateColor.length !== "") {
    for (let i = 0; i < locateColor.length; i += 5) {
      let newColor = document.createElement("img");
      newColor.className = "item";
      newColor.src = "./includes/color.png";
      let top = 50 + rows * 78 - parseInt(locateColor[i + 2]) * 78;
      let left = parseInt(locateColor[i]) * 78 + 30;
      newColor.style.top = top + "px";
      newColor.style.left = left + "px";
      document.getElementById("tableContainer").appendChild(newColor);
    }
  }
}
function findHazard(locateHazard) {
  if (locateHazard.length !== "") {
    let newHazard = document.createElement("img");
    newHazard.className = "item";
    newHazard.src = "./includes/hazard.png";
    let top = 50 + rows * 78 - parseInt(locateHazard[2]) * 78;
    let left = parseInt(locateHazard[0]) * 78 + 30;

    newHazard.style.top = top + "px";
    newHazard.style.left = left + "px";
    document.getElementById("tableContainer").appendChild(newHazard);
  }
}

function visitied(fin) {
  // console.log(fin);
  if (fin === "Yes") {
    alert("탐색 완료!");
  }
}

// }
// const moveRobot = () => {
//     // console.log(currentDirection);
//     // let robot = document.getElementById('robot');
//     // let targetDirection = document.getElementById('directionInput').value.toUpperCase();
//     let top = parseInt(robot.style.top) || 50;
//     let left = parseInt(robot.style.left) || 30;
//     // let toMove = (direction.indexOf(targetDirection) - direction.indexOf(currentDirection) + 4) % 4;
//     // changeImage();
//     // function changeImage() {
//     //     robot.src = `./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`;
//     //     console.log(`./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.png`);
//     // }

//     // for(let i = 1; i <= toMove; i++) {
//     //     robot.src = `./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.jpeg`;
//     //     console.log(`./includes/robot_${direction[(direction.indexOf(currentDirection) + i) % 4]}.jpeg`);
//     // }
//     // await rotateRobot(toMove * 90); // 비동기로 회전 적용

//     switch (targetDirection) {
//         case 'N':
//             robot.style.top = (top - 78) + 'px';
//             // robot.src = './includes/robot_N.png';
//             break;
//         case 'E':
//             robot.style.left = (left + 78) + 'px';
//             // robot.src = './includes/robot_E.png';
//             break;
//         case 'W':
//             robot.style.left = (left - 78) + 'px';
//             // robot.src = './includes/robot_W.png';
//             break;
//         case 'S':
//             robot.style.top = (top + 78) + 'px';
//             // robot.src = './includes/robot_S.png';
//             break;
//     }

//     currentDirection = targetDirection;
//     console.log(currentDirection);
//     isVisitedPredefined();

//     if (!predefinedVisited && isVisitedAllPredefindeds()) {
//         alert('탐색 완료!');
//         predefinedVisited = true;
//     }
// };

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

// const isVisitedAllPredefindeds = () => {
//   // 모든 predefined 방문
//   for (let predefined of predefindeds) {
//       if (predefined.dataset.visited === 'false') {
//           return false;
//       }
//   }
//   return true;
// }

// const isVisitedPredefined = () => {
//   let robot = document.getElementById('robot');

//   // 로봇과 모든 predefined의 위치가 겹치는지 확인합니다.
//   let robotTop = parseInt(robot.style.top) || 0;
//   let robotLeft = parseInt(robot.style.left) || 0;

//   for (let predefined of predefindeds) {
//       let predefinedTop = parseInt(predefined.style.top) || 0;
//       let predefinedLeft = parseInt(predefined.style.left) || 0;

//       if (robotTop === predefinedTop && robotLeft === predefinedLeft) {
//           // 방문한 predefined의 방문 여부를 true로 설정합니다.
//           predefined.dataset.visited = 'true';
//           return true;
//       }
//   }
//   return false;
// }
