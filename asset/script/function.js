function endGame() {
  const secondCard = document.querySelector(".second-card");
  const card = document.querySelector(".card");
  const player1 = document.querySelector(".player-1");
  const player2 = document.querySelector(".player-2");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");
  const congratText = document.querySelector(".congrat-text");

  secondCard.style.display = "block";
  card.style.display = "none";

  const player1Value = parseInt(player1.getAttribute('data-value'));
  const player2Value = parseInt(player2.getAttribute('data-value'));

  if (player1Value > player2Value) {
    title.innerHTML = "Player 1";
    congratText.innerHTML = "Congratulations! Player 1 emerges as the victor with an impressive total score of "+player1Value+" points.";
  } else if (player2Value > player1Value) {
    title.innerHTML = "Player 2";
    congratText.innerHTML = "Congratulations! Player 2 emerges as the victor with an impressive total score of "+player2Value+" points.";
  } else {
    title.innerHTML = "Draw";
    subtitle.innerHTML = "No Winner";
    congratText.innerHTML = "It's a draw with both players having an impressive total score of "+player1Value+" points each.";
  }
}

function displayChessBoard() {
  if (turn === 0) {
    check('.player-2', '#input-p2');
    check('.player-1', '#input-p1');
    document.querySelector(".outer-winner").style.display = "flex";
  }
  
  document.querySelector("#turn").innerHTML = turn;
  
  const chessBoard = array.map((row, i) => {
    const cells = row.map((cellValue, j) => {
      let cellClass = "tile";
      
      if (cellValue === "") {
        cellClass += " empty";
      }
      
      cellClass += " player";
      
      if (cellValue === 0) {
        return `<td id='cell-${i}-${j}' class='${cellClass} clickable' ${currentPlayer === player1 ? "onclick='toggleTile(this)'" : ""}><img src='asset/pict/icon.png'></td>`;
      } else if (cellValue === 1) {
        return `<td id='cell-${i}-${j}' class='${cellClass} clickable' ${currentPlayer === player2 ? "onclick='toggleTile(this)'" : ""}><img src='asset/pict/icon2.png'></td>`;
      } else {
        const alphScoreValue = getAlphabetScore(cellValue.toLowerCase());
        return `<td id='cell-${i}-${j}' class='${cellClass}'>${cellValue}<span class='score'>${alphScoreValue}</span></td>`;
      }
    }).join("");
    
    return `<tr>${cells}</tr>`;
  }).join("");
  
  return `<table>${chessBoard}</table>`;
}

function getAlphabetScore(alphabet) {
const foundScore = alphScore.find((entry) => entry[0] === alphabet);
return foundScore ? foundScore[1] : 0;
}


  function toggleTile(clickedCell) {
  clickedCell.removeAttribute('onclick');
  let cellId = clickedCell.id;
  let cellIdParts = cellId.split("-");
  let row = parseInt(cellIdParts[1]);
  let col = parseInt(cellIdParts[2]);
  let surroundingCells = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 2, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col - 2],
    [row, col + 1],
    [row, col + 2],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 2, col],
    [row + 1, col + 1]
  ];
  for (let i = 0; i < surroundingCells.length; i++) {
    let surroundingRow = surroundingCells[i][0];
    let surroundingCol = surroundingCells[i][1];
    let surroundingCell = document.getElementById("cell-" + surroundingRow + "-" + surroundingCol);
    if (surroundingCell && !surroundingCell.innerHTML.includes("img")) {
      surroundingCell.classList.add("clicked"); 
      surroundingCell.addEventListener('click',  () => {
        handleCellClick(surroundingCell, surroundingRow, surroundingCol);
      });
    }
  }
}

function handleCellClick(cell, row, col) {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    document.querySelector("#input-p1").value += cell.innerHTML[0];
    player1.move(row, col, 0);
  } else if (currentPlayer === player2) {
    currentPlayer = player1;
    document.querySelector("#input-p2").value += cell.innerHTML[0];
    player2.move(row, col, 1);
  }
}
  
function check(player, input) {
  const inputValue = document.querySelector(input).value.toLowerCase();
  let point = 0;
  let pointPlace = document.querySelector(player);
  
  readCSVFile("asset/words/english.csv")
    .then(words => {
      if (words.includes(inputValue.toLowerCase())) {
        for (let i = 0; i < inputValue.length; i++) {
          let char = inputValue.charAt(i);
          let score = getAlphabetScore(char);
          point += score;
        }
        alert(`Congratulations, you got ${point} points.`);
      } else {
        alert("Word not found.");
        document.querySelector(input).value = "";
      }
      
      pointPlace.setAttribute('data-value', eval(`${pointPlace.getAttribute('data-value')} + ${point}`));
      document.querySelector(input).value = "";
      
      return point;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
  
function readCSVFile(file) {
  return new Promise((resolve, reject) => {
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching the CSV file.');
        }
        return response.text();
      })
      .then(data => {
        let words = data.split('\n');
  
        words = words.map(w => w.replace(/\r/g, '').toLowerCase());
  
        resolve(words);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}
  
