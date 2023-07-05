  
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