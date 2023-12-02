import { globalData } from "./globalData.js";

export function createTable()  {
  // 행 열 입력
  globalData.rows = document.getElementById("colInput").value;
  globalData.cols = document.getElementById("rowInput").value;

  // 맵 생성
  let table = document.createElement("table");
  for (let i = 0; i < globalData.rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < globalData.cols; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  // 테이블을 div 태그 추가
  document.getElementById("tableContainer").innerHTML = "";
  document.getElementById("tableContainer").appendChild(table);
};