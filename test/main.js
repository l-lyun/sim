import { createTable } from './src/createTable.js';
import {setRobotPosition} from './src/makeSpot.js';
import { globalData } from './src/globalData.js';
import { colorSpot, hazardSpot, predefinedSpot } from './src/checkCoordinate.js';
import { recognitionStart } from './src/recognition.js';
import { postData } from './src/postData.js';

// 지도 생성 누르면 createTable 함수 실행시키는 객체
document.getElementById("createTable").addEventListener("click", createTable);
// 로봇 위치 설정 누르면 초기 로봇 위치 설정 객체
document.getElementById("setRobotPosition").addEventListener("click", function () {
 // 좌표 파싱
  let robotPosition = document 
    .getElementById("robotPositionInput")
    .value.split(",");
    globalData.current_x = parseInt(robotPosition[0]);
    globalData.current_y = parseInt(robotPosition[1]);
    // 로봇 맵에 띄우기
    setRobotPosition(globalData.current_x, globalData.current_y);
  });


  // 아래 다 같은 방식
  // colorblob 추가 누르면 실행되는 객체
  document.getElementById("placeColorblob").addEventListener("click", function () {
    // 좌표 파싱
    let position = document
    .getElementById("colorblobInput")
    .value.split(",");
    // 백에 데이터 보내주기 위한 파싱, 회색 이미지 띄우는 함수
    colorSpot(position);
  });

  // hazard 추가 누르면 실행
  document.getElementById("placeHazard").addEventListener("click", function () {
    // 좌표 파싱
    let position = document
    .getElementById("hazardInput")
    .value.split(",");
    // 백에 데이터 보내주기 위한 파싱, 회색 이미지 띄우는 함수
    hazardSpot(position);
  });
  
  // predefined 추가 누르면 실행
  document.getElementById("placePredefined").addEventListener("click", function () {
    // 좌표 파싱
    let position = document
    .getElementById("predefinedInput")
    .value.split(",");
    // 백에 데이터 보내주기위한 파싱, 회색 이미지 띄우는 함수
    predefinedSpot(position);
  });
  

  
  // 음성 인식 시작 누르면 시작되는 객체
  document.getElementById("recognitionStart").addEventListener("click", function () {
    // 음성 인식 시작
    recognitionStart();
  });
 
  // 로봇 이동 누르면 시작되는 객체 
  // 백에 데이터 post, 결과 바탕 움직임
  document.getElementById("moveButton").addEventListener("click", function () {
    postData();
  });







  
  // function createTable()  {
//   // 행 열 입력
//   rows = document.getElementById("colInput").value;
//   cols = document.getElementById("rowInput").value;

//   // 맵 생성
//   let table = document.createElement("table");
//   for (let i = 0; i < rows; i++) {
//     let tr = document.createElement("tr");
//     for (let j = 0; j < cols; j++) {
//       let td = document.createElement("td");
//       tr.appendChild(td);
//     }
//     table.appendChild(tr);
//   }

//   // 테이블을 div 태그 추가
//   document.getElementById("tableContainer").innerHTML = "";
//   document.getElementById("tableContainer").appendChild(table);
// };

// // let robotPosition;
// let robot = document.getElementById("robot");
// const setRobotPosition = () => {
//   robotPosition = document
//     .getElementById("robotPositionInput")
//     .value.split(",");
//   current_x = parseInt(robotPosition[0]);
//   current_y = parseInt(robotPosition[1]);
//   // 좌표 픽셀로 파싱
//   let top = 50 + rows * 78 - parseInt(robotPosition[1]) * 78;
//   let left = parseInt(robotPosition[0]) * 78 + 30;
//   // robotStartCol = top;
//   // robotStartRow = left;
//   // 초기 위치 픽셀로 찍기
//   robot.style.top = top + "px";
//   robot.style.left = left + "px";
//   robot.style.display = "block";
// };

// let colorblobs = []; // colorblobs array
// let colorBlobs_coordinate = [];
// let colorBlobsParsed = [];



  // setRobotPosition(globalData.current_x, globalData.current_y);


// function newPlaceColorblob(position) {
//   let grayColorblob = document.createElement("img");
//   grayColorblob.className = "item";
//   grayColorblob.src = "./includes/color_gray.png";

