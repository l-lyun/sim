import { globalData, coordinates } from "./globalData.js";
import { findPath } from "./path.js";


// post 함수
export async function postData() {
  // 객체 데이터 보내는 더미
  try {
    const requestPayload = {
      // 맵 크기
      n: parseInt(globalData.cols),
      m: parseInt(globalData.rows), 
      // 현재 위치
      startSpot: `${globalData.current_x}, ${globalData.current_y}`, 
      // 현재 방향
      startDirection: globalData.currentDirection,
      // 지점들 위치
      hazards: coordinates.hazardsParsed,
      colorBlobs: coordinates.colorBlobsParsed,
      endSpot: coordinates.predefindedsParsed,
    };
    console.log(JSON.stringify(requestPayload)); // 백에서 받은 json 확인용 콘솔 출력
    // post
    const response = await fetch("http://localhost:8080/robot/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    // 데이터 잘 왔으면
    if (response.ok) {
      // json 파싱
      const responseData = await response.json();
      const finalInfo = responseData.finalInfo;
      console.log(finalInfo); // 확인 출력용
      if(finalInfo.length > 150) {
        alert('경로가 존재하지 않습니다.');
        return;
      }
      // 경로 탐색 함수 실행
      findPath(finalInfo);
      // 에러 체크들
    } else {
      console.error("Error during POST Request. HTTP Status:", response.status);
    }
  } catch (error) {
    console.error("Error during POST Request:", error);
  }
}
