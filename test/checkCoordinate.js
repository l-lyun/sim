import { coordinates } from "./globalData.js";
import { newPlaceColorblob, newPlaceHazard, newPlacePredefined } from "./makeSpot.js";

export function colorSpot(position) {
    coordinates.colorBlobs_coordinate.push(position);
    coordinates.colorBlobsParsed = coordinates.colorBlobs_coordinate.map(
      (coord) => coord.join(", ")
  );

  newPlaceColorblob(position);
}

export function hazardSpot(position) {
  coordinates.hazards_coordinate.push(position);
  coordinates.hazardsParsed = coordinates.hazards_coordinate.map((hazards) =>
    hazards.join(", ")
  );
  newPlaceHazard(position);
}

export function predefinedSpot(position) {
  coordinates.predefindeds_coordinate.push(position);
  // console.log(position);
  coordinates.predefindedsParsed = coordinates.predefindeds_coordinate.map((predefindeds) =>
    predefindeds.join(", ")
  );
  newPlacePredefined(position);
}

// colorBlobsParsed = colorBlobs_coordinate.map((colorBlobs_coordinate) =>
//     colorBlobs_coordinate.join(", ")