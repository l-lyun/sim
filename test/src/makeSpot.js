import { globalData } from "./globalData.js";

// 맵에 띄우는 함수들 
export function setRobotPosition (current_x, current_y) {
  let top = 50 + globalData.rows * 78 - parseInt(current_y) * 78;
  let left = parseInt(current_x) * 78 + 30;
  // 초기 위치 픽셀로 찍기
  robot.style.top = top + "px";
  robot.style.left = left + "px";
  robot.style.display = "block";
};

// 회색 이미지 띄우는 함수들 

// colorblob 회색
export function newPlaceColorblob(position) {
  let grayColorblob = document.createElement("img");
  grayColorblob.className = "item";
  grayColorblob.src = "./includes/color_gray.png";

  // 좌표를 픽셀 단위로 변환
  let top = 50 + globalData.rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // colorblob의 위치를 설정
  grayColorblob.style.top = top + "px";
  grayColorblob.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(grayColorblob);
}

// hazard 회색
export function newPlaceHazard(position) {
  let grayHazard = document.createElement("img");
  grayHazard.className = "item";
  grayHazard.src = "./includes/hazard_gray.png";

  // 좌표를 픽셀 단위로 변환
  let top = 50 + globalData.rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // hazard의 위치를 설정
  grayHazard.style.top = top + "px";
  grayHazard.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(grayHazard);
}

// 목적지 회색
export function newPlacePredefined(position) {
  let graypredefined = document.createElement("img");
  graypredefined.className = "item";
  graypredefined.src = "./includes/predefined_gray.png";

  // 좌표를 픽셀 단위로 변환
  let top = 50 + globalData.rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // predefined의 위치를 설정
  graypredefined.style.top = top + "px";
  graypredefined.style.left = left + "px";
  document.getElementById("tableContainer").appendChild(graypredefined);
}

