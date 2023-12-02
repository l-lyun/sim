
import { globalData, coordinates } from "./globalData.js";
export let findPathInterval;

// 경로 탐색 함수
export function findPath(finalInfo) {
  // 백에서 json 길이 체크용 변수
  let i = 0;
  
  // setInterval 함수에 의해 생성된 ID findPathInterval에 저장
  // setInterval 함수는 일정 시간 간격 반복 호출하는 것 담당
  findPathInterval = setInterval(() => {
    // 백에서 json데이터 길이만큼 반복
    if (i < finalInfo.length) {
      // 이동 위치
      let row = finalInfo[i][0];
      let col = finalInfo[i][1];
      // 도는 방향
      let cu_direction = finalInfo[i][2];
      // colorblob 위치
      let locateColor = finalInfo[i][3];
      // hazard 위치
      let locateHazard = finalInfo[i][4];
      // 이동하는 위치가 predefined면 Yes, 아니면 NO
      let fin = finalInfo[i][5];

      // hazard 센서
      findHazard(locateHazard);
      // colorblob 센서
      findColor(locateColor);
      // 회전
      rotate(cu_direction);
      // 이동
      move(row, col);
      // predefined인지
      visitied(fin);
      i++;
    } else { // json 데이터 길이만큼 함수 반복했으면,
      alert("탐색 완료!");
      clearInterval(findPathInterval); // 모든 동작이 완료되면 함수 정지
    }
  }, 1500);
}


// 이동 위치
function move(next_row, next_col) {
  // 로봇 이미지 좌표 파싱해서 옮겨줌
  let top = parseInt(robot.style.top);
  let left = parseInt(robot.style.left);
  top = top - 78 * (parseInt(next_col) - parseInt(globalData.current_y)) + "px";
  left = left + 78 * (parseInt(next_row) - parseInt(globalData.current_x)) + "px";
  robot.style.left = left;
  robot.style.top = top;

  // 전역변수 x, y값 이동하고 바꿔줌
  globalData.current_x = parseInt(next_row);
  globalData.current_y = parseInt(next_col);
}

// 돌기
function rotate(direction) {
  // 전역변수 방향 바꿔줌
  globalData.currentDirection = direction;
  // 돌기
  robot.src = `./includes/robot_${direction}.jpeg`;
}

// colorblob 센서
function findColor(locateColor) {
  // "3, 2 3, 4" 이런식으로 백에서 컬러블롭 위치가 넘어옴, 없으면 빈 문자열
  // 빈 문자열이면 실행 X
  if (locateColor.length !== 0) {
    // "3, 2 3, 4" 이렇게 오니까 5번째마다 컬러블롭 좌표 x값 시작
    for (let i = 0; i < locateColor.length; i += 5) {
      // 이미지 좌표 파싱하고 띄우기
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

// hazard 센서
function findHazard(locateHazard) {
  // hazard는 한개씩밖에 못봐서 있거나 없거나 둘중 하나 있으면 "3, 2" 없으면 빈문자열
  if (locateHazard.length !== 0) {
    // 이미지 좌표 파싱하고 띄우기
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

// 목적지 방문했을 때
function visitied(fin) {
  console.log(coordinates.predefindedsParsed);
  if (fin === "Yes") {
    // 이미지 띄우고 파싱
    let newpredefined = document.createElement("img");
    newpredefined.className = "item";
    newpredefined.src = "./includes/predefined.png";
    let top = 50 + globalData.rows * 78 - parseInt(globalData.current_y) * 78;
    let left = parseInt(globalData.current_x) * 78 + 30;
    newpredefined.style.top = top + "px";
    newpredefined.style.left = left + "px";
    document.getElementById("tableContainer").appendChild(newpredefined);
    coordinates.predefindedsParsed = coordinates.predefindedsParsed.filter(item => item !== `${globalData.current_x}, ${globalData.current_y}`);
  }
}