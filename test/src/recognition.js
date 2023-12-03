
import { colorSpot, hazardSpot } from "./checkCoordinate.js";
import { findPathInterval } from "./path.js";

// 음성인식 첫글자 체크용 dictionary
const colorDictionary = ["중", "종", "정", "죵", "즁"];
const hazardDictionary = ["위", "이"];

// 음성인식 숫자가 한글로 인식되었을 때 체크용 dictionary
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

  // 음성 인식 객체
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

// 음성 인식 정지하는 함수
export function recognitionStop() {
  recognition.stop();
}

// 음성인식 시작 버튼 누르면 함수 실행
export function recognitionStart() {
      // 음성 인식 시작 누르면 clearInterval이라는 내장함수 실행시켜서 로봇 동작 중지
      // findPathInterval 가서 보면 대충 이해될 것
      clearInterval(findPathInterval); 

      // 음성인식 설정들
      recognition.continuous = true;
      recognition.lang = "ko-KR"; // 언어 설정 (영어)

      // 음성 인식 시작
      recognition.start();

      // 음성 인식 결과값 저장
      recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        recognitionParse(result);
        console.log(result);
      };  

      // 음성 인식 정지 버튼 누르면 함수 호출
      document
      .getElementById("recognitionStop")
      .addEventListener("click", function () {
        recognition.stop();
      });
}

// 음성 인식 결과 파싱 result 음성인식 결과 문자
function recognitionParse(result) {
  // 파싱
  let resultParse = [];
  let resultFinish = [];
  // 결과 길이만큼 포문 시작
  for (let i = 0; i < result.length; i++) {
    // 일단 문자열에서 띄어쓰기 아니면 1차 파싱 배열에 푸시
    if (result[i] !== " ") {
      resultParse.push(result[i]);
    }
  }

  // resultParse = ['중', '요', '2', '3'] 현재 상태, 가장 이상적인 상태임
  
  // 포문은 ['중', '요', '이', '3']과 같이 한글로 들어갔을 때 위 dictionary 보면서 숫자로 바꿔줌
  for (let i = 0; i < digitDictionary.length; i++) {
    // index가 2거나 3일때 무조건 숫자여야함 
    if (resultParse[2] === digitDictionary[i]) {
      resultParse[2] = String(i);
    }
    if (resultParse[3] === digitDictionary[i]) {
      resultParse[3] = String(i);
    }
  }
  // 뒤 입력 다 짜르고 4개만 받기
  for (let i = 0; i < 4; i++) {
    resultFinish.push(resultParse[i]);
  }
  // 음성 인식 데이터 최종 검사
  checkRecognition(resultFinish);
}

// 음성인식 데이터 최종 검사
function checkRecognition(recognitionParse) {
  // 콘솔에 음성인식 데이터 출력

  // 문자열 길이가 4 아니면 종료
  if (recognitionParse.length === 4) {
    // index가 2, 3에서 숫자가 아니면 잘못된 입력
    if (isNaN(recognitionParse[2]) || isNaN(recognitionParse[3])) {
      alert("잘못된 입력입니다.");
      return;
    } else {
      // 제대로된 입력 spot 띄워야함
      recognitionSpot(recognitionParse);
    }
    // 문자열 길이가 4가 아니면 잘못되었음
  } else { 
    alert("잘못된 입력입니다.");
  }
}

// 음성인식 데이터 결과로 지점 띄우는 함수
function recognitionSpot(recognitionParse) {
  // 좌표는 무조건 2 3
  let position = [recognitionParse[2], recognitionParse[3]];
  // 첫글자 뭔지에 따라 colorSpot, hazardSpot 호출해서 해당 지점 음성인식 결과 위치에 띄움
  for (let i = 0; i < colorDictionary.length; i++) {
    // 첫글자 보고 colorDictionary중에 있으면 colorblob 이미지 띄움
    if (recognitionParse[0] === colorDictionary[i]) {
      colorSpot(position);
      return;
    }
  }
  // 첫글자 뭔지에 따라 colorSpot, hazardSpot 호출해서 해당 지점 음성인식 결과 위치에 띄움
  for (let i = 0; i < hazardDictionary.length; i++) {
    // 첫글자 보고 colorDictionary중에 있으면 colorblob 이미지 띄움
    if (recognitionParse[0] === hazardDictionary[i]) {
      hazardSpot(position);
      return;
    }
  }
}
