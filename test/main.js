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
let colorBlobsParsed = [];

function newPlaceColorblob(position) {
  let grayColorblob = document.createElement("img");
  grayColorblob.className = "item";
  grayColorblob.src = "./includes/color_gray.png";

  // 좌표를 픽셀 단위로 변환합니다.
  let top = 50 + rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // colorblob의 위치를 설정합니다.
  grayColorblob.style.top = top + "px";
  grayColorblob.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(grayColorblob);

  colorblobs.push(position);
}

function placeColorblob() {
  let position = document.getElementById("colorblobInput").value.split(",");
  colorBlobs_coordinate.push(position);
  colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
    colorBlobs_coordinate.join(", ")
  );

  newPlaceColorblob(position);
}

//Hazard

let hazards = []; // hazards array
let hazards_coordinate = [];
let hazardsParsed = [];

function newPlaceHazard(position) {
  let grayHazard = document.createElement("img");
  grayHazard.className = "item";
  grayHazard.src = "./includes/hazard_gray.png";

  // 좌표를 픽셀 단위로 변환합니다.
  let top = 50 + rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // colorblob의 위치를 설정합니다.
  grayHazard.style.top = top + "px";
  grayHazard.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(grayHazard);

  hazards.push(position);
}

function placeHazard() {
  let position = document.getElementById("hazardInput").value.split(",");
  hazards_coordinate.push(position);
  hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
    hazards_coordinate.join(", ")
  );
  newPlaceHazard(position);
}

// const placeHazard = () => {
//   let position = document.getElementById("hazardInput").value.split(",");
//   hazards_coordinate.push(position);
//   hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
//     hazards_coordinate.join(", ")
//   );

//   let grayHazard = document.createElement("img");
//   grayHazard.className = "item";
//   grayHazard.src = "./includes/hazard_gray.png";

//   // 좌표를 픽셀 단위로 변환합니다.
//   let top = 50 + rows * 78 - parseInt(position[1]) * 78;
//   let left = parseInt(position[0]) * 78 + 30;

//   // colorblob의 위치를 설정합니다.
//   grayHazard.style.top = top + "px";
//   grayHazard.style.left = left + "px";
//   document.getElementById("tableContainer").appendChild(grayHazard);

//   hazards.push(position);
// };

let predefindeds = [];
let predefindeds_coordinate = [];
let predefindedsParsed = [];
const placePredefined = () => {
  let position = document.getElementById("predefinedInput").value.split(",");
  predefindeds_coordinate.push(position);
  console.log(position);
  predefindedsParsed = predefindeds_coordinate.map((predefindeds_coordinate) =>
    predefindeds_coordinate.join(", ")
  );

  let graypredefined = document.createElement("img");
  graypredefined.className = "item";
  graypredefined.src = "./includes/predefined_gray.png";

  // 좌표를 픽셀 단위로 변환합니다.
  let top = 50 + rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // colorblob의 위치를 설정합니다.
  graypredefined.style.top = top + "px";
  graypredefined.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(graypredefined);

  predefindeds.push(position);
};

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
// 음성 인식 시작 이벤트 리스너
document
  .getElementById("recognitionStart")
  .addEventListener("click", function () {
    clearInterval(gogoInterval); // gogo 함수 실행 중지

    recognition.continuous = true;
    recognition.lang = "ko-KR"; // 언어 설정 (영어)
    recognition.start();

    recognition.onresult = function (event) {
      const result = event.results[0][0].transcript;
      recognitionParse(result);
      // console.log(result);
      // console.log(result[0]);
      // console.log(result[1]);
      // console.log(result[2]);
      // console.log(result[3]);
      // console.log(result[4]);
      // console.log(result.length);
    };
  });

colorDictionary = ["중", "종", "정", "죵", "즁"];

hazardDictionary = ["위", "이"];

digitDictionary = [
  "영",
  "일",
  "이",
  "삼",
  "사",
  "오",
  "육",
  "칠",
  "팔",
  "구",
  "십",
];

function recognitionSpot(recognitionParse) {
  let position = [recognitionParse[2], recognitionParse[3]];
  for (let i = 0; i < colorDictionary.length; i++) {
    if (recognitionParse[0] === colorDictionary[i]) {
      colorBlobs_coordinate.push(position);
      // console.log(position);
      colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
        colorBlobs_coordinate.join(", ")
      );
      newPlaceColorblob(position);
      return;
    }
  }
  for (let i = 0; i < hazardDictionary.length; i++) {
    if (recognitionParse[0] === hazardDictionary[i]) {
      hazards_coordinate.push(position);
  hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
    hazards_coordinate.join(", ")
  );
      newPlaceHazard(position);
      return;
    }
  }
}

