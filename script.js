
let array = new Array(5);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(9);
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
    }
  }

class Player {
    constructor(row, col) {
      this.row = row;
      this.col = col;
      this.score = 0;
    }
    
    move(row, col,player) {
      array[this.row][this.col] = String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
      this.row = row;
      this.col = col;
      array[this.row][this.col] = player;
      document.getElementById('chess-board').innerHTML = displayChessBoard();
    }
  }

  let player1 = new Player(2, 0);
  array[player1.row][player1.col] = 0;
  let player2 = new Player(2, 8);
  array[player2.row][player2.col] = 1;
  let currentPlayer = player1;

  function displayChessBoard() {
    let chessBoard = "<table>";
    for (let i = 0; i < array.length; i++) {
      chessBoard += "<tr>";
      for (let j = 0; j < array[i].length; j++) {
        let cellValue = array[i][j];
        let cellClass = "tile";
        if (cellValue === "") {
          cellClass += " empty";
        }
        cellClass += " player";
        if (cellValue === 0) {
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + " clickable' " + (currentPlayer === player1 ? "onclick='toggleTile(this)'" : "") + ">" + cellValue + "</td>";
        } else if (cellValue === 1) {
          cellClass += " player";
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + " clickable' " + (currentPlayer === player2 ? "onclick='toggleTile(this)'" : "") + ">" + cellValue + "</td>";
        } else {
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + "'>" + cellValue + "</td>";
        }
        
      }
      chessBoard += "</tr>";
    }
    chessBoard += "</table>";
    return chessBoard;
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
      if (surroundingCell && surroundingCell.innerHTML !== "0" && surroundingCell.innerHTML !== "1") {
        let active = surroundingCell.classList.add("clicked"); 
        surroundingCell.addEventListener('click',  (event) => {
          handleCellClick(surroundingCell, surroundingRow, surroundingCol);
          console.log(surroundingCell)
        });
      }
    }
  }
  
  function handleCellClick(cell, row, col) {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      document.querySelector("#input-p1").value += cell.innerHTML;
      player1.move(row, col, 0);
    } else if (currentPlayer === player2) {
      currentPlayer = player1;
      document.querySelector("#input-p2").value += cell.innerHTML;
      player2.move(row, col, 1);
    }
  }
  
  
  function check(player, input) {
    document.querySelector(player).setAttribute('data-value', "100");
    var inputValue = document.querySelector(input).value;
    readCSVFile("english.csv", inputValue);
  }
  
  function readCSVFile(file, word) {
    // Fetch the CSV file
    fetch(file)
      .then(response => response.text())
      .then(data => {
        // Split the CSV data into an array of words
        var words = data.split('\n');
  
        // Check if the word is present in the CSV file
        if (words.includes(word)) {
          console.log("The word is present in the CSV file.");
        } else {
          console.log("The word is not present in the CSV file.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  