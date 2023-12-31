import { createTable } from './src/createTable.js';
import { setRobotPosition } from './src/makeSpot.js';
import { globalData } from './src/globalData.js';
import { colorSpot, hazardSpot, predefinedSpot } from './src/checkCoordinate.js';
import { recognitionStart } from './src/recognition.js';
import { postData } from './src/postData.js';

// id 받아오는 함수 -> id가 elementId인 이벤트 발생하면 값 받아줌
const getElementValue = (elementId) => {
  return document.getElementById(elementId).value;
};

// 로봇 위치 파싱, 좌표 찍기
const parseAndSetRobotPosition = () => {
  // robotpositionInput이 id인 값 , 로 스플릿
  const robotPosition = getElementValue("robotPositionInput");
  let positionParse = [];
  for (let i = 0; i < robotPosition.length; i++) {
    if (!isNaN(robotPosition[i]) && robotPosition[i] !== ' ') {
        positionParse.push(robotPosition[i]);
    }
  }
  // 전역변수 현재 위치들 업데이트
  globalData.current_x = parseInt(positionParse[0]);
  globalData.current_y = parseInt(positionParse[1]);
  // 로봇 좌표 찍기
  setRobotPosition(globalData.current_x, globalData.current_y);
};

// 버튼 클릭됐을 때 관리하는 함수, 버튼id, 동작 함수 인자로 받아서 클릭되면 callback이라는 함수 실행 
const handleButtonClick = (buttonId, callback) => {
  document.getElementById(buttonId).addEventListener("click", callback);
};

// 지도 생성 클릭시 맵 생성
handleButtonClick("createTable", createTable);

// 로봇 위치 설정 클릭시 parseAndSetRobotPosition 실행
handleButtonClick("setRobotPosition", parseAndSetRobotPosition);

// colorblob 추가 버튼 클릭시 () = > {} 안에 있는거 실행
handleButtonClick("placeColorblob", () => {
  const position = getElementValue("colorblobInput");
  let positionParse = [];
  let cnt = 0;
  for (let i = 0; i < position.length; i++) {
    if (!isNaN(position[i]) && position[i] !== ' ') {
        positionParse.push(position[i]);
        cnt++;
    }
    if (cnt == 2) {
      colorSpot(positionParse);
      positionParse = [];
      cnt = 0;
    }
  }
});

// hazard 추가 버튼 클릭시 () => {} 안에 있는거 실행
handleButtonClick("placeHazard", () => {
  const position = getElementValue("hazardInput");
  let positionParse = [];
  let cnt = 0;
  for (let i = 0; i < position.length; i++) {
    if (!isNaN(position[i]) && position[i] !== ' ') {
        positionParse.push(position[i]);
        cnt++;
    }
    if (cnt == 2) {
      hazardSpot(positionParse);
      positionParse = [];
      cnt = 0;
    }
  }
});

// predefined 추가 버튼 클릭시 () => {} 안에 있는거 실행
handleButtonClick("placePredefined", () => {
  const position = getElementValue("predefinedInput");
  let positionParse = [];
  let cnt = 0;
  for (let i = 0; i < position.length; i++) {
    if (!isNaN(position[i]) && position[i] !== ' ') {
        positionParse.push(position[i]);
        cnt++;
    }
    if (cnt == 2) {
      predefinedSpot(positionParse);
      positionParse = [];
      cnt = 0;
    }
  }
});

// 음성 인식 시작 버튼 클릭시 recognitionStart 함수 실행
handleButtonClick("recognitionStart", recognitionStart);

// 로봇 이동 버튼 클릭시 postData 함수 실행
handleButtonClick("moveButton", postData);