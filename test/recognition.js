
import { colorSpot, hazardSpot } from "./checkCoordinate.js";
import { findPathInterval } from "./path.js";

const colorDictionary = ["중", "종", "정", "죵", "즁"];
const hazardDictionary = ["위", "이"];
const digitDictionary = [
  "영",
  "일",
  "이",
  "삼",
  "사",
  "오",
  "육",
  "칠",
  "팔",
  "구",
  "십",
];

export function recognitionStop() {
  recognition.stop();
}

export function recognitionStart() {
  // 음성 인식 시작 이벤트 리스너
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    // 체크체크
      clearInterval(findPathInterval); // gogo 함수 실행 중지
  
      recognition.continuous = true;
      recognition.lang = "ko-KR"; // 언어 설정 (영어)
      recognition.start();
  
      recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        recognitionParse(result);
      };  

      document
      .getElementById("recognitionStop")
      .addEventListener("click", function () {
        recognition.stop();
      });
}

function recognitionParse(result) {
  let resultParse = [];
  let resultFinish = [];
  console.log("result: " + result);
  for (let i = 0; i < result.length; i++) {
    if (result[i] !== " ") {
      resultParse.push(result[i]);
    }
  }
  for (let i = 0; i < digitDictionary.length; i++) {
    if (resultParse[2] === digitDictionary[i]) {
      resultParse[2] = String(i);
    }
    if (resultParse[3] === digitDictionary[i]) {
      resultParse[3] = String(i);
    }
  }
  for (let i = 0; i < 4; i++) {
    resultFinish.push(resultParse[i]);
  }
  checkRecognition(resultFinish);
}


function checkRecognition(recognitionParse) {
  console.log(recognitionParse);

  if (recognitionParse.length === 4) {
    if (isNaN(recognitionParse[2]) || isNaN(recognitionParse[3])) {
      alert("잘못된 입력입니다.");
      return;
    } else {
      recognitionSpot(recognitionParse);
    }
  } else { 
    alert("잘못된 입력입니다.");
    // console.log(resultParse);
  }
}


function recognitionSpot(recognitionParse) {
  let position = [recognitionParse[2], recognitionParse[3]];
  for (let i = 0; i < colorDictionary.length; i++) {
    if (recognitionParse[0] === colorDictionary[i]) {
      console.log("hazard position: " + position);
      colorSpot(position);
      return;
    }
  }
  for (let i = 0; i < hazardDictionary.length; i++) {
    if (recognitionParse[0] === hazardDictionary[i]) {
      hazardSpot(position);
      return;
    }
  }
}