//   // 좌표를 픽셀 단위로 변환합니다.
//   let top = 50 + rows * 78 - parseInt(position[1]) * 78;
//   let left = parseInt(position[0]) * 78 + 30;

//   // colorblob의 위치를 설정합니다.
//   grayColorblob.style.top = top + "px";
//   grayColorblob.style.left = left + "px";
//   document.getElementById("tableContainer").appendChild(grayColorblob);

//   colorblobs.push(position);
// }

// function placeColorblob() {
//   let position = document.getElementById("colorblobInput").value.split(",");
//   colorBlobs_coordinate.push(position);
//   colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
//     colorBlobs_coordinate.join(", ")
//   );

//   newPlaceColorblob(position);
// }

//Hazard

// let hazards = []; // hazards array
// let hazards_coordinate = [];
// let hazardsParsed = [];

// function newPlaceHazard(position) {
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

//   // hazards.push(position);
// }

// function placeHazard() {
//   let position = document.getElementById("hazardInput").value.split(",");
//   hazards_coordinate.push(position);
//   hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
//     hazards_coordinate.join(", ")
//   );
//   newPlaceHazard(position);
// }




// let predefindeds = [];
// let predefindeds_coordinate = [];
// let predefindedsParsed = [];
// const placePredefined = () => {
//   // visitCnt++;
//   let position = document.getElementById("predefinedInput").value.split(",");
//   predefindeds_coordinate.push(position);
//   console.log(position);
//   predefindedsParsed = predefindeds_coordinate.map((predefindeds_coordinate) =>
//     predefindeds_coordinate.join(", ")
//   );

//   let graypredefined = document.createElement("img");
//   graypredefined.className = "item";
//   graypredefined.src = "./includes/predefined_gray.png";

//   // 좌표를 픽셀 단위로 변환합니다.
//   let top = 50 + rows * 78 - parseInt(position[1]) * 78;
//   let left = parseInt(position[0]) * 78 + 30;

//   // colorblob의 위치를 설정합니다.
//   graypredefined.style.top = top + "px";
//   graypredefined.style.left = left + "px";
//   document.getElementById("tableContainer").appendChild(graypredefined);

//   predefindeds.push(position);
// };



// document
//   .getElementById("recognitionStop")
//   .addEventListener("click", function () {
//     recognitionStop();
//     // postData();
//   });

// const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
// // 음성 인식 시작 이벤트 리스너
// document
//   .getElementById("recognitionStart")
//   .addEventListener("click", function () {
//     clearInterval(findPathInterval); // gogo 함수 실행 중지

//     recognition.continuous = true;
//     recognition.lang = "ko-KR"; // 언어 설정 (영어)
//     recognition.start();

//     recognition.onresult = function (event) {
//       const result = event.results[0][0].transcript;
//       recognitionParse(result);
//     };
//   });


// function recognitionSpot(recognitionParse) {
//   let position = [recognitionParse[2], recognitionParse[3]];
//   for (let i = 0; i < colorDictionary.length; i++) {
//     if (recognitionParse[0] === colorDictionary[i]) {
//       colorBlobs_coordinate.push(position);
//       // console.log(position);
//       colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
//         colorBlobs_coordinate.join(", ")
//       );
//       newPlaceColorblob(position);
//       return;
//     }
//   }
//   for (let i = 0; i < hazardDictionary.length; i++) {
//     if (recognitionParse[0] === hazardDictionary[i]) {
//       hazards_coordinate.push(position);
//   hazardsParsed = hazards_coordinate.map((hazards_coordinate) =>
//     hazards_coordinate.join(", ")
//   );
//       newPlaceHazard(position);
//       return;
//     }
//   }
// }

// function checkRecognition(recognitionParse) {
//   console.log(recognitionParse);

//   if (recognitionParse.length === 4) {
//     if (isNaN(recognitionParse[2]) || isNaN(recognitionParse[3])) {
//       alert("잘못된 입력입니다.");
//       return;
//     } else {
//       recognitionSpot(recognitionParse);
//     }
//   } else { 
//     alert("잘못된 입력입니다.");
//     // console.log(resultParse);
//   }
// }

