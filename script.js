let turn = 40;
let array = new Array(5);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(9);
    for (let j = 0; j < array[i].length; j++) {
      array[i][j] = String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
    }
  }
  var alphScore = [
    ["a", 1],
    ["b", 2],
    ["c", 4],
    ["d", 3],
    ["e", 1],
    ["f", 2],
    ["g", 3],
    ["h", 4],
    ["i", 1],
    ["j", 5],
    ["k", 2],
    ["l", 3],
    ["m", 3],
    ["n", 1],
    ["o", 2],
    ["p", 3],
    ["q", 5],
    ["r", 2],
    ["s", 2],
    ["t", 1],
    ["u", 3],
    ["v", 4],
    ["w", 4],
    ["x", 8],
    ["y", 3],
    ["z", 10]
  ];
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
      turn-=1;
      document.getElementById('chess-board').innerHTML = displayChessBoard();
    }
  }

  let player1 = new Player(2, 0);
  array[player1.row][player1.col] = 0;
  let player2 = new Player(2, 8);
  array[player2.row][player2.col] = 1;
  let currentPlayer = player1;

  function endGame(){
    document.querySelector(".card2").style.display="block"
    document.querySelector(".card").style.display="none"

    if(parseInt(document.querySelector(".player-1").getAttribute('data-value')) > parseInt(document.querySelector(".player-2").getAttribute('data-value'))){
      document.querySelector(".title").innerHTML="Player 1"
      document.querySelector(".total-score").innerHTML=document.querySelector(".player-1").getAttribute('data-value')
    }else{
      document.querySelector(".title").innerHTML="Player 2"
      document.querySelector(".total-score").innerHTML=document.querySelector(".player-2").getAttribute('data-value')
    }
  }

  function displayChessBoard() {
    if(turn == 0){
      check('.player-2','#input-p2')
      check('.player-1','#input-p1')
      document.querySelector(".outer-winner").style.display="flex"
      
    }
    document.querySelector("#turn").innerHTML = turn;
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
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + " clickable' " + (currentPlayer === player1 ? "onclick='toggleTile(this)'" : "") + "><img src='asset/pict/icon.png'></td>";
        } else if (cellValue === 1) {
          cellClass += " player";
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + " clickable' " + (currentPlayer === player2 ? "onclick='toggleTile(this)'" : "") + "><img src='asset/pict/icon2.png'></td>";
        } else {
          let alphScoreValue = getAlphabetScore(cellValue.toLowerCase());
          cellClass += " player";
          chessBoard += "<td id='cell-" + i + "-" + j + "' class='" + cellClass + "'>" + cellValue + "<span class='score'>" + alphScoreValue + "</span></td>";
        }
        
      }
      chessBoard += "</tr>";
    }
    chessBoard += "</table>";
    return chessBoard;
  }
  function getAlphabetScore(alphabet) {
    for (let i = 0; i < alphScore.length; i++) {
      if (alphScore[i][0] === alphabet) {
        return alphScore[i][1];
      }
    }
    return 0; // Default score if the alphabet is not found
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
        surroundingCell.classList.add("clicked"); 
        surroundingCell.addEventListener('click',  () => {
          handleCellClick(surroundingCell, surroundingRow, surroundingCol);
          console.log(surroundingCell)
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
    var inputValue = document.querySelector(input).value.toLowerCase();
    var point = 0;
    let pointPlace=document.querySelector(player);
    readCSVFile("asset/words/english.csv", inputValue)
      .then(result => {
        if (result) {
          for (var i = 0; i < inputValue.length; i++) {
            var char = inputValue.charAt(i);
            var score = getAlphabetScore(char);
            point += score;
          }
          alert("Congratulations you got "+point+" points")
        } else {
          alert("Words not Found")
          document.querySelector(input).value = ""
        }
        pointPlace.setAttribute('data-value',eval(pointPlace.getAttribute('data-value')+ "+"+point.toString()));
        document.querySelector(input).value = ""
        return point; // Add this line to return the point value
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  function getAlphabetScore(char) {
    for (var i = 0; i < alphScore.length; i++) {
      if (alphScore[i][0] === char) {
        return alphScore[i][1];
      }
    }
    return 0; // Return 0 if the character is not found in alphScore
  }
  
  function readCSVFile(file, word) {
    return new Promise((resolve, reject) => {
      // Fetch the CSV file
      fetch(file)
        .then(response => response.text())
        .then(data => {
          // Split the CSV data into an array of words
          var words = data.split('\n');
  
          // Remove the "\r" from each word in the array
          words = words.map(w => w.replace(/\r/g, ''));
  
          // Check if the word is present in the CSV file
          if (words.includes(word)) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error);
        });
    });
  }
  
  
  
  
  
  

  