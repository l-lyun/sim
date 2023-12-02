// createTable.js

export function createTable() {
  // 행 열 입력
  const rows = document.getElementById("colInput").value;
  const cols = document.getElementById("rowInput").value;
  console.log(rows);
  // 맵 생성
  let table = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  // 테이블을 div 태그에 추가
  document.getElementById("tableContainer").innerHTML = "";
  document.getElementById("tableContainer").appendChild(table);
}