// function recognitionParse(result) {
//   let resultParse = [];
//   let resultFinish = [];
//   console.log("result: " + result);
//   for (let i = 0; i < result.length; i++) {
//     if (result[i] !== " ") {
//       resultParse.push(result[i]);
//     }
//   }
//   for (let i = 0; i < digitDictionary.length; i++) {
//     if (resultParse[2] === digitDictionary[i]) {
//       resultParse[2] = String(i);
//     }
//     if (resultParse[3] === digitDictionary[i]) {
//       resultParse[3] = String(i);
//     }
//   }
//   for (let i = 0; i < 4; i++) {
//     resultFinish.push(resultParse[i]);
//   }
//   checkRecognition(resultFinish);
// }


// 결과 이벤트 리스너

// let currentDirection = "E";
// let findPathInterval;
// const direction = ["N", "E", "S", "W"];
// async function postData() {
//   try {
//     const requestPayload = {
//       n: parseInt(cols),
//       m: parseInt(rows),
//       startSpot: `${current_x}, ${current_y}`, // 여기 수정
//       startDirection: currentDirection,
//       hazards: hazardsParsed,
//       colorBlobs: colorBlobsParsed, // 여기 수정
//       endSpot: predefindedsParsed,
//     };
//     console.log(hazardsParsed);
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
//       findPath(finalInfo);
//     } else {
//       console.error("Error during POST Request. HTTP Status:", response.status);
//     }
//   } catch (error) {
//     console.error("Error during POST Request:", error);
//   }
// }


// function findPath(finalInfo) {
//   let i = 0;
  
//   findPathInterval = setInterval(() => {
//     if (i < finalInfo.length) {
//       let row = finalInfo[i][0];
//       let col = finalInfo[i][1];
//       // console.log(parseInt(col));
//       let cu_direction = finalInfo[i][2];
//       let locateColor = finalInfo[i][3];
//       let locateHazard = finalInfo[i][4];
//       let fin = finalInfo[i][5];

//       findHazard(locateHazard);
//       findColor(locateColor);
//       rotate(cu_direction);
//       move(row, col);
//       visitied(fin);
//       i++;
//     } else {
//       alert("탐색 완료!");
//       clearInterval(findPathInterval); // 모든 동작이 완료되면 interval 정지
//     }
//   }, 1500);
// }

// function move(next_row, next_col) {
//   let top = parseInt(robot.style.top);
//   let left = parseInt(robot.style.left);
//   top = top - 78 * (parseInt(next_col) - parseInt(current_y)) + "px";
//   left = left + 78 * (parseInt(next_row) - parseInt(current_x)) + "px";
//   robot.style.left = left;
//   robot.style.top = top;
//   current_x = parseInt(next_row);
//   current_y = parseInt(next_col);
// }
// function rotate(direction) {
//   currentDirection = direction;
//   robot.src = `./includes/robot_${direction}.jpeg`;
// }

// function findColor(locateColor) {
//   if (locateColor.length !== 0) {
//     for (let i = 0; i < locateColor.length; i += 5) {
//       let newColor = document.createElement("img");
//       newColor.className = "item";
//       newColor.src = "./includes/color.png";
//       let top = 50 + rows * 78 - parseInt(locateColor[i + 2]) * 78;
//       let left = parseInt(locateColor[i]) * 78 + 30;
//       newColor.style.top = top + "px";
//       newColor.style.left = left + "px";
//       document.getElementById("tableContainer").appendChild(newColor);
//     }
//   }
// }

// function findHazard(locateHazard) {
//   if (locateHazard.length !== 0) {
//     let newHazard = document.createElement("img");
//     newHazard.className = "item";
//     newHazard.src = "./includes/hazard.png";
//     let top = 50 + rows * 78 - parseInt(locateHazard[2]) * 78;
//     let left = parseInt(locateHazard[0]) * 78 + 30;

//     newHazard.style.top = top + "px";
//     newHazard.style.left = left + "px";
//     document.getElementById("tableContainer").appendChild(newHazard);
//   }
// }

// function visitied(fin) {
//   // console.log(fin);
//   if (fin === "Yes") {
//     let newpredefined = document.createElement("img");
//     newpredefined.className = "item";
//     newpredefined.src = "./includes/predefined.png";
//     let top = 50 + rows * 78 - parseInt(current_y) * 78;
//     let left = parseInt(current_x) * 78 + 30;
//     newpredefined.style.top = top + "px";
//     newpredefined.style.left = left + "px";
//     document.getElementById("tableContainer").appendChild(newpredefined);
//   }
// }
