import { globalData } from "./globalData.js";

// 맵에 지점 띄우기 담당 함수
export function createAndPositionItem(src, position) {
  // Create a new item (e.g., colorblob, hazard, predefined)
  let item = document.createElement("img");
  item.className = "item";
  item.src = src;

  // Convert coordinates to pixel units
  let top = 50 + globalData.rows * 78 - parseInt(position[1]) * 78;
  let left = parseInt(position[0]) * 78 + 30;

  // Set the item's position
  item.style.top = top + "px";
  item.style.left = left + "px";

  // Append the item to the table container
  document.getElementById("tableContainer").appendChild(item);
}

// 초기 로봇 지점 설정
export function setRobotPosition(current_x, current_y) {
  // Convert coordinates to pixel units
  let top = 50 + globalData.rows * 78 - parseInt(current_y) * 78;
  let left = parseInt(current_x) * 78 + 30;

  // Set the robot's position
  robot.style.top = top + "px";
  robot.style.left = left + "px";
  robot.style.display = "block";
}

// 컬러블롭 맵에 띄우기
export function newPlaceColorblob(position) {
  createAndPositionItem("./includes/color_gray.png", position);
} 

// 위험지역 맵에 띄우기
export function newPlaceHazard(position) {
  createAndPositionItem("./includes/hazard_gray.png", position);
}

// 목적지 맵에 띄우기
export function newPlacePredefined(position) {
  createAndPositionItem("./includes/predefined_gray.png", position);
}