function checkRecognition(recognitionParse) {
  console.log(recognitionParse);

  if (recognitionParse.length === 4) {
    if (isNaN(recognitionParse[2]) || isNaN(recognitionParse[3])) {
      alert("잘못된 입력입니다.");
      return;
    } else {
      recognitionSpot(recognitionParse);
    }
  } else { 
    alert("잘못된 입력입니다.");
    // console.log(resultParse);
  }
}

function recognitionParse(result) {
  let resultParse = [];
  console.log("result: " + result);
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== " ") {
      resultParse.push(result[i]);
    }
  }
  for (let i = 0; i < digitDictionary.length; i++) {
    if (resultParse[2] === digitDictionary[i]) {
      resultParse[2] = String(i);
    }
    if (resultParse[3] === digitDictionary[i]) {
      resultParse[3] = String(i);
    }
  }
  checkRecognition(resultParse);
}

document
  .getElementById("recognitionStop")
  .addEventListener("click", function () {
    recognition.stop();
    // postData();
  });
// 결과 이벤트 리스너

let currentDirection = "E";
let gogoInterval;
const direction = ["N", "E", "S", "W"];
async function postData() {
  try {
    const requestPayload = {
      n: parseInt(cols),
      m: parseInt(rows),
      startSpot: `${current_x}, ${current_y}`, // 여기 수정
      startDirection: currentDirection,
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
    console.log(hazardsParsed);
    console.log(JSON.stringify(requestPayload));
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
      startGogo(finalInfo);
    } else {
      console.error("Error during POST Request. HTTP Status:", response.status);
    }
  } catch (error) {
    console.error("Error during POST Request:", error);
  }
}
document.getElementById("moveButton").addEventListener("click", postData);

// document.getElementById("moveButton").addEventListener("click", async () => {
//   try {
//     const requestPayload = {
//       n: parseInt(cols),
//       m: parseInt(rows),
//       startSpot: `${robotPosition[0]}, ${robotPosition[1]}`, // 여기 수정
//       startDirection: currentDirection,
//       hazards: hazardsParsed,
//       colorBlobs: colorBlobsParsed, // 여기 수정
//       endSpot: predefindedsParsed,
//       // "n": 6,
//       // "m": 5,
//       // "startSpot": "0, 0",
//       // "startDirection": "N",
//       // "hazards": ["3, 3", "3, 2", "1, 2"],
//       // "colorBlobs": ["4, 3", "2, 2"],
//       // "endSpot": ["3, 4", "0, 1"]
//     };
//     console.log(JSON.stringify(requestPayload));
//     const response = await fetch("http://localhost:8080/robot/move", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestPayload),
//     });

//     if (response.ok) {
//       // 서버에서 받은 데이터 활용 예시
//       const responseData = await response.json();
//       const finalInfo = responseData.finalInfo;
//       console.log(finalInfo);
//       // 예시: finalInfo 데이터를 콘솔에 출력
//       // finalInfo.forEach(info => {
//       //   console.log('Info:', info);
//       // });

//       // 원하는 작업 수행
//       // ...
//       startGogo(finalInfo);
//     } else {
//       console.error("Error during POST Request. HTTP Status:", response.status);
//     }
//   } catch (error) {
//     console.error("Error during POST Request:", error);
//   }
// });
// document.getElementById("recognitionStart").addEventListener("click", () => {
//   clearInterval(intervalId); // 추가된 부분: gogo 함수 실행 중지
// });

function startGogo(finalInfo) {
  let i = 0;
  gogoInterval = setInterval(() => {
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
      clearInterval(gogoInterval); // 모든 동작이 완료되면 interval 정지
    }
  }, 1000);
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
  currentDirection = direction;
  robot.src = `./includes/robot_${direction}.jpeg`;
}

function findColor(locateColor) {
  if (locateColor.length !== 0) {
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
  if (locateHazard.length !== 0) {
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
    let newpredefined = document.createElement("img");
    newpredefined.className = "item";
    newpredefined.src = "./includes/predefined.png";
    let top = 50 + rows * 78 - parseInt(current_y) * 78;
    let left = parseInt(current_x) * 78 + 30;
    newpredefined.style.top = top + "px";
    newpredefined.style.left = left + "px";
    document.getElementById("tableContainer").appendChild(newpredefined);
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
