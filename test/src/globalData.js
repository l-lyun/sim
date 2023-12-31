// 전역변수 객체

let globalData = {
  rows: 0, // 맵 row
  cols: 0, // 맵 col
  current_x: 0, // 로봇의 현재 위치
  current_y: 0,
  currentDirection: 'E', // 로봇 현재 방향, 기본 동쪽
}

let coordinates = {
  colorBlobsParsed: [], // colorblob 좌표 파싱해서 들어가는 곳 2,1 입력 받으면 2, 1 로 파싱
  hazardsParsed: [],
  predefindedsParsed: [],
}

export {globalData, coordinates};