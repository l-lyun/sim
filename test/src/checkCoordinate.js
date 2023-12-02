import { coordinates } from "./globalData.js";
import { newPlaceColorblob, newPlaceHazard, newPlacePredefined } from "./makeSpot.js";


// 파싱, 이미지 회색
export function colorSpot(position) {
  // 백에 보내주기 위한 형식으로 파싱
    coordinates.colorBlobs_coordinate.push(position);
    coordinates.colorBlobsParsed = coordinates.colorBlobs_coordinate.map(
      (coord) => coord.join(", ")
  ); 
  // 이미지 회색 띄우기
  newPlaceColorblob(position);
}

export function hazardSpot(position) {
  // 백에 보내주기 위한 형식으로 파싱
  coordinates.hazards_coordinate.push(position);
  coordinates.hazardsParsed = coordinates.hazards_coordinate.map((hazards) =>
    hazards.join(", ")
  );
  newPlaceHazard(position);
}

export function predefinedSpot(position) {
  coordinates.predefindeds_coordinate.push(position);
  coordinates.predefindedsParsed = coordinates.predefindeds_coordinate.map((predefindeds) =>
    predefindeds.join(", ")
  );
   // 이미지 회색 띄우기
  newPlacePredefined(position);
}
