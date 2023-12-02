import { globalData, coordinates } from "./globalData.js";
import { findPath } from "./path.js";


export async function postData() {
  try {
    const requestPayload = {
      n: parseInt(globalData.cols),
      m: parseInt(globalData.rows),
      startSpot: `${globalData.current_x}, ${globalData.current_y}`, // 여기 수정
      startDirection: globalData.currentDirection,
      hazards: coordinates.hazardsParsed,
      colorBlobs: coordinates.colorBlobsParsed, // 여기 수정
      endSpot: coordinates.predefindedsParsed,
    };
    console.log(coordinates.hazardsParsed);
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
      findPath(finalInfo);
    } else {
      console.error("Error during POST Request. HTTP Status:", response.status);
    }
  } catch (error) {
    console.error("Error during POST Request:", error);
  }
}
