import { coordinates } from "./globalData.js";
import {
  newPlaceColorblob,
  newPlaceHazard,
  newPlacePredefined,
} from "./makeSpot.js";

// 파싱, 이미지 회색
let colorBlobsCoordinate = [];
export function colorSpot(position) {
  // 백에 보내주기 위한 형식으로 파싱
  console.log(position);
  colorBlobsCoordinate.push(position);
  coordinates.colorBlobsParsed = colorBlobsCoordinate.map(
    (coord) => coord.join(", ")
  );
  // 이미지 회색 띄우기
  newPlaceColorblob(position);
}

let hazardsCoordinate = [];
export function hazardSpot(position) {
  // 백에 보내주기 위한 형식으로 파싱
  hazardsCoordinate.push(position);
  console.log(hazardsCoordinate);
  coordinates.hazardsParsed = hazardsCoordinate.map((hazards) =>
    hazards.join(", ")
  );
  // 이미지 회색 띄우기
  newPlaceHazard(position);
}

let predefindedsCoordinate = [];
export function predefinedSpot(position) {
  predefindedsCoordinate.push(position);
  coordinates.predefindedsParsed = predefindedsCoordinate.map(
    (predefindeds) => predefindeds.join(", ")
  );
  // 이미지 회색 띄우기
  newPlacePredefined(position);
}
